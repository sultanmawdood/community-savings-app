import { Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import Avatar from './Avatar';

export default function Navbar({ user, onRoleChange, darkMode, onToggleDarkMode, notifCount = 3 }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left spacer (mobile menu button sits here) */}
      <div className="w-8 lg:hidden" />

      {/* Page title area — empty, pages render their own titles */}
      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Dark mode */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* User + role switcher */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{user.name}</p>
            <div className="relative mt-0.5">
              <select
                value={user.role}
                onChange={(e) => onRoleChange(e.target.value)}
                className="text-xs text-slate-500 dark:text-slate-400 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg pl-2 pr-6 py-0.5 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="member">Member</option>
                <option value="accountant">Accountant</option>
                <option value="admin">Admin</option>
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <Avatar name={user.name} size="md" />
        </div>
      </div>
    </header>
  );
}
