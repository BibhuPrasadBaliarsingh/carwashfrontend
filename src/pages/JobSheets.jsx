import { useState } from 'react';
import { Plus, Search, Filter, Car, Camera, FileText, MoreVertical, Clock, CheckCircle, XCircle } from 'lucide-react';

const JobSheets = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const jobSheets = [
    { id: 'JS-001', customer: 'John Smith', vehicle: 'Toyota Fortuner', service: 'Premium Detailing', status: 'In Progress', time: '10:30 AM', amount: '$120' },
    { id: 'JS-002', customer: 'Sarah Johnson', vehicle: 'Honda City', service: 'Full Wash', status: 'Pending', time: '11:00 AM', amount: '$35' },
    { id: 'JS-003', customer: 'Mike Davis', vehicle: 'BMW X5', service: 'Premium Wash + Polishing', status: 'Completed', time: '09:00 AM', amount: '$180' },
    { id: 'JS-004', customer: 'Emily Brown', vehicle: 'Audi A4', service: 'Interior Cleaning', status: 'Completed', time: '08:30 AM', amount: '$75' },
    { id: 'JS-005', customer: 'Robert Wilson', vehicle: 'Mercedes C-Class', service: 'Ceramic Coating', status: 'In Progress', time: '12:00 PM', amount: '$250' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700 ring-blue-600/20';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 ring-emerald-600/20';
      case 'Pending': return 'bg-amber-100 text-amber-700 ring-amber-600/20';
      case 'Cancelled': return 'bg-red-100 text-red-700 ring-red-600/20';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress': return <Clock size={14} />;
      case 'Completed': return <CheckCircle size={14} />;
      case 'Pending': return <Clock size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Sheets</h1>
          <p className="text-sm text-slate-500 mt-1">Manage vehicle service and job workflows.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} />
          New Job Sheet
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search job sheets..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'In Progress', 'Pending', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                filter === status 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Job Sheets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Job ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Vehicle</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Time</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobSheets.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-blue-600">{job.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-sm">
                        {job.customer.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{job.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Car size={16} className="text-slate-400" />
                      {job.vehicle}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{job.service}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{job.time}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">{job.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ring-1 ${getStatusStyle(job.status)}`}>
                      {getStatusIcon(job.status)}
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Photos">
                        <Camera size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Job Sheet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Create New Job Sheet</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <form className="p-6 space-y-5">
              {/* Customer Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Customer</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                  <option>Select customer...</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Davis</option>
                </select>
              </div>

              {/* Vehicle Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Name</label>
                  <input type="text" placeholder="e.g. Toyota Fortuner" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Number</label>
                  <input type="text" placeholder="e.g. ABC 1234" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Package</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                  <option>Select service...</option>
                  <option>Basic Wash - $20</option>
                  <option>Premium Wash - $35</option>
                  <option>Full Detailing - $120</option>
                  <option>Ceramic Coating - $250</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Special Instructions</label>
                <textarea rows="3" placeholder="Any special notes for this job..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Create Job Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSheets;

