import { useState } from 'react';
import { Plus, Search, Package, Calendar, DollarSign, Users, Check, XCircle, Edit2, Trash2, Star } from 'lucide-react';

const Packages = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const packages = [
    { 
      id: 'AMC-001', 
      name: 'Basic Wash', 
      type: 'Monthly', 
      price: 999, 
      services: ['Basic Exterior Wash', 'Interior Vacuum', 'Tire Cleaning'],
      visits: 4,
      validDays: 30,
      activeCustomers: 15,
      isPopular: false
    },
    { 
      id: 'AMC-002', 
      name: 'Premium Detailing', 
      type: 'Monthly', 
      price: 2499, 
      services: ['Full Exterior Wash', 'Interior Deep Clean', 'Polishing', 'Tire Dressing', 'Engine Cleaning'],
      visits: 4,
      validDays: 30,
      activeCustomers: 28,
      isPopular: true
    },
    { 
      id: 'AMC-003', 
      name: 'Elite Package', 
      type: 'Quarterly', 
      price: 6999, 
      services: ['All Premium Services', 'Ceramic Coating', 'Paint Protection', 'Free Pickup & Delivery'],
      visits: 12,
      validDays: 90,
      activeCustomers: 8,
      isPopular: false
    },
    { 
      id: 'AMC-004', 
      name: 'Annual Gold', 
      type: 'Yearly', 
      price: 24999, 
      services: ['All Elite Services', 'Priority Booking', '24/7 Support', 'Free Repairs upto ₹5000'],
      visits: 52,
      validDays: 365,
      activeCustomers: 5,
      isPopular: false
    },
  ];

  const serviceCategories = ['Wash', 'Detailing', 'Coating', 'Interior', 'Pickup'];

  const totalRevenue = packages.reduce((acc, pkg) => acc + (pkg.price * pkg.activeCustomers), 0);
  const totalCustomers = packages.reduce((acc, pkg) => acc + pkg.activeCustomers, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Service Packages (AMC)</h1>
          <p className="text-sm text-slate-500 mt-1">Manage membership plans and service packages.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} />
          New Package
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Packages</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{packages.length}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Package size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Customers</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Popular Package</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">Premium</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Star size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all group ${pkg.isPopular ? 'border-blue-300 ring-2 ring-blue-500/20' : 'border-slate-100'}`}>
            {/* Popular Badge */}
            {pkg.isPopular && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-1.5 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{pkg.name}</h3>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${pkg.type === 'Monthly' ? 'bg-blue-100 text-blue-700' : pkg.type === 'Quarterly' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                    {pkg.type}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-800">₹{pkg.price.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">/{pkg.visits} visits</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-600 mb-2">Services Included:</p>
                <ul className="space-y-2">
                  {pkg.services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={16} className="text-emerald-500 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={16} />
                  {pkg.validDays} days validity
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users size={16} />
                  {pkg.activeCustomers} customers
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
                  View Customers
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Create New Package</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <form className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Package Name</label>
                <input type="text" placeholder="e.g. Premium Detailing" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Visits</label>
                  <input type="number" placeholder="4" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Validity (Days)</label>
                  <input type="number" placeholder="30" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Services Included</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Basic Exterior Wash', 'Interior Vacuum', 'Tire Cleaning', 'Polishing', 'Ceramic Coating', 'Interior Deep Clean'].map((service) => (
                    <label key={service} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <span className="text-sm text-slate-600">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;

