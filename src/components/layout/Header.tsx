import React, { useState } from 'react';
import { Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');  // Redirect to /auth after sign out (consistent with ProtectedRoute)
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally show user an error message here
    }
  };

  return (
    <header className="z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center space-x-2">
        {children}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-slate-600 hover:text-primary-600 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notifications UI code omitted for brevity */}

        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-1 rounded-full"
          >
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
              <User className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium md:block">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
            </span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white shadow-lg animate-fade-in">
              <div className="p-3 border-b">
                <p className="font-medium">{user?.user_metadata?.first_name} {user?.user_metadata?.last_name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="p-2">
                <button className="flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handleSignOut}   // Sign out button triggers handler
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