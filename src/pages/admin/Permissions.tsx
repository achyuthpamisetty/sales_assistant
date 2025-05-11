import React, { useState } from 'react';
import { Shield, Search, Check, X } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  roles: string[];
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

const Permissions = () => {
  const [permissionGroups] = useState<PermissionGroup[]>([
    {
      name: 'Leads',
      permissions: [
        {
          id: 'lead-view',
          name: 'View Leads',
          description: 'Can view lead records',
          roles: ['Admin', 'Sales Manager', 'Sales Representative'],
        },
        {
          id: 'lead-create',
          name: 'Create Leads',
          description: 'Can create new lead records',
          roles: ['Admin', 'Sales Manager', 'Sales Representative'],
        },
        {
          id: 'lead-edit',
          name: 'Edit Leads',
          description: 'Can edit existing lead records',
          roles: ['Admin', 'Sales Manager'],
        },
        {
          id: 'lead-delete',
          name: 'Delete Leads',
          description: 'Can delete lead records',
          roles: ['Admin'],
        },
      ],
    },
    {
      name: 'Opportunities',
      permissions: [
        {
          id: 'opp-view',
          name: 'View Opportunities',
          description: 'Can view opportunity records',
          roles: ['Admin', 'Sales Manager', 'Sales Representative'],
        },
        {
          id: 'opp-create',
          name: 'Create Opportunities',
          description: 'Can create new opportunity records',
          roles: ['Admin', 'Sales Manager', 'Sales Representative'],
        },
        {
          id: 'opp-edit',
          name: 'Edit Opportunities',
          description: 'Can edit existing opportunity records',
          roles: ['Admin', 'Sales Manager'],
        },
        {
          id: 'opp-delete',
          name: 'Delete Opportunities',
          description: 'Can delete opportunity records',
          roles: ['Admin'],
        },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Permissions</h1>
          <p className="text-slate-500">Manage role-based permissions and access controls</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Shield className="mr-2 h-4 w-4" />
          Add New Permission
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search permissions..."
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
            </div>
          </div>
        </div>

        <div className="p-4">
          {permissionGroups.map((group) => (
            <div key={group.name} className="mb-8 last:mb-0">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">{group.name}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Permission
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                        Admin
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                        Sales Manager
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                        Sales Representative
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {group.permissions.map((permission) => (
                      <tr key={permission.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{permission.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-500">{permission.description}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('Admin') ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-slate-300" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('Sales Manager') ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-slate-300" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('Sales Representative') ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-slate-300" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permissions;