"use client";

import React, { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  TrashIcon,
  NoSymbolIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Admin, FormData, PermissionRole } from './types';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { API_BASE_URL, getAuthToken } from '@/utils/env';

// Sample permission roles for dropdown
const permissionRoles: PermissionRole[] = [
  { id: 1, name: 'Super Admin' },
  { id: 2, name: 'Vendor Manager' },
  { id: 3, name: 'Customer Support' },
  { id: 4, name: 'Finance Manager' },
  { id: 5, name: 'Analytics Manager' },
  { id: 6, name: 'Content Manager' },
  { id: 7, name: 'Limited Access' },
];

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Confirmation dialog states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    role_name: ''
  });
  
  // Fetch all admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);
  
  // Function to fetch all admins
  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/admin/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAdmins(data.data.admins.map((admin: any) => ({
          admin_id: admin.admin_id,
          full_name: admin.full_name,
          email: admin.email,
          phone_number: admin.phone_number,
          role: admin.role || '', // Ensure role is always a string
          status: admin.status || 'active', // Default to active if status is not provided
          created_at: admin.created_at
        })));
      } else {
        throw new Error(data.message || 'Failed to fetch admins');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching admins');
      console.error('Error fetching admins:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal for creating a new admin
  const openCreateModal = () => {
    setCurrentAdmin(null);
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      password: '',
      role_name: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for updating an existing admin
  const openUpdateModal = (admin: Admin): void => {
    setCurrentAdmin(admin);
    setFormData({
      full_name: admin.full_name,
      email: admin.email,
      phone_number: admin.phone_number,
      password: '',
      role_name: admin.role
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      if (currentAdmin && currentAdmin.admin_id) {
        // Update existing admin - only send fields that need to be updated
        const updatePayload: any = {
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          role: formData.role_name // Map role_name to role
        };
        
        // Only include password if it's provided (for updates)
        if (formData.password && formData.password.trim() !== '') {
          updatePayload.password = formData.password;
        }
        
        // Use admin_id from currentAdmin for the API call
        const response = await fetch(`${API_BASE_URL}/api/admin/${currentAdmin.admin_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePayload)
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Refresh admin list
          await fetchAdmins();
          setIsModalOpen(false);
        } else {
          throw new Error(data.message || 'Failed to update admin');
        }
      } else {
        // Create new admin - API endpoint not provided in the requirements
        // For now, we'll show a warning
        console.warn('Create admin endpoint not specified in API documentation');
        setIsModalOpen(false);
      }
    } catch (err: any) {
      console.error('Error updating admin:', err);
      setError(err.message || 'An error occurred');
      alert(err.message || 'An error occurred');
    }
  };

  // Handle toggle admin status click
  const handleToggleClick = (adminId: string, newStatusValue: string): void => {
    setSelectedAdminId(adminId);
    setNewStatus(newStatusValue);
    setIsToggleModalOpen(true);
  };

  // Handle toggle admin status confirmation
  const handleToggleConfirm = async (): Promise<void> => {
    if (!selectedAdminId) return;
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      // Determine the status value (API might expect 'active'/'disabled' or similar)
      const statusValue = newStatus === 'active' ? 'active' : 'disabled';
      
      const response = await fetch(`${API_BASE_URL}/api/admin/${selectedAdminId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: statusValue })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh admin list to get updated data
        await fetchAdmins();
      } else {
        throw new Error(data.message || 'Failed to update admin status');
      }
    } catch (err: any) {
      console.error('Error updating admin status:', err);
      setError(err.message || 'An error occurred while updating status');
      alert(err.message || 'An error occurred');
    } finally {
      setIsToggleModalOpen(false);
      setSelectedAdminId(null);
      setNewStatus('');
    }
  };

  // Handle delete admin click
  const handleDeleteClick = (adminId: string): void => {
    setSelectedAdminId(adminId);
    setIsDeleteModalOpen(true);
  };

  // Handle delete admin confirmation
  const handleDeleteConfirm = async (): Promise<void> => {
    if (!selectedAdminId) return;
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/admin/${selectedAdminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh admin list to reflect deletion
        await fetchAdmins();
      } else {
        throw new Error(data.message || 'Failed to delete admin');
      }
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      setError(err.message || 'An error occurred while deleting admin');
      alert(err.message || 'An error occurred');
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedAdminId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manage Admins</h1>
          <p className="mt-2 text-sm text-gray-500">A list of all admin users in your system.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
            Add Admin
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">S. No.</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permission Role</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                          <span className="ml-2 text-gray-500">Loading admins...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-gray-500">
                        No admins found
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin, index) => (
                      <tr key={admin.admin_id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {admin.full_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {admin.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {admin.phone_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {admin.role || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${admin.status === 'active' ? 'bg-[#41AFFF]/20 text-[#41AFFF]' : 'bg-red-100 text-red-800'}`}
                          >
                            {admin.status === 'active' ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => openUpdateModal(admin)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleToggleClick(admin.admin_id, admin.status === 'active' ? 'disabled' : 'active')}
                            className={`${admin.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          >
                            <NoSymbolIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(admin.admin_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 modal-backdrop transition-opacity" aria-hidden="true" />

            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left modal-content transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle z-50">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {currentAdmin ? 'Edit Admin' : 'Add New Admin'}
                  </h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>

                      {!currentAdmin ? (
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            required
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password {currentAdmin && '(Leave blank to keep current password)'}
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Enter new password (optional)"
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="role_name" className="block text-sm font-medium text-gray-700">
                          Permission Role
                        </label>
                        <select
                          name="role_name"
                          id="role_name"
                          value={formData.role_name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        >
                          <option value="">Select a role</option>
                          {permissionRoles.map((role) => (
                            <option key={role.id} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {currentAdmin ? 'Update' : 'Create'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      {isDeleteModalOpen && (
        <ConfirmationDialog
          title="Delete Admin"
          message="Are you sure you want to delete this admin? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      
      {/* Toggle Status Confirmation Dialog */}
      {isToggleModalOpen && (
        <ConfirmationDialog
          title={`${newStatus === 'active' ? 'Enable' : 'Disable'} Admin`}
          message={`Are you sure you want to ${newStatus === 'active' ? 'enable' : 'disable'} this admin?`}
          confirmLabel={newStatus === 'active' ? 'Enable' : 'Disable'}
          cancelLabel="Cancel"
          onConfirm={handleToggleConfirm}
          onCancel={() => setIsToggleModalOpen(false)}
        />
      )}
    </div>
  );
}