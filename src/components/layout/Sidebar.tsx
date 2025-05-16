import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Briefcase,
  PhoneCall,
  TrendingUp,
  Mail,
  BarChart2,
  Calendar,
  Settings,
  X,
  Headphones,
  Shield,
  UserPlus,
  Plug,
  GitBranch
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Accounts', href: '/accounts', icon: Briefcase },
    { name: 'Contacts', href: '/contacts', icon: PhoneCall },
    { name: 'Opportunities', href: '/opportunities', icon: TrendingUp },
    { name: 'Pipeline', href: '/pipeline', icon: GitBranch },
    { name: 'Email Composer', href: '/email-composer', icon: Mail },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  const adminNavigation = [
    { name: 'User Management', href: '/admin/users', icon: UserPlus },
    { name: 'Permissions', href: '/admin/permissions', icon: Shield },
    { name: 'Integrations', href: '/admin/integrations', icon: Plug },
    { name: 'Slack', href: '/admin/slack', icon: Plug },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-screen ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center">
          <Headphones className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-primary-900">SalesAssist</span>
        </div>
        <button
          type="button"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex h-[calc(100%-4rem)] flex-col justify-between">
        <div className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600'
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    active
                      ? 'text-primary-600'
                      : 'text-slate-500 group-hover:text-primary-600'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}

          <div className="my-4 border-t border-slate-200"></div>

          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold uppercase text-slate-500">Administration</h3>
          </div>

          {adminNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600'
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    active
                      ? 'text-primary-600'
                      : 'text-slate-500 group-hover:text-primary-600'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="border-t p-4">
          <Link
            to="/settings"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-primary-600 transition-colors"
          >
            <Settings className="mr-3 h-5 w-5 text-slate-500" />
            Settings
          </Link>
          <div className="mt-4 rounded-md bg-primary-50 p-3">
            <p className="text-xs font-medium text-primary-800">Need help?</p>
            <p className="text-xs text-primary-700">
              Check out our documentation or contact support.
            </p>
            <button className="mt-2 text-xs font-medium text-primary-700 hover:text-primary-900 hover:underline">
              View support options
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
