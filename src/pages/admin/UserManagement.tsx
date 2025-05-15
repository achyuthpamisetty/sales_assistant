import React, { useState, useMemo } from 'react';
import { UserPlus, Search, Edit, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const PAGE_SIZE = 5;

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
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      role: 'Admin',
      status: 'inactive',
      lastLogin: '2023-11-05 10:00',
    },
    {
      id: '5',
      name: 'James Wilson',
      email: 'james.w@company.com',
      role: 'Sales Manager',
      status: 'active',
      lastLogin: '2023-11-06 15:20',
    },
    {
      id: '6',
      name: 'Linda Green',
      email: 'linda.g@company.com',
      role: 'Sales Representative',
      status: 'inactive',
      lastLogin: '2023-11-01 08:45',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on search, role and status
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter (name or email)
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Role filter
      const matchesRole = filterRole
        ? user.role.toLowerCase() === filterRole.toLowerCase()
        : true;

      // Status filter
      const matchesStatus = filterStatus
        ? user.status.toLowerCase() === filterStatus.toLowerCase()
        : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handle page changes
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  // Reset to first page when filters/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole, filterStatus]);

  return (
    <div className="space-y-6">
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

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-slate-300 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex space-x-2 ml-4">
              <select
                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Sales Representative">Sales Representative</option>
              </select>
              <select
                className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Last Login
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                        {user.role}
                      </span>
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {user.lastLogin}
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-medium">
                {filteredUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)}
              </span>{' '}
              of <span className="font-medium">{filteredUsers.length}</span> users
            </div>
            <div className="flex space-x-2">
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
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
