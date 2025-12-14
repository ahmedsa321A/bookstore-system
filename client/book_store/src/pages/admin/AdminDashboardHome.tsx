import { BookOpen, ShoppingBag, DollarSign, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { books, customerOrders } from '../../types/book';

export function AdminDashboardHome() {
  const totalBooks = books.length;
  const totalStock = books.reduce((sum, book) => sum + book.stockQuantity, 0);
  const lowStockBooks = books.filter((book) => book.stockQuantity < book.thresholdQuantity);
  const pendingOrders = customerOrders.filter((order) => order.status === 'Pending').length;
  
  // Calculate total sales for current month (mock data)
  const currentMonthSales = customerOrders
    .filter((order) => order.date.startsWith('2025-12'))
    .reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      title: 'Total Books',
      value: totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+3 this week',
    },
    {
      title: 'Total Sales This Month',
      value: `$${currentMonthSales.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5% from last month',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: ShoppingBag,
      color: 'bg-orange-500',
      change: `${pendingOrders} orders to process`,
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockBooks.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: 'Requires attention',
    },
  ];

  const recentActivity = [
    { type: 'Order', message: 'New order #ORD-1004 received', time: '5 minutes ago' },
    { type: 'Stock', message: 'Book "Ancient Civilizations" below threshold', time: '1 hour ago' },
    { type: 'Order', message: 'Order #ORD-1002 shipped', time: '2 hours ago' },
    { type: 'Book', message: 'New book added to catalog', time: '3 hours ago' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-muted-foreground mb-1">{stat.title}</p>
              <h2 className="mb-2">{stat.value}</h2>
              <p className="text-sm text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Books */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2>Low Stock Alert</h2>
          </div>
          {lowStockBooks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">All books are well stocked!</p>
          ) : (
            <div className="space-y-3">
              {lowStockBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-destructive">
                      {book.stockQuantity} / {book.thresholdQuantity}
                    </p>
                    <p className="text-sm text-muted-foreground">Current / Threshold</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2>Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Category Performance</h2>
          <div className="space-y-4">
            {['Science', 'Art', 'Religion', 'History', 'Geography'].map((category, index) => {
              const percentage = 90 - index * 15;
              return (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span>{category}</span>
                    <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Quick Statistics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Total Stock</span>
              </div>
              <span className="font-semibold">{totalStock} units</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Total Customers</span>
              </div>
              <span className="font-semibold">247</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>Total Orders</span>
              </div>
              <span className="font-semibold">{customerOrders.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
