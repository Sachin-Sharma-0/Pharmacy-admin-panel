'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

interface ContentPage {
  id: number;
  name: string;
  endpoint: string;
  enabled: boolean;
}

export default function ContentListPage() {
  // State for confirmation dialogs
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  
  // Sample data for CMS pages
  const [pages, setPages] = useState<ContentPage[]>([
    {
      id: 1,
      name: 'Privacy Policy',
      endpoint: '/privacy-policy',
      enabled: true,
    },
    {
      id: 2,
      name: 'Terms and Conditions',
      endpoint: '/terms-conditions',
      enabled: true,
    },
    {
      id: 3,
      name: 'About Us',
      endpoint: '/about-us',
      enabled: true,
    },
    {
      id: 4,
      name: 'FAQ',
      endpoint: '/faq',
      enabled: false,
    },
  ]);

  // Handle delete click - opens confirmation dialog
  const handleDeleteClick = (page: ContentPage) => {
    setSelectedPage(page);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedPage) {
      setPages(pages.filter(p => p.id !== selectedPage.id));
      setIsDeleteModalOpen(false);
    }
  };

  // Handle toggle click - opens confirmation dialog
  const handleToggleClick = (page: ContentPage) => {
    setSelectedPage(page);
    setIsToggleModalOpen(true);
  };

  // Handle toggle confirmation
  const handleToggleConfirm = () => {
    if (selectedPage) {
      setPages(pages.map(p => 
        p.id === selectedPage.id ? {...p, enabled: !p.enabled} : p
      ));
      setIsToggleModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Content Management</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#41AFFF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add New Page
        </button>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S. No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page Endpoint
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {page.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={page.enabled} 
                          onChange={() => handleToggleClick(page)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#41AFFF]"></div>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/cms${page.endpoint}`} className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(page)}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete the page "${selectedPage?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Toggle Status Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isToggleModalOpen}
        title="Confirm Status Change"
        message={`Are you sure you want to ${selectedPage?.enabled ? 'disable' : 'enable'} the page "${selectedPage?.name}"?`}
        confirmText="Confirm"
        cancelText="Cancel"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        onConfirm={handleToggleConfirm}
        onCancel={() => setIsToggleModalOpen(false)}
      />
    </div>
  );
}