import { useState } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { customerOrders } from '../../data/book';

export function PastOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-6 w-6 text-primary" />
          <h1>Past Orders</h1>
        </div>
        <p className="text-muted-foreground">View your order history and details</p>
      </div>

      {customerOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Order ID</p>
                      <p className="font-mono">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Date</p>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Items</p>
                      <p>{order.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total</p>
                      <p className="text-primary">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-border p-6 bg-secondary/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="mb-3">Shipping Address</h3>
                      <p className="text-muted-foreground">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <h3 className="mb-3">Payment Method</h3>
                      <p className="text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>

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
                            <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
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
                            ${order.total.toFixed(2)}
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
