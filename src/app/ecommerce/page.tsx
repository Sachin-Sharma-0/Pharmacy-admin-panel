"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EcommercePage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">E-commerce Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => router.push('/ecommerce/categories')}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600">Manage product categories for your pharmacy</p>
          <div className="mt-4 flex justify-end">
            <span className="text-blue-600 font-medium">View Categories →</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => router.push('/ecommerce/coupons')}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Coupons</h2>
            <div className="p-2 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600">Manage discount coupons and promotional offers</p>
          <div className="mt-4 flex justify-end">
            <span className="text-green-600 font-medium">View Coupons →</span>
          </div>
        </div>
      </div>
    </div>
  );
}