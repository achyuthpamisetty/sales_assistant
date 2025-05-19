import React, { useState } from 'react';
import { UserPlus, Search, Edit, Shield, Mail, X, Check, Ban, PauseCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'frozen';
  lastLogin: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  sendAccessLink: boolean;
}

const UserManagement = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Alex Morgan',
      email: 'alex.morgan@company.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-11-07 14:30',
    },
    {
      id: '2',
      name: 'Sarah Thompson',
      email: 'sarah.t@company.com',
      role: 'Sales Manager',
      status: 'active',
      lastLogin: '2023-11-07 12:15',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'Sales Representative',
      status: 'active',
      lastLogin: '2023-11-07 09:45',
    },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Sales Representative',
    sendAccessLink: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation logic here
    console.log('Creating user:', formData);
    setShowAddUser(false);
  };

  const handleSendInvitation = async (userId: string) => {
    // Handle sending invitation logic
    console.log('Sending invitation to user:', userId);
  };

  const handleDeactivate = async (userId: string) => {
    // Handle deactivation logic
    console.log('Deactivating user:', userId);
  };

  const handleFreeze = async (userId: string) => {
    // Handle freeze logic
    console.log('Freezing user:', userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage user accounts and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                >
                  <option>Sales Representative</option>
                  <option>Sales Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendAccessLink"
                  checked={formData.sendAccessLink}
                  onChange={(e) => setFormData({...formData, sendAccessLink: e.target.checked})}
                  className="h-4 w-4 rounded border-slate-300 text-primary-600"
                />
                <label htmlFor="sendAccessLink" className="ml-2 text-sm text-slate-700">
                  Send access link via email
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="rounded-md border border-slate-300 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex space-x-2">
              <select className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Sales Manager</option>
                <option value="rep">Sales Representative</option>
              </select>
              <select className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-medium">
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'frozen' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleSendInvitation(user.id)}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-600"
                        title="Send Invitation"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(user.id)}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                        title="Deactivate"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleFreeze(user.id)}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                        title="Freeze"
                      >
                        <PauseCircle className="h-4 w-4" />
                      </button>
                      <button className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-600">
                        <Shield className="h-4 w-4" />
                      </button>
                      <button className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">3</span> of{' '}
              <span className="font-medium">3</span> users
            </div>
            <div className="flex space-x-2">
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;