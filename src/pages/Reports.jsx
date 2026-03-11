import { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Car, Download, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('thisMonth');
  
  const revenueData = [
    { month: 'Jan', revenue: 85000, expenses: 32000 },
    { month: 'Feb', revenue: 92000, expenses: 35000 },
    { month: 'Mar', revenue: 78000, expenses: 28000 },
    { month: 'Apr', revenue: 105000, expenses: 40000 },
    { month: 'May', revenue: 98000, expenses: 36000 },
    { month: 'Jun', revenue: 112000, expenses: 42000 },
  ];

  const topServices = [
    { name: 'Premium Wash', count: 245, revenue: 8575, growth: 12 },
    { name: 'Full Detailing', count: 156, revenue: 18720, growth: 8 },
    { name: 'Basic Wash', count: 189, revenue: 3780, growth: -3 },
    { name: 'Interior Cleaning', count: 98, revenue: 7350, growth: 15 },
    { name: 'Ceramic Coating', count: 45, revenue: 11250, growth: 22 },
  ];

  const customerStats = [
    { label: 'New Customers', value: 48, growth: 15, isPositive: true },
    { label: 'Returning Customers', value: 156, growth: 8, isPositive: true },
    { label: 'AMC Holders', value: 89, growth: 12, isPositive: true },
    { label: 'Churn Rate', value: '3.2%', growth: 0.5, isPositive: false },
  ];

  const dailyStats = [
    { day: 'Mon', jobs: 28, revenue: 4200 },
    { day: 'Tue', jobs: 32, revenue: 4800 },
    { day: 'Wed', jobs: 25, revenue: 3800 },
    { day: 'Thu', jobs: 35, revenue: 5200 },
    { day: 'Fri', jobs: 42, revenue: 6300 },
    { day: 'Sat', jobs: 48, revenue: 7200 },
    { day: 'Sun', jobs: 22, revenue: 3300 },
  ];

  const maxJobs = Math.max(...dailyStats.map(d => d.jobs));
  const totalRevenue = revenueData.reduce((acc, d) => acc + d.revenue, 0);
  const totalExpenses = revenueData.reduce((acc, d) => acc + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Track business performance and insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +12.5% from last period
              </p>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Net Profit</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">₹{netProfit.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +8.2% from last period
              </p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Jobs</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">1,456</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +5.3% from last period
              </p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Car size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Customers</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">293</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +4.1% from last period
              </p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Revenue vs Expenses</h2>
          <div className="space-y-4">
            {revenueData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-10 text-sm font-medium text-slate-500">{data.month}</span>
                <div className="flex-1 flex gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-emerald-600 font-medium">Revenue</span>
                      <span className="text-xs text-slate-500">₹{data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(data.revenue / 120000) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-red-600 font-medium">Expenses</span>
                      <span className="text-xs text-slate-500">₹{data.expenses.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(data.expenses / 50000) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-sm text-slate-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-slate-600">Expenses</span>
            </div>
          </div>
        </div>

        {/* Daily Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Daily Jobs This Week</h2>
          <div className="flex items-end justify-between h-48 gap-2">
            {dailyStats.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-blue-50 rounded-lg relative overflow-hidden" style={{ height: `${(data.jobs / maxJobs) * 100}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all" style={{ height: '100%' }} />
                </div>
                <span className="text-xs font-medium text-slate-500">{data.day}</span>
                <span className="text-xs font-bold text-slate-700">{data.jobs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Top Services</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {topServices.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{service.name}</h4>
                    <p className="text-sm text-slate-500">{service.count} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">₹{service.revenue.toLocaleString()}</p>
                  <p className={`text-xs flex items-center gap-1 ${service.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {service.growth > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(service.growth)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Customer Overview</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="p-6 space-y-5">
            {customerStats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                  stat.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

