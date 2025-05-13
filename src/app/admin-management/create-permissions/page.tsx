"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Define interfaces for type safety
interface Permission {
  id: number;
  name: string;
  type: 'edit' | 'view';
  permissions: Record<string, string[]>;
}

interface FormData {
  name: string;
  type: 'edit' | 'view';
  permissions: Record<string, string[]>;
}

// Define permission categories and their types
const permissionCategories: Record<string, string[]> = {
  'Admin Setting': ['Content Settings', 'System Settings', 'User Settings', 'All'],
  'Vendor Management': ['New Vendor', 'Approved Vendor', 'Vendor Service', 'View Vendor', 'All'],
  'Customer Management': ['View Customer', 'Update Customer', 'Delete Customer', 'All'],
  'Customer Service Management': ['Add New', 'Open', 'Resolve', 'Closed', 'Reopen Ticket', 'All'],
  'Analytics and Reporting': ['Vendor Reports', 'Customer Reports', 'Financial Reports', 'All'],
  'Finance and Accounting': ['Revenue', 'Payouts', 'Refunds', 'Transactions', 'All'],
  'Admin Management': ['View Admin', 'Create Admin', 'Update Admin', 'Delete Admin', 'All'],
  'Notification and Communication': ['Email Templates', 'Push Notifications', 'SMS Templates', 'All']
};

// Sample permission profiles data (same as in permission-roles page)
const initialPermissionProfiles: Permission[] = [
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
  // ... other profiles
];

// Component that uses useSearchParams wrapped in Suspense
function PermissionsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = searchParams.get('id');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: 'edit',
    permissions: Object.fromEntries(Object.keys(permissionCategories).map(category => [category, []]))
  });

  useEffect(() => {
    if (profileId) {
      // Find the profile to edit
      const profileToEdit = initialPermissionProfiles.find(p => p.id === parseInt(profileId));
      if (profileToEdit) {
        setFormData({
          name: profileToEdit.name,
          type: profileToEdit.type,
          permissions: { ...profileToEdit.permissions }
        });
      }
    }
  }, [profileId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (category: string, type: string): void => {
    setFormData(prev => {
      const updatedPermissions = { ...prev.permissions };
      const currentTypes = updatedPermissions[category] || [];

      if (type === 'All') {
        // If 'All' is selected, clear other selections and only keep 'All'
        updatedPermissions[category] = currentTypes.includes('All') ? [] : ['All'];
      } else {
        // Remove 'All' if it exists and toggle the selected type
        const withoutAll = currentTypes.filter(t => t !== 'All');
        if (withoutAll.includes(type)) {
          updatedPermissions[category] = withoutAll.filter(t => t !== type);
        } else {
          updatedPermissions[category] = [...withoutAll, type];
        }
      }

      return {
        ...prev,
        permissions: updatedPermissions
      };
    });
  };

  const handleCategoryHeaderChange = (category: string): void => {
    setFormData(prev => {
      const updatedPermissions = { ...prev.permissions };
      // If all types are selected, clear the selection; otherwise, select all types
      const allTypes = permissionCategories[category];
      const currentTypes = updatedPermissions[category] || [];
      
      updatedPermissions[category] = currentTypes.length === allTypes.length ? [] : [...allTypes];

      return {
        ...prev,
        permissions: updatedPermissions
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here you would typically save the permission profile
    console.log('Form submitted:', formData);
    router.push('/admin-management/permission-roles');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {profileId ? 'Edit Permission Profile' : 'Create New Permission Profile'}
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Define the access levels and permissions for this profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Permission Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Permission Type</label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="edit"
                    checked={formData.type === 'edit'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Edit Permission</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="view"
                    checked={formData.type === 'view'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">View Permission</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Permission Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissionCategories).map(([category, types]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={types.every(type => formData.permissions[category]?.includes(type))}
                    onChange={() => handleCategoryHeaderChange(category)}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-900">{category}</label>
                </div>
                <div className="mt-3 space-y-2 ml-6">
                  {types.map(type => (
                    <div key={type} className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.permissions[category]?.includes(type)}
                        onChange={() => handlePermissionChange(category, type)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label className="ml-2 block text-sm text-gray-700">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin-management/permission-roles')}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {profileId ? 'Update Permission' : 'Create Permission'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Main component with Suspense boundary
export default function CreatePermissions() {
  return (
    <Suspense fallback={<div className="p-4">Loading permissions...</div>}>
      <PermissionsForm />
    </Suspense>
  );
}