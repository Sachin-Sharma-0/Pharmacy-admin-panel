"use client";

import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PermissionProfile } from './types';

// Sample permission profiles data
const initialPermissionProfiles: PermissionProfile[] = [
  { 
    id: 1, 
    name: 'Super Admin',
    type: 'edit',
    permissions: {
      'Admin Setting': ['All'],
      'Vendor Management': ['All'],
      'Customer Management': ['All'],
      'Customer Service Management': ['All'],
      'Analytics and Reporting': ['All'],
      'Finance and Accounting': ['All'],
      'Admin Management': ['All'],
      'Notification and Communication': ['All']
    }
  },
  { 
    id: 2, 
    name: 'Vendor Manager',
    type: 'edit',
    permissions: {
      'Vendor Management': ['New Vendor', 'Approved Vendor', 'Vendor Service'],
      'Analytics and Reporting': ['Vendor Reports']
    }
  },
  { 
    id: 3, 
    name: 'Customer Support',
    type: 'edit',
    permissions: {
      'Customer Management': ['View Customer', 'Update Customer'],
      'Customer Service Management': ['Add New', 'Open', 'Resolve', 'Closed', 'Reopen Ticket']
    }
  },
  { 
    id: 4, 
    name: 'Finance Manager',
    type: 'edit',
    permissions: {
      'Finance and Accounting': ['All'],
      'Analytics and Reporting': ['Financial Reports']
    }
  },
  { 
    id: 5, 
    name: 'Analytics Manager',
    type: 'view',
    permissions: {
      'Analytics and Reporting': ['All']
    }
  },
  { 
    id: 6, 
    name: 'Content Manager',
    type: 'edit',
    permissions: {
      'Admin Setting': ['Content Settings'],
      'Notification and Communication': ['Email Templates', 'Push Notifications']
    }
  },
  { 
    id: 7, 
    name: 'Limited Access',
    type: 'view',
    permissions: {
      'Customer Management': ['View Customer'],
      'Vendor Management': ['View Vendor']
    }
  },
];

export default function PermissionRoles() {
  const [permissionProfiles, setPermissionProfiles] = useState<PermissionProfile[]>(initialPermissionProfiles);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Permission Roles</h1>
          <p className="mt-2 text-sm text-gray-700">Manage permission profiles for admin users.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin-management/create-permissions"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Create New Permission
          </Link>
        </div>
      </div>

      {/* Permission Profiles Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permission Profile Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categories</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {permissionProfiles.map((profile) => (
                    <tr key={profile.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {profile.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {profile.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${profile.type === 'edit' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {profile.type === 'edit' ? 'Edit' : 'View'}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="max-w-xs">
                          {Object.keys(profile.permissions).join(', ')}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link
                          href={`/admin-management/create-permissions?id=${profile.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}