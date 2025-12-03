"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { API_BASE_URL, getAuthToken } from '@/utils/env';

// Sample data for coupons
const initialCoupons = [
  { 
    id: 1,
    supplier: { id: 'SUP001', name: 'MedLife Pharmaceuticals', email: 'contact@medlife.com' },
    coupon: { code: '5000', type: 'flat', value: 50 },
    validity: { from: '2023-10-01', till: '2023-12-31' },
    categories: ['Prescription Medicines', 'Over-the-Counter (OTC)'],
    products: 'ALL',
    status: 'approved'
  },
  { 
    id: 2,
    supplier: { id: 'SUP002', name: 'HealthCare Solutions', email: 'info@healthcaresolutions.com' },
    coupon: { code: '2500', type: 'percentage', value: 25 },
    validity: { from: '2023-11-15', till: '2024-01-15' },
    categories: ['Health Supplements'],
    products: 7,
    status: 'approved'
  },
  { 
    id: 3,
    supplier: { id: 'SUP003', name: 'Wellness Pharma', email: 'support@wellnesspharma.com' },
    coupon: { code: '1000', type: 'flat', value: 10 },
    validity: { from: '2023-12-01', till: '2024-02-28' },
    categories: ['Personal Care', 'Baby Care'],
    products: 12,
    status: 'disapproved'
  },
  { 
    id: 4,
    supplier: { id: 'SUP004', name: 'MediTech Supplies', email: 'sales@meditechsupplies.com' },
    coupon: { code: '1500', type: 'percentage', value: 15 },
    validity: { from: '2023-11-01', till: '2024-01-31' },
    categories: ['Medical Devices'],
    products: 5,
    status: 'approved'
  },
  { 
    id: 5,
    supplier: { id: 'SUP005', name: 'DiaCare Products', email: 'info@diacareproducts.com' },
    coupon: { code: '2000', type: 'flat', value: 20 },
    validity: { from: '2023-12-15', till: '2024-03-15' },
    categories: ['Diabetic Care'],
    products: 8,
    status: 'disapproved'
  },
  { 
    id: 6,
    supplier: { id: 'SUP001', name: 'MedLife Pharmaceuticals', email: 'contact@medlife.com' },
    coupon: { code: '3000', type: 'percentage', value: 30 },
    validity: { from: '2023-12-25', till: '2024-01-10' },
    categories: ['Ayurvedic'],
    products: 3,
    status: 'approved'
  },
];

// Categories from API (Get All Categories)

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: 0,
    supplier: { id: '', name: '', email: '' },
    coupon: { code: '', type: 'flat', value: 0 },
    validity: { from: '', till: '' },
    categories: [] as string[],
    products: '',
    status: 'approved'
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const token = getAuthToken();
        if (!token) throw new Error('Authentication token not found');
        const res = await fetch(`${API_BASE_URL}/api/products/categories`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success) {
          const cats = data.data?.categories || data.data || [];
          const names = cats.map((c: any) => c.category_name).filter(Boolean);
          setCategoryOptions(names);
        } else {
          throw new Error(data.message || 'Failed to fetch categories');
        }
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        setCategoriesError(err.message || 'An error occurred');
        setCategoryOptions([]);
      } finally {
        setIsCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setSelectedCategories(selectedValues);
    setFormData(prev => ({
      ...prev,
      categories: selectedValues
    }));
  };

  // Open modal for adding a new coupon
  const handleAddCoupon = () => {
    const newId = Math.max(...coupons.map(c => c.id)) + 1;
    setFormData({
      id: newId,
      supplier: { id: '', name: '', email: '' },
      coupon: { code: '', type: 'flat', value: 0 },
      validity: { from: '', till: '' },
      categories: [],
      products: '',
      status: 'approved'
    });
    setSelectedCategories([]);
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing coupon
  const handleEditCoupon = (coupon: any) => {
    setFormData(coupon);
    setSelectedCategories(coupon.categories);
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  // Open confirmation modal for deleting a coupon
  const handleDeleteClick = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsDeleteModalOpen(true);
  };

  // Delete the selected coupon
  const handleDeleteConfirm = () => {
    if (selectedCoupon) {
      setCoupons(prev => prev.filter(c => c.id !== selectedCoupon.id));
      setIsDeleteModalOpen(false);
      setSelectedCoupon(null);
    }
  };

  // Toggle coupon status
  const toggleCouponStatus = (id: number) => {
    setCoupons(prev => 
      prev.map(coupon => 
        coupon.id === id ? 
          { ...coupon, status: coupon.status === 'approved' ? 'disapproved' : 'approved' } : 
          coupon
      )
    );
  };

  // Save the coupon (add new or update existing)
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCoupon) {
      // Update existing coupon
      setCoupons(prev => 
        prev.map(coupon => 
          coupon.id === selectedCoupon.id ? formData : coupon
        )
      );
    } else {
      // Add new coupon
      setCoupons(prev => [...prev, formData]);
    }
    
    setIsModalOpen(false);
    setFormData({
      id: 0,
      supplier: { id: '', name: '', email: '' },
      coupon: { code: '', type: 'flat', value: 0 },
      validity: { from: '', till: '' },
      categories: [],
      products: '',
      status: 'approved'
    });
    setSelectedCategories([]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
        </div>
        
        {/* Add Coupon Button */}
        <button
          onClick={handleAddCoupon}
          className="flex items-center px-4 py-2 bg-[#41AFFF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Add Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coupon Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mapped Categories
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mapped Products
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
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{coupon.supplier.id}</div>
                    <div className="text-sm text-gray-900">{coupon.supplier.name}</div>
                    <div className="text-sm text-gray-500">{coupon.supplier.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Code: {coupon.coupon.code}</div>
                    <div className="text-sm text-gray-500">
                      Type: {coupon.coupon.type === 'flat' ? 'Flat' : 'Percentage'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Value: {coupon.coupon.type === 'flat' ? `$${coupon.coupon.value}` : `${coupon.coupon.value}%`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      From: {formatDate(coupon.validity.from)}
                    </div>
                    <div className="text-sm text-gray-900">
                      Till: {formatDate(coupon.validity.till)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {coupon.categories.map((category, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof coupon.products === 'number' ? coupon.products : coupon.products}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleCouponStatus(coupon.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
                    >
                      {coupon.status === 'approved' ? (
                        <CheckIcon className="h-6 w-6 text-green-600" />
                      ) : (
                        <XMarkIcon className="h-6 w-6 text-red-600" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCoupon(coupon)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(coupon)}
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

      {/* Add/Edit Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-white rounded-lg modal-content max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCoupon ? 'Edit Coupon' : 'Add New Coupon'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveCoupon} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Supplier Information */}
                <div className="md:col-span-2 mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Supplier Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="supplier.id" className="block text-sm font-medium text-gray-700">Supplier ID</label>
                      <input
                        type="text"
                        id="supplier.id"
                        name="supplier.id"
                        value={formData.supplier.id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="supplier.name" className="block text-sm font-medium text-gray-700">Supplier Name</label>
                      <input
                        type="text"
                        id="supplier.name"
                        name="supplier.name"
                        value={formData.supplier.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="supplier.email" className="block text-sm font-medium text-gray-700">Supplier Email</label>
                      <input
                        type="email"
                        id="supplier.email"
                        name="supplier.email"
                        value={formData.supplier.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Coupon Information */}
                <div className="md:col-span-2 mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Coupon Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="coupon.code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                      <input
                        type="text"
                        id="coupon.code"
                        name="coupon.code"
                        value={formData.coupon.code}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="coupon.type" className="block text-sm font-medium text-gray-700">Coupon Type</label>
                      <select
                        id="coupon.type"
                        name="coupon.type"
                        value={formData.coupon.type}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="flat">Flat</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="coupon.value" className="block text-sm font-medium text-gray-700">Coupon Value</label>
                      <input
                        type="number"
                        id="coupon.value"
                        name="coupon.value"
                        value={formData.coupon.value}
                        onChange={handleChange}
                        required
                        min="0"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Validity */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Validity Period</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="validity.from" className="block text-sm font-medium text-gray-700">From</label>
                      <input
                        type="date"
                        id="validity.from"
                        name="validity.from"
                        value={formData.validity.from}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="validity.till" className="block text-sm font-medium text-gray-700">Till</label>
                      <input
                        type="date"
                        id="validity.till"
                        name="validity.till"
                        value={formData.validity.till}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Categories and Products */}
                <div className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Mapped Categories</label>
                    <select
                      id="categories"
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
                      size={4}
                    >
                      {isCategoriesLoading && (<option>Loading categories...</option>)}
                      {!isCategoriesLoading && categoriesError && (<option>Error loading categories</option>)}
                      {!isCategoriesLoading && !categoriesError && categoryOptions.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple categories</p>
                  </div>
                  
                  <div>
                    <label htmlFor="products" className="block text-sm font-medium text-gray-700 mb-1">Mapped Products</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="products"
                        name="products"
                        value={formData.products}
                        onChange={handleChange}
                        placeholder="Number of products or 'ALL'"
                        className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Enter a number or 'ALL' for all products</p>
                  </div>
                </div>
                
                {/* Status */}
                <div className="md:col-span-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="mt-2 flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        id="status-approved"
                        name="status"
                        type="radio"
                        value="approved"
                        checked={formData.status === 'approved'}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="status-approved" className="ml-2 block text-sm text-gray-900">
                        Approved
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="status-disapproved"
                        name="status"
                        type="radio"
                        value="disapproved"
                        checked={formData.status === 'disapproved'}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="status-disapproved" className="ml-2 block text-sm text-gray-900">
                        Disapproved
                      </label>
                    </div>
                  </div>
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
                  {selectedCoupon ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCoupon && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-white rounded-lg modal-content max-w-md w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete the coupon with code <span className="font-semibold">{selectedCoupon.coupon.code}</span>? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
