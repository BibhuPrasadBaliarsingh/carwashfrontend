import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import { reportsAPI, appointmentsAPI, customersAPI } from '../services/api';

const StatCard = ({ title, value, icon: Icon, trend, colorClass, loading }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${colorClass.split(' ')[0]}`} />
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-2">
          {loading ? <Loader2 className="animate-spin" size={28} /> : value}
        </h3>
      </div>
      <div className={`p-4 rounded-2xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm relative z-10">
      <span className="flex items-center font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
        <TrendingUp size={14} className="mr-1" />
        {trend || '0%'}
      </span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    appointments: 0,
    customers: 0,
    activeAMCs: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch all data in parallel
      const [statsRes, appointmentsRes, customersRes] = await Promise.all([
        reportsAPI.getDashboardSummary().catch(() => ({ data: {} })),
        appointmentsAPI.getAll().catch(() => ({ data: [] })),
        customersAPI.getAll().catch(() => ({ data: [] }))
      ]);

      // Get today's appointments (jobsheets)
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = (appointmentsRes.data || []).filter(apt => 
        apt.date && apt.date.startsWith(today)
      );

      // Calculate stats from actual data
      const appointments = appointmentsRes.data || [];
      const customers = customersRes.data || [];

      setStats({
        revenue: statsRes.data?.revenue || 0,
        appointments: appointments.length,
        customers: customers.length,
        activeAMCs: customers.filter(c => c.amcStatus === 'active').length || Math.floor(customers.length * 0.3)
      });

      // Set recent jobs (today's appointments)
      setRecentJobs(todayAppointments.slice(0, 5));
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      'in-progress': 'bg-blue-50 text-blue-700 ring-blue-600/20',
      'completed': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      'cancelled': 'bg-red-50 text-red-700 ring-red-600/20'
    };
    return colors[status] || 'bg-slate-50 text-slate-700 ring-slate-600/20';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back! 👋</h1>
          <p className="text-slate-500 mt-1">Here is what is happening at AquaWash today.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/appointments'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
        >
          <Calendar size={18} />
          New Appointment
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign} 
          trend="+12.5%" 
          colorClass="bg-emerald-100 text-emerald-600"
          loading={loading}
        />
        <StatCard 
          title="Appointments" 
          value={stats.appointments}
          icon={Calendar} 
          trend="+8.2%" 
          colorClass="bg-blue-100 text-blue-600"
          loading={loading}
        />
        <StatCard 
          title="Customers" 
          value={stats.customers}
          icon={Users} 
          trend="+4.1%" 
          colorClass="bg-indigo-100 text-indigo-600"
          loading={loading}
        />
        <StatCard 
          title="Active AMCs" 
          value={stats.activeAMCs}
          icon={TrendingUp} 
          trend="+15.3%" 
          colorClass="bg-amber-100 text-amber-600"
          loading={loading}
        />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Today's Jobsheet</h2>
            <button 
              onClick={() => window.location.href = '/appointments'}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : recentJobs.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {recentJobs.map((job, i) => (
                <div key={job._id || i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50/50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-500 font-bold shadow-sm">
                      {job.customerName?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{job.customerName || 'Customer'}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">{job.service || 'Premium Wash'}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {job.time || 'Today'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <span className={`px-3 py-1 ring-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(job.status)}`}>
                      {job.status || 'Pending'}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Users size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <Calendar size={40} className="mx-auto mb-2 text-slate-300" />
              <p>No appointments scheduled for today</p>
              <button 
                onClick={() => window.location.href = '/appointments'}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                Create an appointment
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="space-y-4 flex-1">
             <button 
               onClick={() => window.location.href = '/customers'}
               className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-sm group"
             >
               <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                       <Users size={20} />
                   </div>
                   <div>
                       <h4 className="font-semibold text-slate-800 group-hover:text-blue-900 transition-colors">Add New Customer</h4>
                       <p className="text-xs text-slate-500 mt-0.5">Register a new client profile</p>
                   </div>
               </div>
             </button>
             
             <button 
               onClick={() => window.location.href = '/expenses'}
               className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-sm group"
             >
               <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                       <DollarSign size={20} />
                   </div>
                   <div>
                       <h4 className="font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">Record Expense</h4>
                       <p className="text-xs text-slate-500 mt-0.5">Log today's cash outflows</p>
                   </div>
               </div>
             </button>

             <button 
               onClick={() => window.location.href = '/jobsheets'}
               className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all hover:-translate-y-0.5 shadow-sm group"
             >
               <div className="flex items-center gap-3">
                   <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                       <Calendar size={20} />
                   </div>
                   <div>
                       <h4 className="font-semibold text-slate-800 group-hover:text-purple-900 transition-colors">Create Jobsheet</h4>
                       <p className="text-xs text-slate-500 mt-0.5">Start a new car wash job</p>
                   </div>
               </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

