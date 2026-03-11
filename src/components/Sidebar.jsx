import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, Box, DollarSign, Package, UserCircle, Settings, Droplets, BarChart3, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Job Sheets', path: '/jobsheets', icon: FileText },
  { name: 'Inventory', path: '/inventory', icon: Box },
  { name: 'Expenses', path: '/expenses', icon: DollarSign },
  { name: 'Packages (AMC)', path: '/packages', icon: Package },
  { name: 'Staff', path: '/staff', icon: UserCircle },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

const Sidebar = ({ close }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex items-center justify-center h-20 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
            <Droplets size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-wider">AquaWash</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800 space-y-2">
        <NavLink
            to="/settings"
            onClick={close}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
        >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
        </NavLink>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


