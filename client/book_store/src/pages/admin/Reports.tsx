import { useState } from 'react';
import { FileText, DollarSign, Calendar, Users, TrendingUp, Search, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import reportsService from '../../api/reportsService';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../../components/Loading';

type ReportType = 'monthly' | 'daily' | 'customers' | 'books' | 'replenishment';

export function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchISBN, setSearchISBN] = useState('');
  const debouncedSearchISBN = useDebounce(searchISBN, 500);

  // --- Queries ---

  const { data: monthlySales, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['sales', 'monthly'],
    queryFn: reportsService.getSalesLastMonth,
    enabled: activeReport === 'monthly',
  });

  const { data: dailySales, isLoading: isLoadingDaily } = useQuery({
    queryKey: ['sales', 'daily', selectedDate],
    queryFn: () => reportsService.getSalesByDate(selectedDate),
    enabled: activeReport === 'daily' && !!selectedDate,
  });

  const { data: topCustomers = [], isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['sales', 'top-customers'],
    queryFn: reportsService.getTopCustomers,
    enabled: activeReport === 'customers',
  });

  const { data: topBooks = [], isLoading: isLoadingBooks } = useQuery({
    queryKey: ['sales', 'top-books'],
    queryFn: reportsService.getTopSellingBooks,
    enabled: activeReport === 'books',
  });

  const { data: replenishmentStats, isLoading: isLoadingReplenishment, error: replenishmentError } = useQuery({
    queryKey: ['replenishment', debouncedSearchISBN],
    queryFn: () => reportsService.getReplenishmentStats(debouncedSearchISBN),
    enabled: activeReport === 'replenishment' && debouncedSearchISBN.length > 0,
    retry: false,
  });

  const reportTypes = [
    { id: 'monthly' as ReportType, label: 'Monthly Sales', icon: DollarSign },
    { id: 'daily' as ReportType, label: 'Daily Sales', icon: Calendar },
    { id: 'customers' as ReportType, label: 'Top Customers', icon: Users },
    { id: 'books' as ReportType, label: 'Top Books', icon: TrendingUp },
    { id: 'replenishment' as ReportType, label: 'Replenishment', icon: Package },
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
              className={`p-4 rounded-lg border-2 transition-all ${activeReport === type.id
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
            <h2 className="mb-6">Total Sales for Previous Month</h2>
            {isLoadingMonthly ? <Loading size="medium" /> : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center mb-6">
                <p className="text-muted-foreground mb-2">Total Revenue ({monthlySales?.period || 'Last Month'})</p>
                <h1 className="text-primary">${Number(monthlySales?.total_sales || 0).toFixed(2)}</h1>
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              * Detailed transaction list is not available in this view.
            </p>
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
            {isLoadingDaily ? <Loading size="medium" /> : (
              <div className="bg-secondary/30 rounded-lg p-8 text-center mb-6">
                <p className="text-muted-foreground mb-2">Total Revenue for {selectedDate}</p>
                <h1 className="text-primary">${Number(dailySales?.total_sales || 0).toFixed(2)}</h1>
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              * Detailed transaction list is not available in this view.
            </p>
          </div>
        </div>
      )}

      {/* Top Customers Report */}
      {activeReport === 'customers' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Top 5 Customers (Last 3 Months)</h2>
          {isLoadingCustomers ? <Loading size="medium" /> : (
            <div className="space-y-4">
              {topCustomers.length === 0 ? <p className="text-center text-muted-foreground">No data available.</p> :
                topCustomers.map((customer, index) => (
                  <div
                    key={customer.user_id}
                    className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <span className="text-xl">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3>{`${customer.first_name} ${customer.last_name}`}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary">${Number(customer.total_spent).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Top Books Report */}
      {activeReport === 'books' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Top 10 Selling Books (Last 3 Months)</h2>
          {isLoadingBooks ? <Loading size="medium" /> : (
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
                  {topBooks.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-4">No data available.</td></tr>
                  ) : topBooks.map((book, index) => (
                    <tr key={book.isbn} className="hover:bg-secondary/30">
                      <td className="px-6 py-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">{book.title}</td>
                      <td className="px-6 py-4 font-mono text-sm">{book.isbn}</td>
                      <td className="px-6 py-4">{book.total_copies_sold}</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            // Safe division
                            style={{ width: `${(book.total_copies_sold / (topBooks[0]?.total_copies_sold || 1)) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Replenishment Stats Report */}
      {activeReport === 'replenishment' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-6">Book Replenishment Stats</h2>
          <div className="mb-6">
            <label htmlFor="search" className="block mb-2">
              Enter ISBN to check replenishment history
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="search"
                type="text"
                value={searchISBN}
                onChange={(e) => setSearchISBN(e.target.value)}
                placeholder="e.g. 978-0-123456-47-2"
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {debouncedSearchISBN && (
            <div>
              {isLoadingReplenishment ? <Loading size="medium" /> : replenishmentStats ? (
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="mb-4">Replenishment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground">Book Title</p>
                      <p className="font-semibold text-lg">{replenishmentStats.title}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ISBN</p>
                      <p className="font-mono">{replenishmentStats.isbn || debouncedSearchISBN}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Times Ordered from Publisher</p>
                      <h2 className="text-primary text-3xl">{replenishmentStats.times_ordered}</h2>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Copies Received</p>
                      <h2 className="text-green-600 text-3xl">{replenishmentStats.total_quantity_received}</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {replenishmentError ? "No replenishment orders found for this book." : "Loading..."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
