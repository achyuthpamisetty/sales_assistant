import { Home, Calendar, Users } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Activities', href: '/activities', icon: Calendar },
  { name: 'Leads', href: '/leads', icon: Users },
];

const Sidebar = () => {
  return (
    <nav className="flex flex-col h-full bg-white shadow-lg">
      <div className="px-4 py-6 space-y-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;