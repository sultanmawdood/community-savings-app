import { useState } from 'react';
import {
  Wallet, CreditCard, HandCoins, CheckCircle2, FileCheck,
  LayoutDashboard, UsersRound, Trophy, X, ChevronLeft, Coins,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MENUS = {
  member: [
    { icon: Wallet,        label: 'My Savings',      path: 'my-savings' },
    { icon: CreditCard,    label: 'Pay Shares',       path: 'pay-shares' },
    { icon: HandCoins,     label: 'Request Loan',     path: 'request-loan' },
  ],
  accountant: [
    { icon: CheckCircle2,  label: 'Verify Payments',  path: 'verify-payments' },
    { icon: FileCheck,     label: 'Loan Approvals',   path: 'loan-approvals' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard',      path: 'dashboard' },
    { icon: UsersRound,    label: 'User Management',  path: 'user-management' },
    { icon: Trophy,        label: 'Run Giveaway',     path: 'giveaway' },
  ],
};

const ROLE_COLORS = {
  member:     'bg-blue-500/10 text-blue-400',
  accountant: 'bg-purple-500/10 text-purple-400',
  admin:      'bg-rose-500/10 text-rose-400',
};

export default function Sidebar({ role, currentPage, onNavigate, mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const items = MENUS[role] || [];

  const NavItem = ({ item }) => {
    const active = currentPage === item.path;
    return (
      <button
        onClick={() => { onNavigate(item.path); onMobileClose(); }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative
          ${active
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
      >
        <item.icon size={19} className="shrink-0" />
        {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
        {collapsed && (
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {item.label}
          </div>
        )}
      </button>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
          <Coins size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-white text-base leading-tight">ROSCA</p>
            <p className="text-xs text-slate-500 leading-tight">Community Savings</p>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${ROLE_COLORS[role]}`}>
            {role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {items.map((item) => <NavItem key={item.path} item={item} />)}
      </nav>

      {/* Collapse toggle (desktop) */}
      <div className="hidden lg:flex px-3 pb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition text-xs"
        >
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-900"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col bg-slate-900 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} shrink-0`}>
        <SidebarContent />
      </aside>
    </>
  );
}
