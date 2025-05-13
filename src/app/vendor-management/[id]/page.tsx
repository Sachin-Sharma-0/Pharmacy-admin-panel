"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define interfaces for type safety
interface Document {
  govId: string[];
  addressProof: string[];
  taxCertification: string[];
  businessLicense: string[];
}

interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  onboardingDate: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  totalProducts: number;
  status: string;
  statusReason: string;
  statusComment: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  swiftCode: string;
  documents: Document;
  logo: string[];
  portfolio: string[];
  firstName: string;
  lastName: string;
  phoneCode: string;
}

// Sample vendor data (matching the structure from the list page)
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
    address: '123 Business Ave',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    pincode: '94105',
    totalProducts: 45,
    status: 'approved',
    statusReason: '',
    statusComment: '',
    bankName: 'Chase Bank',
    accountHolderName: 'John Vendor',
    accountNumber: '1234567890',
    ifscCode: 'CHASE1234',
    swiftCode: 'CHASUS33',
    documents: {
      govId: ['id_doc_1.pdf'],
      addressProof: ['address_doc_1.pdf'],
      taxCertification: ['tax_doc_1.pdf'],
      businessLicense: ['license_doc_1.pdf']
    },
    logo: ['logo.png'],
    portfolio: ['portfolio1.jpg', 'portfolio2.jpg'],
    firstName: 'John',
    lastName: 'Vendor',
    phoneCode: '+1'
  }
];

// Status options
const statusOptions = [
  { value: 'approved', label: 'Approved' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'suspended', label: 'Suspended' }
];

// Status reason options
const statusReasons: Record<string, string[]> = {
  on_hold: [
    'Incomplete documentation',
    'Verification pending',
    'Additional information needed',
    'Document error'
  ],
  suspended: [
    'Policy violation',
    'Quality concerns',
    'Customer complaints',
    'Payment issues'
  ]
};

// Country options (sample)
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];

// State options (sample)
const states = ['California', 'New York', 'Texas', 'Florida'];

// City options (sample)
const cities = ['San Francisco', 'Los Angeles', 'San Diego', 'Sacramento'];

// Phone codes (sample)
const phoneCodes = [
  { code: '+1', label: 'USA (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+91', label: 'India (+91)' }
];

export default function VendorDetail() {
  const params = useParams();
  const vendorId = parseInt(params.id as string);
  
  const [formData, setFormData] = useState(initialVendors[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // In a real application, fetch vendor data based on ID
    const vendor = initialVendors.find(v => v.id === vendorId);
    if (vendor) {
      setFormData(vendor);
    }
  }, [vendorId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically save the updated vendor data
    console.log('Updated vendor data:', formData);
    
    // In a real application, you would make an API call here
    // For now, we'll simulate a successful save
    setSaveSuccess(true);
    
    // Reset the success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
    
    setEditMode(false);
  };

  const needsReason = formData.status === 'on_hold' || formData.status === 'suspended';

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
          <h1 className="text-xl font-semibold text-gray-900">Vendor Details</h1>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {editMode ? (
            <>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
              >
                Cancel
              </button>
              <button
                form="vendor-form"
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
      
      {saveSuccess && (
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Vendor details updated successfully!</p>
            </div>
          </div>
        </div>
      )}

      <form id="vendor-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Status Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {needsReason && (
              <>
                <div>
                  <label htmlFor="statusReason" className="block text-sm font-medium text-gray-700">
                    Status Reason
                  </label>
                  <select
                    id="statusReason"
                    name="statusReason"
                    value={formData.statusReason}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="">Select a reason</option>
                    {statusReasons[formData.status]?.map(reason => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="statusComment" className="block text-sm font-medium text-gray-700">
                    Status Comment
                  </label>
                  <textarea
                    id="statusComment"
                    name="statusComment"
                    rows={3}
                    value={formData.statusComment}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm overflow-auto"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Authorized Representative Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Authorized Representative</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-ellipsis overflow-hidden"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email (Login ID)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder={editMode ? 'Enter new password' : '••••••••'}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phoneCode" className="block text-sm font-medium text-gray-700">
                Phone Code
              </label>
              <select
                id="phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {phoneCodes.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Business Address Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Business Address</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State/Region
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolderName"
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifscCode"
                id="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="swiftCode" className="block text-sm font-medium text-gray-700">
                Swift Code
              </label>
              <input
                type="text"
                name="swiftCode"
                id="swiftCode"
                value={formData.swiftCode}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Documents</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Government Issued ID
              </label>
              <div className="mt-1 flex items-center">
                {formData.documents.govId.map((doc, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{doc}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Proof of Address
              </label>
              <div className="mt-1 flex items-center">
                {formData.documents.addressProof.map((doc, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{doc}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tax Certification
              </label>
              <div className="mt-1 flex items-center">
                {formData.documents.taxCertification.map((doc, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{doc}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business License
              </label>
              <div className="mt-1 flex items-center">
                {formData.documents.businessLicense.map((doc, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{doc}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Portfolio Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Logo and Portfolio</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center">
                {formData.logo.map((img, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{img}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Portfolio
              </label>
              <div className="mt-1 flex items-center">
                {formData.portfolio.map((img, index) => (
                  <span key={index} className="mr-2 text-sm text-gray-500">{img}</span>
                ))}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}