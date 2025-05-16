import React, { useState } from 'react';
import { UserPlus, Search, Edit, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage user accounts and permissions</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Filter Bar */}
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

        {/* Table */}
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
                  {/* User Avatar + Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-medium">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.lastLogin}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
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

        {/* Footer */}
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