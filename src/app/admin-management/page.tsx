"use client";

import React, { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Define interfaces for type safety
interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  permissionRole: string;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  permissionRole: string;
}

// Sample admin data
const initialAdmins: Admin[] = [
  { 
    id: 1, 
    name: 'John Admin', 
    email: 'john@admin.com', 
    phone: '+1 (555) 123-4567',
    permissionRole: 'Super Admin',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Sarah Manager', 
    email: 'sarah@admin.com', 
    phone: '+1 (555) 234-5678',
    permissionRole: 'Vendor Manager',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Michael Support', 
    email: 'michael@admin.com', 
    phone: '+1 (555) 345-6789',
    permissionRole: 'Customer Support',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Emily Finance', 
    email: 'emily@admin.com', 
    phone: '+1 (555) 456-7890',
    permissionRole: 'Finance Manager',
    status: 'disabled'
  },
  { 
    id: 5, 
    name: 'David Analytics', 
    email: 'david@admin.com', 
    phone: '+1 (555) 567-8901',
    permissionRole: 'Analytics Manager',
    status: 'active'
  },
];

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
  const [admins, setAdmins] = useState(initialAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    permissionRole: ''
  });

  // Open modal for creating a new admin
  const openCreateModal = () => {
    setCurrentAdmin(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      permissionRole: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for updating an existing admin
  const openUpdateModal = (admin: Admin): void => {
    setCurrentAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      password: '',
      permissionRole: admin.permissionRole
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (currentAdmin) {
      // Update existing admin
      setAdmins(admins.map(admin => 
        admin.id === currentAdmin.id ? { ...admin, ...formData } : admin
      ));
    } else {
      // Create new admin
      const newAdmin = {
        id: admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1,
        ...formData,
        status: 'active'
      };
      setAdmins([...admins, newAdmin]);
    }
    
    closeModal();
  };

  // Toggle admin status (enable/disable)
  const toggleAdminStatus = (adminId: number): void => {
    setAdmins(admins.map(admin => 
      admin.id === adminId ? { 
        ...admin, 
        status: admin.status === 'active' ? 'disabled' : 'active' 
      } : admin
    ));
  };

  // Delete an admin
  const deleteAdmin = (adminId: number): void => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Admin Management</h1>
          <p className="mt-2 text-sm text-gray-700">Manage admin users and their permission roles.</p>
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
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permission Role</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {admin.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {admin.permissionRole}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${admin.status === 'active' ? 'bg-[#41AFFF]/20 text-[#41AFFF]' : 'bg-red-100 text-red-800'}`}>
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
                            onClick={() => toggleAdminStatus(admin.id)}
                            className={`${admin.status === 'disabled' ? 'text-[#41AFFF] hover:text-[#3a9ee6]' : 'text-red-600 hover:text-red-900'}`}
                          >
                            {admin.status === 'disabled' ? 'Enable' : 'Disable'}
                          </button>
                          
                          {/* Delete button */}
                          <button
                            onClick={() => deleteAdmin(admin.id)}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle z-50 relative">
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