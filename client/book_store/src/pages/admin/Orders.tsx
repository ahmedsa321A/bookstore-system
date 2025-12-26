import { useState } from 'react';
import { Package, CheckCircle, AlertTriangle, Truck } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import orderService from '../../api/orderService';
import Loading from '../../components/Loading';
import AlertCard from '../../components/AlertCard';

export function Orders() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'auto' | 'confirm'>('auto');
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title?: string;
    message: string;
  } | null>(null);

  // --- Queries ---



  const { data: lowStockBooks = [], isLoading: isLoadingLowStock } = useQuery({
    queryKey: ['orders', 'low-stock'],
    queryFn: orderService.getLowStockBooks,
    enabled: activeTab === 'auto',
    select: (data) => data.map((book: any) => ({
      ...book,
      stockQuantity: book.Stock || book.stock, // Handle case sensitivity
      thresholdQuantity: book.Threshold || book.threshold,
      publisher: book.publisher || 'Unknown'
    }))
  });

  const { data: publisherOrders = [], isLoading: isLoadingPublisherOrders } = useQuery({
    queryKey: ['orders', 'publisher'],
    queryFn: orderService.getAllPublisherOrders,
    enabled: activeTab === 'confirm',
  });

  // --- Mutations ---



  const placeOrderMutation = useMutation({
    mutationFn: ({ isbn, quantity }: { isbn: string, quantity: number }) =>
      orderService.placePublisherOrder(isbn, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'low-stock'] });
      // Also invalidate publisher orders so they appear in valid state if we switch tabs
      queryClient.invalidateQueries({ queryKey: ['orders', 'publisher'] });
      setAlert({ variant: 'success', message: 'Restock order placed successfully.' });
    },
    onError: (err: any) => {
      setAlert({ variant: 'error', title: 'Order Failed', message: err.response?.data || 'Failed to place order.' });
    }
  });

  const confirmOrderMutation = useMutation({
    mutationFn: (id: string | number) => orderService.confirmPublisherOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'publisher'] });
      setAlert({ variant: 'success', message: 'Order confirmed and stock updated.' });
    },
    onError: (err: any) => {
      setAlert({ variant: 'error', title: 'Confirmation Failed', message: err.response?.data || 'Failed to confirm order.' });
    }
  });

  // --- Handlers ---



  const handleAutoOrder = (book: any) => {
    // Logic: Order double the threshold minus current stock, or at least threshold
    // Simple logic: Order enough to reach 2x threshold.
    const qtyToOrder = Math.max((book.thresholdQuantity * 2) - book.stockQuantity, 10); // Minimum 10
    if (confirm(`Place order for ${qtyToOrder} copies of "${book.Title || book.title}"?`)) {
      placeOrderMutation.mutate({ isbn: book.ISBN || book.isbn, quantity: qtyToOrder });
    }
  };

  const handleConfirmOrder = (orderId: string | number) => {
    if (confirm("Confirm receipt of this order? Stock will be updated.")) {
      confirmOrderMutation.mutate(orderId);
    }
  };

  // --- Loading State ---
  // We can show loading spinner inside the tab content or global. 
  // Let's do it inside for better UX.

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Orders Management</h1>
        <p className="text-muted-foreground">Manage customer orders and inventory restocking</p>
      </div>

      {alert && (
        <div className="mb-4">
          <AlertCard
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">

        <button
          onClick={() => setActiveTab('auto')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'auto'
            ? 'bg-primary text-white'
            : 'bg-white text-foreground hover:bg-secondary'
            }`}
        >
          <AlertTriangle size={18} />
          Low Stock (Auto-Order)
        </button>
        <button
          onClick={() => setActiveTab('confirm')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'confirm'
            ? 'bg-primary text-white'
            : 'bg-white text-foreground hover:bg-secondary'
            }`}
        >
          <Truck size={18} />
          Incoming Shipments
        </button>
      </div>



      {/* Auto Order Tab */}
      {activeTab === 'auto' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-secondary border-b border-border">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h2>Books Below Threshold</h2>
            </div>
            <p className="text-muted-foreground mt-1">
              These books have dropped below their threshold quantities and need reordering
            </p>
          </div>
          {isLoadingLowStock ? <Loading size="medium" /> : lowStockBooks.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">All books are well stocked!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-3 text-left">Book Title</th>
                    <th className="px-6 py-3 text-left">ISBN</th>
                    <th className="px-6 py-3 text-left">Publisher</th>
                    <th className="px-6 py-3 text-left">Current Qty</th>
                    <th className="px-6 py-3 text-left">Threshold</th>
                    <th className="px-6 py-3 text-left">Suggested Order</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {lowStockBooks.map((book: any) => {
                    const autoOrderQty = Math.max((book.thresholdQuantity * 2) - book.stockQuantity, 10);
                    return (
                      <tr key={book.ISBN || book.isbn} className="hover:bg-secondary/30">
                        <td className="px-6 py-4">{book.Title || book.title}</td>
                        <td className="px-6 py-4 font-mono text-sm">{book.ISBN || book.isbn}</td>
                        <td className="px-6 py-4">{book.publisher}</td>
                        <td className="px-6 py-4">
                          <span className="text-destructive font-bold">{book.stockQuantity}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{book.thresholdQuantity}</td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-semibold">{autoOrderQty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleAutoOrder(book)}
                            disabled={placeOrderMutation.isPending}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                          >
                            {placeOrderMutation.isPending ? 'Placing...' : 'Place Order'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Confirm Orders Tab */}
      {activeTab === 'confirm' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-secondary border-b border-border">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h2>Pending Publisher Orders</h2>
            </div>
            <p className="text-muted-foreground mt-1">
              Review and confirm orders placed with publishers to update inventory
            </p>
          </div>
          {isLoadingPublisherOrders ? <Loading size="medium" /> : publisherOrders.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No pending orders!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Book</th>
                    <th className="px-6 py-3 text-left">ISBN</th>
                    <th className="px-6 py-3 text-left">Publisher</th>
                    <th className="px-6 py-3 text-left">Ordered Qty</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {publisherOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-secondary/30">
                      <td className="px-6 py-4 font-mono">#{order.id}</td>
                      <td className="px-6 py-4">{order.title}</td>
                      <td className="px-6 py-4 font-mono text-sm">{order.isbn}</td>
                      <td className="px-6 py-4">{order.publisher}</td>
                      <td className="px-6 py-4">{order.orderQuantity}</td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Received' || order.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100'
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => handleConfirmOrder(order.id)}
                            disabled={confirmOrderMutation.isPending}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                          >
                            {confirmOrderMutation.isPending ? 'Confirming...' : 'Confirm Receipt'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
