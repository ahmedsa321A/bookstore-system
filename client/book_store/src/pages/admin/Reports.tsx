import { useState } from 'react';
import { FileText, DollarSign, Calendar, Users, TrendingUp, Search } from 'lucide-react';
import { customerOrders } from '../../data/books';

type ReportType = 'monthly' | 'daily' | 'customers' | 'books' | 'specific';

export function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('monthly');
  const [selectedDate, setSelectedDate] = useState('2025-12-05');
  const [searchISBN, setSearchISBN] = useState('');

  // Mock data for reports
  const monthlyTotal = customerOrders
    .filter((order) => order.date.startsWith('2025-11'))
    .reduce((sum, order) => sum + order.total, 0);

  const dailyOrders = customerOrders.filter((order) => order.date === selectedDate);
  const dailyTotal = dailyOrders.reduce((sum, order) => sum + order.total, 0);

  const topCustomers = [
    { name: 'John Smith', totalPurchase: 847.65, orders: 12 },
    { name: 'Sarah Johnson', totalPurchase: 623.45, orders: 9 },
    { name: 'Mike Davis', totalPurchase: 589.23, orders: 11 },
    { name: 'Emily Brown', totalPurchase: 445.78, orders: 7 },
    { name: 'David Wilson', totalPurchase: 398.92, orders: 6 },
  ];

  const topBooks = [
    { title: 'The Cosmos Explained', isbn: '978-0-123456-47-2', sold: 145 },
    { title: 'Modern Art Movements', isbn: '978-0-234567-89-1', sold: 132 },
    { title: 'Atlas of the World', isbn: '978-0-567890-12-3', sold: 118 },
    { title: 'Ancient Civilizations', isbn: '978-0-456789-01-2', sold: 98 },
    { title: 'World Religions', isbn: '978-0-345678-90-1', sold: 87 },
    { title: 'Quantum Physics for Beginners', isbn: '978-0-678901-23-4', sold: 76 },
    { title: 'The Renaissance Masters', isbn: '978-0-789012-34-5', sold: 65 },
    { title: 'World War II Chronicles', isbn: '978-0-890123-45-6', sold: 54 },
    { title: 'Climate Change Today', isbn: '978-0-901234-56-7', sold: 43 },
    { title: 'Digital Photography Guide', isbn: '978-0-012345-67-8', sold: 38 },
  ];

  const reportTypes = [
    { id: 'monthly' as ReportType, label: 'Monthly Sales', icon: DollarSign },
    { id: 'daily' as ReportType, label: 'Daily Sales', icon: Calendar },
    { id: 'customers' as ReportType, label: 'Top Customers', icon: Users },
    { id: 'books' as ReportType, label: 'Top Books', icon: TrendingUp },
    { id: 'specific' as ReportType, label: 'Specific Book', icon: Search },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1>Reports</h1>
        </div>
        <p className="text-muted-foreground">View detailed sales and performance reports</p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveReport(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeReport === type.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white hover:border-primary/50'
              }`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm text-center">{type.label}</p>
            </button>
          );
        })}
      </div>

      {/* Monthly Sales Report */}
      {activeReport === 'monthly' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="mb-6">Total Sales for Previous Month (November 2025)</h2>
            <div className="bg-secondary/30 rounded-lg p-8 text-center mb-6">
              <p className="text-muted-foreground mb-2">Total Revenue</p>
              <h1 className="text-primary">${monthlyTotal.toFixed(2)}</h1>
              <p className="text-green-600 mt-2">+12.5% from October</p>
            </div>
            <h3 className="mb-4">Sales Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Items</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customerOrders
                    .filter((order) => order.date.startsWith('2025-11'))
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-secondary/30">
                        <td className="px-6 py-4 font-mono">{order.id}</td>
                        <td className="px-6 py-4">{order.customerName}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">{order.items.length} items</td>
                        <td className="px-6 py-4 text-primary">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Daily Sales Report */}
      {activeReport === 'daily' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Total Sales for Specific Day</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none"
              />
            </div>
            <div className="bg-secondary/30 rounded-lg p-8 text-center mb-6">
              <p className="text-muted-foreground mb-2">Total Revenue for {selectedDate}</p>
              <h1 className="text-primary">${dailyTotal.toFixed(2)}</h1>
              <p className="text-muted-foreground mt-2">{dailyOrders.length} orders</p>
            </div>
            {dailyOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <h3 className="mb-4">Orders</h3>
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left">Order ID</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Items</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {dailyOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-secondary/30">
                        <td className="px-6 py-4 font-mono">{order.id}</td>
                        <td className="px-6 py-4">{order.customerName}</td>
                        <td className="px-6 py-4">{order.items.length} items</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-secondary rounded-full text-sm">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-primary">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No orders found for this date.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Customers Report */}
      {activeReport === 'customers' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Top 5 Customers (Last 3 Months)</h2>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div
                key={customer.name}
                className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-xl">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3>{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.orders} orders placed</p>
                </div>
                <div className="text-right">
                  <p className="text-primary">${customer.totalPurchase.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Purchase</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Books Report */}
      {activeReport === 'books' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Top 10 Selling Books (Last 3 Months)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left">Rank</th>
                  <th className="px-6 py-3 text-left">Book Title</th>
                  <th className="px-6 py-3 text-left">ISBN</th>
                  <th className="px-6 py-3 text-left">Copies Sold</th>
                  <th className="px-6 py-3 text-left">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topBooks.map((book, index) => (
                  <tr key={book.isbn} className="hover:bg-secondary/30">
                    <td className="px-6 py-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">{book.title}</td>
                    <td className="px-6 py-4 font-mono text-sm">{book.isbn}</td>
                    <td className="px-6 py-4">{book.sold}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(book.sold / topBooks[0].sold) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Specific Book Report */}
      {activeReport === 'specific' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Search Book Order History</h2>
          <div className="mb-6">
            <label htmlFor="search" className="block mb-2">
              Enter ISBN or Book Title
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="search"
                type="text"
                value={searchISBN}
                onChange={(e) => setSearchISBN(e.target.value)}
                placeholder="978-0-123456-47-2 or Book Title"
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          {searchISBN && (
            <div className="space-y-6">
              <div className="bg-secondary/30 rounded-lg p-6">
                <h3 className="mb-4">Book Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Title</p>
                    <p>The Cosmos Explained</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ISBN</p>
                    <p className="font-mono">978-0-123456-47-2</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Times Ordered</p>
                    <h2 className="text-primary">145</h2>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Revenue</p>
                    <h2 className="text-primary">$4,348.55</h2>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4">Recent Orders</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-secondary/20 rounded">
                      <div>
                        <p>Order #ORD-{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">2025-12-{String(i).padStart(2, '0')}</p>
                      </div>
                      <div className="text-right">
                        <p>{i} copies</p>
                        <p className="text-sm text-primary">${(29.99 * i).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
