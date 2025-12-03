"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import { API_BASE_URL } from '@/utils/env';

// Sample data for categories
const initialCategories = [
  { 
    id: 'CAT001', 
    name: 'Prescription Medicines', 
    description: 'Medications that require a valid prescription from a licensed healthcare provider.',
    isActive: true 
  },
  { 
    id: 'CAT002', 
    name: 'Over-the-Counter (OTC)', 
    description: 'Medications that can be purchased without a prescription.',
    isActive: true 
  },
  { 
    id: 'CAT003', 
    name: 'Health Supplements', 
    description: 'Vitamins, minerals, and other dietary supplements to support health.',
    isActive: true 
  },
  { 
    id: 'CAT004', 
    name: 'Personal Care', 
    description: 'Products for personal hygiene and skincare.',
    isActive: false 
  },
  { 
    id: 'CAT005', 
    name: 'Medical Devices', 
    description: 'Equipment and devices used for medical purposes.',
    isActive: true 
  },
  { 
    id: 'CAT006', 
    name: 'Baby Care', 
    description: 'Products specifically designed for infants and toddlers.',
    isActive: true 
  },
  { 
    id: 'CAT007', 
    name: 'Diabetic Care', 
    description: 'Products for managing diabetes and related conditions.',
    isActive: true 
  },
  { 
    id: 'CAT008', 
    name: 'Ayurvedic', 
    description: 'Traditional Indian herbal medicines and supplements.',
    isActive: false 
  },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    isActive: true
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/categories`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.success) {
          const list = (data.data?.categories || data.data || []).map((c: any) => ({
            id: c.category_id || c.id || '',
            name: c.category_name || c.name || '',
            description: c.category_description || c.description || '',
            isActive: true
          }));
          setCategories(list);
        }
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    };
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Open modal for adding a new category
  const handleAddCategory = () => {
    setFormData({
      id: `CAT${String(categories.length + 1).padStart(3, '0')}`,
      name: '',
      description: '',
      isActive: true
    });
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing category
  const handleEditCategory = (category: any) => {
    setFormData(category);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Open confirmation modal for deleting a category
  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Delete the selected category
  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  // Handle toggle click - open confirmation dialog
  const handleToggleClick = (category: any) => {
    setSelectedCategory(category);
    setIsToggleModalOpen(true);
  };

  // Toggle category active status after confirmation
  const handleToggleConfirm = () => {
    if (selectedCategory) {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategory.id ? { ...cat, isActive: !cat.isActive } : cat
        )
      );
      setIsToggleModalOpen(false);
    }
  };

  // Save the category (add new or update existing)
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCategory) {
      // Update existing category
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategory.id ? formData : cat
        )
      );
    } else {
      // Add new category
      setCategories(prev => [...prev, formData]);
    }
    
    setIsModalOpen(false);
    setFormData({
      id: '',
      name: '',
      description: '',
      isActive: true
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        </div>
        
        {/* Add Category Button */}
        <button
          onClick={handleAddCategory}
          className="flex items-center px-4 py-2 bg-[#41AFFF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S. No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleToggleClick(category)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {category.isActive ? (
                        <>
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-white rounded-lg modal-content max-w-md w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveCategory} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700">Category ID</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active</label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#41AFFF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedCategory ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message={
          <p>
            Are you sure you want to delete the category <span className="font-semibold">{selectedCategory?.name}</span>? This action cannot be undone.
          </p>
        }
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Toggle Status Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isToggleModalOpen}
        title={`Confirm Status Change`}
        message={
          <p>
            Are you sure you want to change the status of <span className="font-semibold">{selectedCategory?.name}</span> from <span className="font-semibold">{selectedCategory?.isActive ? 'Active' : 'Inactive'}</span> to <span className="font-semibold">{selectedCategory?.isActive ? 'Inactive' : 'Active'}</span>?
          </p>
        }
        confirmText="Change Status"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        onConfirm={handleToggleConfirm}
        onCancel={() => setIsToggleModalOpen(false)}
      />
    </div>
  );
}
