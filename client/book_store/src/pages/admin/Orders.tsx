import { useState } from 'react';
import { Package, CheckCircle, AlertTriangle } from 'lucide-react';
import { books, publisherOrders } from '../../data/book';

export function Orders() {
  const [activeTab, setActiveTab] = useState<'auto' | 'confirm'>('auto');
  const lowStockBooks = books.filter((book) => book.stockQuantity < book.thresholdQuantity);

  const handleAutoOrder = (bookId: string) => {
    alert(`Auto order placed for book ID: ${bookId}`);
  };

  const handleConfirmOrder = (orderId: string) => {
    alert(`Order ${orderId} confirmed!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Orders Management</h1>
        <p className="text-muted-foreground">Manage automatic orders and confirmations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('auto')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'auto'
              ? 'bg-primary text-white'
              : 'bg-white text-foreground hover:bg-secondary'
          }`}
        >
          Place Orders Automatically
        </button>
        <button
          onClick={() => setActiveTab('confirm')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'confirm'
              ? 'bg-primary text-white'
              : 'bg-white text-foreground hover:bg-secondary'
          }`}
        >
          Confirm Orders
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
          {lowStockBooks.length === 0 ? (
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
                    <th className="px-6 py-3 text-left">Auto Order Qty</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {lowStockBooks.map((book) => {
                    const autoOrderQty = book.thresholdQuantity * 2 - book.stockQuantity;
                    return (
                      <tr key={book.id} className="hover:bg-secondary/30">
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4 font-mono text-sm">{book.isbn}</td>
                        <td className="px-6 py-4">{book.publisher}</td>
                        <td className="px-6 py-4">
                          <span className="text-destructive">{book.stockQuantity}</span>
                        </td>
                        <td className="px-6 py-4">{book.thresholdQuantity}</td>
                        <td className="px-6 py-4">
                          <span className="text-green-600">{autoOrderQty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            Ready to Order
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleAutoOrder(book.id)}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            Place Order
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
              Review and confirm orders placed with publishers
            </p>
          </div>
          {publisherOrders.length === 0 ? (
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
                  {publisherOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/30">
                      <td className="px-6 py-4 font-mono">{order.id}</td>
                      <td className="px-6 py-4">{order.title}</td>
                      <td className="px-6 py-4 font-mono text-sm">{order.isbn}</td>
                      <td className="px-6 py-4">{order.publisher}</td>
                      <td className="px-6 py-4">{order.orderQuantity}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${
                            order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'Confirmed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => handleConfirmOrder(order.id)}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            Confirm
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
