import React, { useState } from 'react';
import { Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Adjust the path as needed

const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth(); // <-- use logout from context

  return (
    <header className="z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center space-x-2">
        {/* Optional slot for logo, search, etc. */}
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-slate-600 hover:text-primary-600 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        <div className="relative">
          <button
            className="relative text-slate-600 hover:text-primary-600 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-600 text-[10px] font-medium text-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-md border border-slate-200 bg-white p-2 shadow-lg animate-fade-in">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-semibold">Notifications</h3>
                <button className="text-xs text-primary-600 hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto py-2">
                <div className="rounded-md bg-slate-50 p-3 mb-2">
                  <p className="text-sm font-medium">Opportunity Update</p>
                  <p className="text-xs text-slate-500">
                    Summit Financial Group opportunity moved to Negotiation stage
                  </p>
                  <p className="mt-1 text-xs text-slate-400">10 minutes ago</p>
                </div>
                <div className="rounded-md p-3 mb-2">
                  <p className="text-sm font-medium">New Lead</p>
                  <p className="text-xs text-slate-500">
                    Emma Williams from HealthFirst Technologies
                  </p>
                  <p className="mt-1 text-xs text-slate-400">1 hour ago</p>
                </div>
                <div className="rounded-md p-3">
                  <p className="text-sm font-medium">Task Reminder</p>
                  <p className="text-xs text-slate-500">
                    Follow up with Cloudburst Technologies due today
                  </p>
                  <p className="mt-1 text-xs text-slate-400">3 hours ago</p>
                </div>
              </div>
              <div className="border-t pt-2">
                <button className="w-full rounded-md bg-slate-100 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-1 rounded-full"
          >
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
              <User className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium md:block">Alex Morgan</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white shadow-lg animate-fade-in">
              <div className="p-3 border-b">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-xs text-slate-500">alex.morgan@company.com</p>
              </div>
              <div className="p-2">
                <button className="flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={logout} // <-- trigger logout on click
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
