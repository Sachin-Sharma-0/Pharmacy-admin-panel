"use client";

import React, { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  NoSymbolIcon,
  ArrowLeftIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Vendor, StatusOption } from './types';

// Sample vendor data
const initialVendors: Vendor[] = [
  { 
    id: 1,
    name: 'John Vendor',
    email: 'john@vendor.com',
    phone: '+1 (555) 123-4567',
    onboardingDate: '2023-01-15',
    businessName: 'Tech Solutions Inc',
    businessEmail: 'info@techsolutions.com',
    businessPhone: '+1 (555) 987-6543',
    address: '123 Business Ave, Tech City, TC 12345',
    totalProducts: 45,
    status: 'approved',
    isBlocked: false
  },
  { 
    id: 2,
    name: 'Sarah Merchant',
    email: 'sarah@merchant.com',
    phone: '+1 (555) 234-5678',
    onboardingDate: '2023-02-20',
    businessName: 'Fashion Forward',
    businessEmail: 'contact@fashionforward.com',
    businessPhone: '+1 (555) 876-5432',
    address: '456 Style St, Fashion District, FD 67890',
    totalProducts: 120,
    status: 'on_hold',
    isBlocked: false
  },
  { 
    id: 3,
    name: 'Mike Seller',
    email: 'mike@seller.com',
    phone: '+1 (555) 345-6789',
    onboardingDate: '2023-03-10',
    businessName: 'Electronics Hub',
    businessEmail: 'sales@electronicshub.com',
    businessPhone: '+1 (555) 765-4321',
    address: '789 Circuit Lane, Tech Park, TP 34567',
    totalProducts: 75,
    status: 'suspended',
    isBlocked: true
  }
];

// Status options
const statusOptions: StatusOption[] = [
  { value: 'approved', label: 'Approved' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'suspended', label: 'Suspended' }
];

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<number | null>(null);
  
  // Add click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownOpen !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest('.status-dropdown-container')) {
          setStatusDropdownOpen(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [statusDropdownOpen]);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Toggle vendor blocked status
  const toggleBlockStatus = (vendorId: number): void => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, isBlocked: !vendor.isBlocked } : vendor
    ));
  };

  // Update vendor status
  const updateVendorStatus = (vendorId: number, newStatus: 'approved' | 'on_hold' | 'suspended'): void => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    ));
    setStatusDropdownOpen(null);
  };

  // Get status color class
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Vendor Management</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all vendors in your system.</p>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vendor Info</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Business Info</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Products</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {vendor.id}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900 truncate max-w-[200px]">{vendor.name}</div>
                          <div className="truncate max-w-[200px]">{vendor.email}</div>
                          <div className="truncate max-w-[200px]">{vendor.phone}</div>
                          <div className="text-gray-400 truncate max-w-[200px]">
                            Joined {formatDate(vendor.onboardingDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900 truncate max-w-[200px]">{vendor.businessName}</div>
                          <div className="truncate max-w-[200px]">{vendor.businessEmail}</div>
                          <div className="truncate max-w-[200px]">{vendor.businessPhone}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="max-w-[200px] truncate">{vendor.address}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vendor.totalProducts}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          {/* Status Dropdown */}
                          <div className="relative status-dropdown-container">
                            <button
                              onClick={() => setStatusDropdownOpen(statusDropdownOpen === vendor.id ? null : vendor.id)}
                              className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${getStatusColorClass(vendor.status)}`}
                            >
                              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1).replace('_', ' ')}
                              <ChevronDownIcon className="ml-1 h-4 w-4" />
                            </button>
                            {statusDropdownOpen === vendor.id && (
                              <div className="fixed z-50 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5" style={{maxHeight: '200px', overflow: 'auto'}}>
                                <div className="py-1" role="menu">
                                  {statusOptions.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => updateVendorStatus(vendor.id, option.value)}
                                      className={`block w-full px-4 py-2 text-left text-sm ${option.value === vendor.status ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                      role="menuitem"
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* View/Update Link */}
                          <Link
                            href={`/vendor-management/${vendor.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          </Link>

                          {/* Block/Unblock Button */}
                          <button
                            onClick={() => toggleBlockStatus(vendor.id)}
                            className={`${vendor.isBlocked ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          >
                            <NoSymbolIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
}