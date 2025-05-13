"use client";

import React, { useState } from 'react';
import { 
  PencilIcon, 
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Vendor } from '../types';

// Sample vendor data for approved vendors
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
    id: 5,
    name: 'David Manager',
    email: 'david@qualityproducts.com',
    phone: '+1 (555) 567-8901',
    onboardingDate: '2023-05-10',
    businessName: 'Quality Products',
    businessEmail: 'info@qualityproducts.com',
    businessPhone: '+1 (555) 432-1098',
    address: '567 Quality St, Product City, PC 67890',
    totalProducts: 110,
    status: 'approved',
    isBlocked: false
  }
];

export default function ApprovedVendors() {
  const [vendors] = useState<Vendor[]>(initialVendors);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/vendor-management"
            className="text-gray-400 hover:text-gray-500"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Approved Vendors</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all approved vendors in your system.</p>
          </div>
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
                          {/* Status Badge */}
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                            Approved
                          </span>

                          {/* View/Update Link */}
                          <Link
                            href={`/vendor-management/${vendor.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          </Link>
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