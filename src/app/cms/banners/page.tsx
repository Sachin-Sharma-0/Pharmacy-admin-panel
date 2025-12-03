'use client';

import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

// Define Banner interface
interface Banner {
  id: number;
  image: string;
  name: string;
  description: string;
  addedOn: string;
  sort: number;
  status: 'active' | 'inactive';
  link: string;
}

// Sample banner data
const initialBanners: Banner[] = [
  {
    id: 1,
    image: '/sample-banner-1.jpg',
    name: 'Summer Sale',
    description: 'Special discounts on all summer products',
    addedOn: '2023-06-15',
    sort: 1,
    status: 'active',
    link: '/products/summer-collection'
  },
  {
    id: 2,
    image: '/sample-banner-2.jpg',
    name: 'New Arrivals',
    description: 'Check out our latest products',
    addedOn: '2023-07-01',
    sort: 2,
    status: 'active',
    link: '/categories/new-arrivals'
  },
  {
    id: 3,
    image: '/sample-banner-3.jpg',
    name: 'Flash Sale',
    description: '24-hour sale on selected items',
    addedOn: '2023-07-10',
    sort: 3,
    status: 'inactive',
    link: '/products/flash-sale'
  },
];

export default function BannersPage() {
  // State for banners and modal
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  
  // State for confirmation dialogs
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<'active' | 'inactive'>('active');
  
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    link: '',
    sort: 0,
    status: 'active'
  });

  // Open modal for creating a new banner
  const openCreateModal = () => {
    setCurrentBanner(null);
    setFormData({
      image: '',
      name: '',
      description: '',
      link: '',
      sort: banners.length + 1,
      status: 'active'
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing banner
  const openEditModal = (banner: Banner) => {
    setCurrentBanner(banner);
    setFormData({
      image: banner.image,
      name: banner.name,
      description: banner.description,
      link: banner.link,
      sort: banner.sort,
      status: banner.status
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        status: checked ? 'active' : 'inactive'
      });
    } else if (name === 'sort') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentBanner) {
      // Update existing banner
      setBanners(banners.map(banner => 
        banner.id === currentBanner.id ? {
          ...banner,
          image: formData.image,
          name: formData.name,
          description: formData.description,
          link: formData.link,
          sort: formData.sort,
          status: formData.status as 'active' | 'inactive'
        } : banner
      ));
    } else {
      // Create new banner
      const newBanner: Banner = {
        id: banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1,
        image: formData.image,
        name: formData.name,
        description: formData.description,
        link: formData.link,
        sort: formData.sort,
        status: formData.status as 'active' | 'inactive',
        addedOn: new Date().toISOString().split('T')[0]
      };
      setBanners([...banners, newBanner]);
    }
    
    setIsModalOpen(false);
  };

  // Handle banner deletion - opens confirmation dialog
  const handleDelete = (id: number) => {
    setSelectedBannerId(id);
    setIsDeleteModalOpen(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedBannerId !== null) {
      setBanners(banners.filter(banner => banner.id !== selectedBannerId));
      setIsDeleteModalOpen(false);
    }
  };

  // Toggle banner status - opens confirmation dialog
  const toggleBannerStatus = (id: number) => {
    const banner = banners.find(b => b.id === id);
    if (banner) {
      setSelectedBannerId(id);
      setNewStatus(banner.status === 'active' ? 'inactive' : 'active');
      setIsToggleModalOpen(true);
    }
  };
  
  // Handle toggle confirmation
  const handleToggleConfirm = () => {
    if (selectedBannerId !== null) {
      setBanners(banners.map(banner => 
        banner.id === selectedBannerId ? {
          ...banner,
          status: newStatus
        } : banner
      ));
      setIsToggleModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Banner Management</h1>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#41AFFF] hover:bg-[#2b9fe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF]"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Banner
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
                  Banner Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banner Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sort
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
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-20 w-40 bg-gray-200 rounded overflow-hidden">
                      {/* Placeholder for image - in a real app, use next/image */}
                      <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
                        Banner Image Preview
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{banner.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{banner.description}</div>
                    <div className="text-xs text-gray-400 mt-1">Added on: {banner.addedOn}</div>
                    <div className="text-xs text-gray-400 mt-1">Link: {banner.link}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.sort}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={banner.status === 'active'} 
                          onChange={() => toggleBannerStatus(banner.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                      <span className="ml-2 text-sm text-gray-500">
                        {banner.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(banner)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => handleDelete(banner.id)}
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

      {/* Modal for adding/editing banners */}
      {isModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 bg-gray-800 bg-opacity-80 transition-opacity">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative">
              {/* Close button at the top right */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-4">
                      {currentBanner ? 'Edit Banner' : 'Add New Banner'}
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Banner Image</label>
                            <div className="mt-2 flex items-center">
                              <div className="flex-shrink-0 h-24 w-48 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                {formData.image ? (
                                  <img
                                    src={formData.image}
                                    alt="Banner preview"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <span className="text-sm">No image</span>
                                  </div>
                                )}
                              </div>
                              <label htmlFor="file-upload" className="ml-5 cursor-pointer bg-white py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors duration-200">
                                <span>Upload Image</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setFormData({
                                          ...formData,
                                          image: event.target?.result as string
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Banner Title</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Banner title"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Banner Link</label>
                            <input
                              type="text"
                              name="link"
                              id="link"
                              placeholder="e.g., /categories/summer-sale"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData.link}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Banner Description</label>
                            <textarea
                              name="description"
                              id="description"
                              rows={3}
                              placeholder="Brief description of the banner"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData.description}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Banner Sort</label>
                            <input
                              type="number"
                              name="sort"
                              id="sort"
                              min="1"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData.sort}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex h-5 items-center">
                              <input
                                type="checkbox"
                                name="status"
                                id="status"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                checked={formData.status === 'active'}
                                onChange={handleChange}
                              />
                              <label htmlFor="status" className="ml-3 block text-sm font-medium text-gray-700">
                                Banner Active
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2.5 bg-[#41AFFF] text-base font-medium text-white hover:bg-[#2b9fe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF] sm:ml-4 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Save Banner
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-5 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete this banner? This action cannot be undone.`}
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
        message={`Are you sure you want to change this banner's status to ${newStatus}?`}
        confirmText="Confirm"
        cancelText="Cancel"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        onConfirm={handleToggleConfirm}
        onCancel={() => setIsToggleModalOpen(false)}
      />
    </div>
  );
}