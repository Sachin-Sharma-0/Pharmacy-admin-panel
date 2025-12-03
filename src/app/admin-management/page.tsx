"use client";

import React, { useState, useEffect } from 'react';
import TableSkeleton from '@/components/ui/TableSkeleton';
import { 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { API_BASE_URL, getAuthToken } from '@/utils/env';

// Define interfaces for type safety
interface Admin {
  admin_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  created_at: string;
  status?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  permissionRole: string;
}



// Sample permission roles for dropdown
const permissionRoles = [
  { id: 1, name: 'Super Admin' },
  { id: 2, name: 'Vendor Manager' },
  { id: 3, name: 'Customer Support' },
  { id: 4, name: 'Finance Manager' },
  { id: 5, name: 'Analytics Manager' },
  { id: 6, name: 'Content Manager' },
  { id: 7, name: 'Limited Access' },
];

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    permissionRole: ''
  });
  
  // Fetch admins from API
  useEffect(() => {
    fetchAdmins();
  }, []);
  
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
        const rawAdmins = data.data.admins || [];
        const hiddenEmails = new Set(['devteam@oraglan.com', 'sachin200215.ssb@gmail.com']);
        const filtered = rawAdmins.filter((a: Admin) => !hiddenEmails.has(a.email));
        setAdmins(filtered);
      } else {
        throw new Error(data.message || 'Failed to fetch admins');
      }
    } catch (err: any) {
      console.error('Error fetching admins:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal for creating a new admin
  const openCreateModal = () => {
    setCurrentAdmin(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      permissionRole: 'Super Admin'
    });
    setIsModalOpen(true);
  };

  // Open modal for updating an existing admin
  const openUpdateModal = (admin: Admin): void => {
    setCurrentAdmin(admin);
    setFormData({
      name: admin.full_name,
      email: admin.email,
      phone: admin.phone_number,
      password: '',
      permissionRole: admin.role || 'Super Admin'
    });
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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

      if (currentAdmin) {
        // Update existing admin
        const response = await fetch(`${API_BASE_URL}/api/admin/${currentAdmin.admin_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            role: formData.permissionRole,
            ...(formData.password && { password: formData.password })
          })
        });

        const data = await response.json();
        if (data.success) {
          await fetchAdmins(); // Refresh the list
          closeModal();
        } else {
          throw new Error(data.message || 'Failed to update admin');
        }
      } else {
        // Create new admin - Note: This endpoint might not exist in API, using placeholder
        // You may need to implement a POST /api/admin/ endpoint
        console.warn('Create admin endpoint not specified in API documentation');
        closeModal();
      }
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred');
    }
  };

  // Toggle admin status (enable/disable)
  const toggleAdminStatus = (adminId: string): void => {
    setAdmins(admins.map(admin => 
      admin.admin_id === adminId ? { 
        ...admin, 
        status: admin.status === 'active' ? 'disabled' : 'active' 
      } : admin
    ));
  };

  // Delete an admin
  const deleteAdmin = async (adminId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        await fetchAdmins(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to delete admin');
      }
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      setError(err.message || 'An error occurred while deleting admin');
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Management</h1>
          <p className="mt-2 text-sm text-gray-500">Manage admin users and their permission roles.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#41AFFF] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#3a9ee6] focus:outline-none focus:ring-2 focus:ring-[#41AFFF] focus:ring-offset-2 sm:w-auto"
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
            <div className="overflow-visible shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">S. No.</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permission Role</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <TableSkeleton rows={6} cols={7} />
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-red-500">{error}</td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">No admins found</td>
                    </tr>
                  ) : admins.map((admin, index) => (
                    <tr key={admin.admin_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.full_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.phone_number}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.role}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          admin.status === 'active' ? 'bg-[#41AFFF]/20 text-[#41AFFF]' : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status === 'active' ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          {/* Update button */}
                          <button
                            onClick={() => openUpdateModal(admin)}
                            className="text-[#41AFFF] hover:text-[#3a9ee6]"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {/* Enable/Disable button */}
                          <button
                            onClick={() => toggleAdminStatus(admin.admin_id)}
                            className={`${admin.status === 'disabled' ? 'text-[#41AFFF] hover:text-[#3a9ee6]' : 'text-red-600 hover:text-red-900'}`}
                          >
                            {admin.status === 'disabled' ? 'Enable' : 'Disable'}
                          </button>
                          
                          {/* Delete button */}
                          <button
                            onClick={() => deleteAdmin(admin.admin_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 modal-backdrop transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom modal-content transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle z-50 relative">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {currentAdmin ? 'Edit Admin' : 'Add New Admin'}
                      </h3>
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm py-2"
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
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm py-2"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm py-2"
                        />
                      </div>
                      
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
                          required={!currentAdmin}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm py-2"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="permissionRole" className="block text-sm font-medium text-gray-700">
                          Permission Role
                        </label>
                        <select
                          name="permissionRole"
                          id="permissionRole"
                          value={formData.permissionRole}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#41AFFF] focus:ring-[#41AFFF] sm:text-sm py-2"
                        >
                          <option value="">Select a role</option>
                          {permissionRoles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#41AFFF] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3a9ee6] focus:outline-none focus:ring-2 focus:ring-[#41AFFF] focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {currentAdmin ? 'Update' : 'Create'}
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#41AFFF] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
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
    </div>
  );
}
