import { useState } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Calendar, DollarSign, Clock, XCircle, Edit2, Trash2, Shield, Award } from 'lucide-react';

const Staff = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const staffMembers = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      role: 'Senior Washer', 
      phone: '+91 98765 43210',
      email: 'rajesh@aquawash.com',
      address: 'Mumbai, Maharashtra',
      salary: 18000,
      attendance: 98,
      performance: 4.8,
      joinDate: '2022-03-15',
      image: 'RK'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      role: 'Supervisor', 
      phone: '+91 98765 43211',
      email: 'priya@aquawash.com',
      address: 'Mumbai, Maharashtra',
      salary: 25000,
      attendance: 95,
      performance: 4.9,
      joinDate: '2021-06-01',
      image: 'PS'
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      role: 'Detailing Expert', 
      phone: '+91 98765 43212',
      email: 'amit@aquawash.com',
      address: 'Thane, Maharashtra',
      salary: 22000,
      attendance: 92,
      performance: 4.7,
      joinDate: '2022-01-10',
      image: 'AP'
    },
    { 
      id: 4, 
      name: 'Sneha Gupta', 
      role: 'Receptionist', 
      phone: '+91 98765 43213',
      email: 'sneha@aquawash.com',
      address: 'Mumbai, Maharashtra',
      salary: 16000,
      attendance: 100,
      performance: 4.6,
      joinDate: '2023-02-20',
      image: 'SG'
    },
    { 
      id: 5, 
      name: 'Vikram Singh', 
      role: 'Washer', 
      phone: '+91 98765 43214',
      email: 'vikram@aquawash.com',
      address: 'Navi Mumbai',
      salary: 15000,
      attendance: 88,
      performance: 4.5,
      joinDate: '2023-05-01',
      image: 'VS'
    },
  ];

  const roles = ['All', 'Supervisor', 'Senior Washer', 'Washer', 'Detailing Expert', 'Receptionist'];
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredStaff = staffMembers.filter(member => {
    return selectedRole === 'All' || member.role === selectedRole;
  });

  const totalSalary = staffMembers.reduce((acc, member) => acc + member.salary, 0);
  const avgAttendance = Math.round(staffMembers.reduce((acc, member) => acc + member.attendance, 0) / staffMembers.length);

  const getPerformanceColor = (rating) => {
    if (rating >= 4.8) return 'text-emerald-600 bg-emerald-100';
    if (rating >= 4.5) return 'text-blue-600 bg-blue-100';
    return 'text-amber-600 bg-amber-100';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage team members, attendance, and performance.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Staff</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{staffMembers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <User size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Attendance</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{avgAttendance}%</p>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Calendar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Salary</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalSalary.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Roles</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{roles.length - 1}</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Shield size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedRole === role 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                {member.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 truncate">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getPerformanceColor(member.performance)}`}>
                    <Award size={12} className="mr-1" />
                    {member.performance}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {member.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                {member.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                {member.address}
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xs text-slate-500">Salary</p>
                <p className="font-bold text-slate-800">₹{member.salary.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">Attendance</p>
                <p className={`font-bold ${member.attendance >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{member.attendance}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">Joined</p>
                <p className="font-bold text-slate-800">{member.joinDate.split('-')[0]}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">
              <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Edit2 size={16} />
                Edit
              </button>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
                <Clock size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Add New Staff Member</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <form className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input type="text" placeholder="Enter full name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                    <option>Washer</option>
                    <option>Senior Washer</option>
                    <option>Detailing Expert</option>
                    <option>Supervisor</option>
                    <option>Receptionist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" placeholder="staff@aquawash.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input type="text" placeholder="Enter address" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Salary (₹)</label>
                  <input type="number" placeholder="15000" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Join Date</label>
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;

