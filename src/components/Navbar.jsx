import { Bell, Moon, Sun, ChevronDown, Menu } from 'lucide-react';
import Avatar from './Avatar';

export default function Navbar({ user, onRoleChange, darkMode, onToggleDarkMode, notifCount = 3, onMenuOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-3 flex items-center gap-3">

      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* App name — mobile only */}
      <span className="lg:hidden font-bold text-slate-900 dark:text-white text-base tracking-tight">ROSCA</span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-2">

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
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-0.5" />

        {/* Avatar + name + role switcher */}
        <div className="flex items-center gap-2">
          <Avatar name={user.name} size="sm" />

          <div className="flex flex-col items-start">
            {/* Name — hidden on very small screens */}
            <p className="hidden sm:block text-sm font-semibold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
              {user.name}
            </p>

            {/* Role switcher — always visible */}
            <div className="relative">
              <select
                value={user.role}
                onChange={(e) => onRoleChange(e.target.value)}
                className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg pl-2 pr-6 py-1 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="member">Member</option>
                <option value="accountant">Accountant</option>
                <option value="admin">Admin</option>
              </select>
              <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
