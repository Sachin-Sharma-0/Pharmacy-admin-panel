'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PaperClipIcon } from '@heroicons/react/24/outline';

export default function AddTicketPage() {
  const [formData, setFormData] = useState({
    priority: '',
    userType: '',
    customer: '',
    title: '',
    description: '',
    status: 'New'
  });
  
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Form submitted:', formData);
    console.log('Files:', files);
    // Redirect to tickets list or show success message
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/customer-service" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          <ArrowLeftIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Tickets
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <Link
            href="/customer-service"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            All Tickets
          </Link>
          <Link
            href="/customer-service/open-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Open Tickets
          </Link>
          <Link
            href="/customer-service/closed-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Closed Tickets
          </Link>
          <Link
            href="/customer-service/resolved-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Resolved Tickets
          </Link>
          <Link
            href="/customer-service/reopen-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Reopened Tickets
          </Link>
          <button
            className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Add Ticket
          </button>
        </nav>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Ticket</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Create a new support ticket</p>
        </div>
        
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Priority */}
              <div className="sm:col-span-3">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* User Type */}
              <div className="sm:col-span-3">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>

              {/* Customer Selection */}
              <div className="sm:col-span-6">
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                  Select Customer
                </label>
                <select
                  id="customer"
                  name="customer"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
                  value={formData.customer}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Customer</option>
                  <option value="1">John Smith - john@example.com</option>
                  <option value="2">Emma Johnson - emma@example.com</option>
                  <option value="3">Michael Brown - michael@example.com</option>
                  <option value="4">Sophia Williams - sophia@example.com</option>
                  <option value="5">Robert Jones - robert@example.com</option>
                </select>
              </div>

              {/* Issue Title */}
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Issue Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-10 px-3"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Files
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
                
                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Attached Files</h4>
                    <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                      {files.map((file, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Issue Description */}
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Issue Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Status - Hidden field, always set to "New" */}
              <input type="hidden" name="status" value="New" />
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/customer-service"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}