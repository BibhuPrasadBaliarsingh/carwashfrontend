import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, X, Loader2, Edit, Trash2, Car } from 'lucide-react';
import { appointmentsAPI, customersAPI, packagesAPI } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    customer: '',
    package: '',
    date: '',
    time: '',
    vehicleModel: '',
    vehicleNumber: '',
    notes: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, customersRes, packagesRes] = await Promise.all([
        appointmentsAPI.getAll().catch(() => ({ data: [] })),
        customersAPI.getAll().catch(() => ({ data: [] })),
        packagesAPI.getAll().catch(() => ({ data: [] }))
      ]);
      setAppointments(appointmentsRes.data || []);
      setCustomers(customersRes.data || []);
      setPackages(packagesRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      const customer = customers.find(c => c._id === formData.customer);
      
      const appointmentData = {
        customerId: formData.customer,
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        packageId: formData.package,
        packageName: packages.find(p => p._id === formData.package)?.name || '',
        date: formData.date,
        time: formData.time,
        vehicle: {
          model: formData.vehicleModel,
          number: formData.vehicleNumber
        },
        notes: formData.notes,
        status: formData.status
      };

      if (editingAppointment) {
        await appointmentsAPI.update(editingAppointment._id, appointmentData);
      } else {
        await appointmentsAPI.create(appointmentData);
      }

      await fetchData();
      closeModal();
    } catch (err) {
      console.error('Error saving appointment:', err);
      setError(err.response?.data?.message || 'Failed to save appointment');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      await appointmentsAPI.delete(id);
      await fetchData();
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Failed to delete appointment');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentsAPI.updateStatus(id, newStatus);
      await fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  const openModal = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData({
        customer: appointment.customerId || '',
        package: appointment.packageId || '',
        date: appointment.date ? appointment.date.split('T')[0] : '',
        time: appointment.time || '',
        vehicleModel: appointment.vehicle?.model || '',
        vehicleNumber: appointment.vehicle?.number || '',
        notes: appointment.notes || '',
        status: appointment.status || 'pending'
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        customer: '',
        package: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        vehicleModel: '',
        vehicleNumber: '',
        notes: '',
        status: 'pending'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAppointment(null);
    setError('');
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-amber-100 text-amber-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'completed': 'bg-emerald-100 text-emerald-700',
      'cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.pending;
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filterStatus === 'all') return true;
    return apt.status === filterStatus;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = filteredAppointments.filter(apt => apt.date?.startsWith(today));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Jobsheet & Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Track daily wash schedules and vehicle conditions.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Book Appointment
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filterStatus === status
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-500">Today's Appointments</p>
          <p className="text-2xl font-bold text-slate-800">{todayAppointments.length}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p className="text-sm text-amber-700">Pending</p>
          <p className="text-2xl font-bold text-amber-700">
            {todayAppointments.filter(a => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-700">In Progress</p>
          <p className="text-2xl font-bold text-blue-700">
            {todayAppointments.filter(a => a.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p className="text-sm text-emerald-700">Completed</p>
          <p className="text-2xl font-bold text-emerald-700">
            {todayAppointments.filter(a => a.status === 'completed').length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <CalendarIcon size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500">No appointments found</p>
          <button onClick={() => openModal()} className="mt-2 text-blue-600 hover:underline">
            Book your first appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            {filteredAppointments.map((apt, idx) => (
              <div key={apt._id || idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${getStatusColor(apt.status)}`}>
                      {apt.status || 'Pending'}
                    </span>
                    <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                      <Clock size={14} /> {apt.date ? new Date(apt.date).toLocaleDateString() : 'No date'} {apt.time || ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {apt.vehicle?.model || 'Vehicle'} - {apt.packageName || 'Wash Service'}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Customer: {apt.customerName || 'Unknown'} • {apt.customerPhone || ''} • {apt.vehicle?.number || ''}
                  </p>
                  {apt.notes && (
                    <p className="text-slate-400 text-xs mt-2">Notes: {apt.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={apt.status}
                    onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button 
                    onClick={() => openModal(apt)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(apt._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit">
            <h3 className="font-bold text-slate-800 mb-4">Calendar</h3>
            <div className="bg-slate-50 rounded-xl aspect-square flex items-center justify-center border border-slate-100 border-dashed">
              <div className="text-center p-4">
                <p className="text-slate-600 font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{new Date().getDate()}</p>
                <p className="text-slate-400 text-sm mt-2">
                  {todayAppointments.length} appointment{todayAppointments.length !== 1 ? 's' : ''} today
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
                <select
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c._id} value={c._id}>{c.name} - {c.phone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Package *</label>
                <select
                  required
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="">Select Package</option>
                  {packages.map(p => (
                    <option key={p._id} value={p._id}>{p.name} - ${p.price}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Toyota Camry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="ABC 1234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  rows={3}
                  placeholder="Any special instructions..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-70"
                >
                  {saving && <Loader2 size={18} className="animate-spin" />}
                  {editingAppointment ? 'Update' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;

