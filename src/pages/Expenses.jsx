import { useState } from 'react';
import { Plus, Search, DollarSign, TrendingUp, Calendar, XCircle, Edit2, Trash2, Receipt } from 'lucide-react';

const Expenses = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const expenses = [
    { id: 'EXP-001', category: 'Supplies', description: 'Purchased Car Shampoo', amount: 2500, date: '2024-01-15', paymentMode: 'Cash', status: 'Approved' },
    { id: 'EXP-002', category: 'Utilities', description: 'Electricity Bill', amount: 4500, date: '2024-01-14', paymentMode: 'UPI', status: 'Approved' },
    { id: 'EXP-003', category: 'Staff Salary', description: 'January Advance', amount: 15000, date: '2024-01-13', paymentMode: 'Bank Transfer', status: 'Approved' },
    { id: 'EXP-004', category: 'Equipment', description: 'Vacuum Cleaner Repair', amount: 1200, date: '2024-01-12', paymentMode: 'Cash', status: 'Pending' },
    { id: 'EXP-005', category: 'Marketing', description: 'Flyer Printing', amount: 800, date: '2024-01-11', paymentMode: 'UPI', status: 'Approved' },
    { id: 'EXP-006', category: 'Supplies', description: 'Microfiber Cloths', amount: 1500, date: '2024-01-10', paymentMode: 'Cash', status: 'Approved' },
  ];

  const categories = ['All', 'Supplies', 'Utilities', 'Staff Salary', 'Equipment', 'Marketing'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExpenses = expenses.filter(exp => {
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesFilter = filter === 'all' || exp.status.toLowerCase() === filter;
    return matchesCategory && matchesFilter;
  });

  const getCategoryStyle = (category) => {
    const styles = {
      'Supplies': 'bg-blue-100 text-blue-700',
      'Utilities': 'bg-purple-100 text-purple-700',
      'Staff Salary': 'bg-emerald-100 text-emerald-700',
      'Equipment': 'bg-amber-100 text-amber-700',
      'Marketing': 'bg-pink-100 text-pink-700',
    };
    return styles[category] || 'bg-slate-100 text-slate-700';
  };

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'Pending').reduce((acc, exp) => acc + exp.amount, 0);
  const thisMonthExpenses = totalExpenses; // Simplified for demo

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Expenses</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage daily expenses.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Expenses</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">₹{pendingExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Receipt size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">This Month</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">₹{thisMonthExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <TrendingUp size={24} />
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
            placeholder="Search expenses..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'Approved', 'Pending'].map((status) => (
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

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Expense ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Description</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Payment Mode</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-blue-600">{expense.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getCategoryStyle(expense.category)}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{expense.description}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">₹{expense.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{expense.date}</td>
                  <td className="px-6 py-4 text-slate-600">{expense.paymentMode}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md ring-1 ${
                      expense.status === 'Approved' 
                        ? 'bg-emerald-100 text-emerald-700 ring-emerald-600/20' 
                        : 'bg-amber-100 text-amber-700 ring-amber-600/20'
                    }`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Add New Expense</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <form className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <input type="text" placeholder="Enter description" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Mode</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                  <option>Card</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;

