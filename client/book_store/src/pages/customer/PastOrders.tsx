import { useState, useEffect } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import orderService from '../../api/orderService';

interface Order {
  order_id: number;
  order_date: string;
  total_price: number;
  items: {
    isbn: string;
    title: string;
    quantity: number;
    unit_price: number;
  }[];
}

export function PastOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-6 w-6 text-primary" />
          <h1>Past Orders</h1>
        </div>
        <p className="text-muted-foreground">View your order history and details</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.order_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => toggleOrder(order.order_id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Order ID</p>
                      <p className="font-mono">#{order.order_id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Date</p>
                      <p>{new Date(order.order_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Items</p>
                      <p>{order.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total</p>
                      <p className="text-primary">${Number(order.total_price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">

                    {expandedOrder === order.order_id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrder === order.order_id && (
                <div className="border-t border-border p-6 bg-secondary/10">
                  <h3 className="mb-4">Order Items</h3>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="px-4 py-3 text-left">Book Title</th>
                          <th className="px-4 py-3 text-left">ISBN</th>
                          <th className="px-4 py-3 text-left">Quantity</th>
                          <th className="px-4 py-3 text-left">Price</th>
                          <th className="px-4 py-3 text-left">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{item.title}</td>
                            <td className="px-4 py-3 font-mono text-sm">{item.isbn}</td>
                            <td className="px-4 py-3">{item.quantity}</td>
                            <td className="px-4 py-3">${Number(item.unit_price).toFixed(2)}</td>
                            <td className="px-4 py-3 text-primary">
                              ${(Number(item.unit_price) * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-secondary">
                        <tr>
                          <td colSpan={4} className="px-4 py-3 text-right">
                            <span>Total:</span>
                          </td>
                          <td className="px-4 py-3 text-primary">
                            ${Number(order.total_price).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
