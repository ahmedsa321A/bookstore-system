import { useState } from 'react';
import {
  BookPlus,
  Edit,
  FileText,
  ShoppingBag,
  Menu,
  Trash2,
  Package,
} from 'lucide-react';
import { books as initialBooks } from '../types/book';

type Tab = 'add' | 'update' | 'reports' | 'orders';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('add');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState(initialBooks);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: 'Science' as const,
    description: '',
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock add book functionality
    alert('Book added successfully!');
    setFormData({
      title: '',
      author: '',
      price: '',
      category: 'Science',
      description: '',
    });
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const orders = [
    {
      id: '1001',
      customer: 'John Smith',
      total: 87.97,
      status: 'Pending',
      date: '2025-12-04',
    },
    {
      id: '1002',
      customer: 'Sarah Johnson',
      total: 64.98,
      status: 'Shipped',
      date: '2025-12-03',
    },
    { id: '1003', customer: 'Mike Davis', total: 29.99, status: 'Delivered', date: '2025-12-02' },
    {
      id: '1004',
      customer: 'Emily Brown',
      total: 104.96,
      status: 'Processing',
      date: '2025-12-04',
    },
  ];

  const sidebarItems = [
    { id: 'add' as Tab, label: 'Add Books', icon: BookPlus },
    { id: 'update' as Tab, label: 'Update Books', icon: Edit },
    { id: 'reports' as Tab, label: 'Reports', icon: FileText },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300`}
      >
        <div className="p-6">
          <h2 className="mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-secondary/30">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-border p-4 flex items-center justify-between">
          <h2>Admin Dashboard</h2>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          {/* Add Books */}
          {activeTab === 'add' && (
            <div>
              <h2 className="mb-6">Add New Book</h2>
              <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
                <form onSubmit={handleAddBook} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block mb-2">
                      Book Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter book title"
                    />
                  </div>

                  <div>
                    <label htmlFor="author" className="block mb-2">
                      Author
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter author name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block mb-2">
                        Price ($)
                      </label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value as typeof formData.category,
                          })
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="Science">Science</option>
                        <option value="Art">Art</option>
                        <option value="Religion">Religion</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter book description"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Update Books */}
          {activeTab === 'update' && (
            <div>
              <h2 className="mb-6">Update Books</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Author</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {books.map((book) => (
                        <tr key={book.id} className="hover:bg-secondary/30">
                          <td className="px-6 py-4">{book.title}</td>
                          <td className="px-6 py-4">{book.authors}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-2 py-1 bg-secondary rounded text-sm">
                              {book.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">${book.price.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-primary hover:bg-primary/10 rounded transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports */}
          {activeTab === 'reports' && (
            <div>
              <h2 className="mb-6">Sales Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Total Sales</p>
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <h2>$12,458</h2>
                  <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Orders</p>
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <h2>342</h2>
                  <p className="text-sm text-green-600 mt-2">+8.2% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Books Sold</p>
                    <BookPlus className="h-5 w-5 text-primary" />
                  </div>
                  <h2>1,247</h2>
                  <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Avg. Order</p>
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2>$36.42</h2>
                  <p className="text-sm text-green-600 mt-2">+3.1% from last month</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="mb-4">Category Performance</h3>
                <div className="space-y-4">
                  {['Science', 'Art', 'Religion', 'History', 'Geography'].map((category) => (
                    <div key={category}>
                      <div className="flex justify-between mb-2">
                        <span>{category}</span>
                        <span className="text-muted-foreground">
                          {Math.floor(Math.random() * 100) + 50} sales
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="mb-6">Orders Management</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-6 py-3 text-left">Order ID</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Total</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-secondary/30">
                          <td className="px-6 py-4">#{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
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
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-primary hover:underline">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
