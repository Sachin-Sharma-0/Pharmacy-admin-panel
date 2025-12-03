"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Define the fee structure interface
interface FeeStructure {
  feeType: 'Flat' | 'Percentage';
  feeValue: string;
}

interface PlatformFees {
  platformFee: FeeStructure;
  surchargeFee: FeeStructure;
}

// Initial hardcoded data
const initialFees: PlatformFees = {
  platformFee: {
    feeType: 'Percentage',
    feeValue: '5'
  },
  surchargeFee: {
    feeType: 'Flat',
    feeValue: '2.50'
  }
};

export default function PlatformFeesPage() {
  const router = useRouter();
  const [fees, setFees] = useState<PlatformFees>(initialFees);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (feeCategory: 'platformFee' | 'surchargeFee', field: 'feeType' | 'feeValue', value: string) => {
    setFees(prev => ({
      ...prev,
      [feeCategory]: {
        ...prev[feeCategory],
        [field]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Platform fees updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-6">
      {/* Header without back button */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Platform Fees</h1>
      </div>

      {/* Platform Fees Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Set Platform Fees</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Platform Fee */}
          <div className="mb-8">
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-base font-medium text-gray-700 mb-1">Platform Fee</h3>
                <p className="text-sm text-gray-500 mb-3">
                  This fee will be applied to the total billing amount when a user buys anything from this platform.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fee Type</label>
                  <select
                    value={fees.platformFee.feeType}
                    onChange={(e) => handleInputChange('platformFee', 'feeType', e.target.value as 'Flat' | 'Percentage')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Flat">Flat</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fee Value</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fees.platformFee.feeValue}
                      onChange={(e) => handleInputChange('platformFee', 'feeValue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={fees.platformFee.feeType === 'Flat' ? "Enter amount" : "Enter percentage"}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">
                        {fees.platformFee.feeType === 'Flat' ? '$' : '%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Surcharge Fee */}
          <div className="mb-8">
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-base font-medium text-gray-700 mb-1">Surcharge Fee</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Additional fee applied to specific payment methods or special services on the platform.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fee Type</label>
                  <select
                    value={fees.surchargeFee.feeType}
                    onChange={(e) => handleInputChange('surchargeFee', 'feeType', e.target.value as 'Flat' | 'Percentage')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Flat">Flat</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fee Value</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fees.surchargeFee.feeValue}
                      onChange={(e) => handleInputChange('surchargeFee', 'feeValue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={fees.surchargeFee.feeType === 'Flat' ? "Enter amount" : "Enter percentage"}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">
                        {fees.surchargeFee.feeType === 'Flat' ? '$' : '%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[#41AFFF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center min-w-[120px]"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
          
          {/* Save Message */}
          {saveMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
              {saveMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}