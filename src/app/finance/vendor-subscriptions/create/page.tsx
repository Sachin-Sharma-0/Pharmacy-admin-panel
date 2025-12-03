"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

// Define the subscription plan interface
interface SubscriptionPlan {
  planType: string;
  planName: string;
  renewal: string;
  isAvailableForAllCountries: boolean;
  price: string;
  listingInVendorMarketplace: boolean;
  bookingsAllowedPerMonth: string;
  productListingsInEcommerce: string;
  profileCustomization: string;
  customerInsights: string;
  prioritySupport: string;
  promotionalBannerVisibility: string;
  featuredVendorInCategory: boolean;
  description: string;
}

export default function CreateSubscriptionPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Initialize form state
  const [formData, setFormData] = useState<SubscriptionPlan>({
    planType: '',
    planName: '',
    renewal: '',
    isAvailableForAllCountries: true,
    price: '',
    listingInVendorMarketplace: false,
    bookingsAllowedPerMonth: '',
    productListingsInEcommerce: '',
    profileCustomization: '',
    customerInsights: '',
    prioritySupport: '',
    promotionalBannerVisibility: '',
    featuredVendorInCategory: false,
    description: '',
  });

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write subscription description here...',
      }),
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, description: editor.getHTML() }));
    },
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Subscription plan created successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
        // Navigate back to subscription list
        router.push('/finance/vendor-subscriptions');
      }, 3000);
    }, 1500);
  };

  // Handle cancel
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/finance/vendor-subscriptions');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Create Subscription Plan</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Plan Type */}
            <div className="col-span-1">
              <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
                Plan Type *
              </label>
              <select
                id="planType"
                name="planType"
                value={formData.planType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Plan Type</option>
                <option value="Free">Free</option>
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            {/* Plan Name */}
            <div className="col-span-1">
              <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name *
              </label>
              <input
                type="text"
                id="planName"
                name="planName"
                value={formData.planName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter plan name"
              />
            </div>

            {/* Renewal (Valid For) */}
            <div className="col-span-1">
              <label htmlFor="renewal" className="block text-sm font-medium text-gray-700 mb-1">
                Renewal (Valid For) *
              </label>
              <select
                id="renewal"
                name="renewal"
                value={formData.renewal}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Renewal Period</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            {/* Available for all countries */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available for all countries
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="isAvailableForAllCountries"
                  name="isAvailableForAllCountries"
                  checked={formData.isAvailableForAllCountries}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailableForAllCountries" className="ml-2 block text-sm text-gray-700">
                  Yes
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

            {/* Listing in vendor marketplace */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing in vendor marketplace
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="listingInVendorMarketplace"
                  name="listingInVendorMarketplace"
                  checked={formData.listingInVendorMarketplace}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="listingInVendorMarketplace" className="ml-2 block text-sm text-gray-700">
                  Yes
                </label>
              </div>
            </div>

            {/* Bookings allowed per month */}
            <div className="col-span-1">
              <label htmlFor="bookingsAllowedPerMonth" className="block text-sm font-medium text-gray-700 mb-1">
                Bookings allowed per month *
              </label>
              <input
                type="number"
                id="bookingsAllowedPerMonth"
                name="bookingsAllowedPerMonth"
                value={formData.bookingsAllowedPerMonth}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of bookings"
              />
            </div>

            {/* Product Listings in Ecommerce */}
            <div className="col-span-1">
              <label htmlFor="productListingsInEcommerce" className="block text-sm font-medium text-gray-700 mb-1">
                Product Listings in Ecommerce *
              </label>
              <input
                type="number"
                id="productListingsInEcommerce"
                name="productListingsInEcommerce"
                value={formData.productListingsInEcommerce}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of product listings"
              />
            </div>

            {/* Profile Customization */}
            <div className="col-span-1">
              <label htmlFor="profileCustomization" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Customization *
              </label>
              <select
                id="profileCustomization"
                name="profileCustomization"
                value={formData.profileCustomization}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Profile Customization</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Enhanced">Enhanced</option>
                <option value="Full Customization">Full Customization</option>
              </select>
            </div>

            {/* Access to customer insights */}
            <div className="col-span-1">
              <label htmlFor="customerInsights" className="block text-sm font-medium text-gray-700 mb-1">
                Access to customer insights *
              </label>
              <select
                id="customerInsights"
                name="customerInsights"
                value={formData.customerInsights}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Customer Insights Level</option>
                <option value="Limited">Limited</option>
                <option value="Standard">Standard</option>
                <option value="Advanced">Advanced</option>
                <option value="Comprehensive">Comprehensive</option>
              </select>
            </div>

            {/* Priority customer support */}
            <div className="col-span-1">
              <label htmlFor="prioritySupport" className="block text-sm font-medium text-gray-700 mb-1">
                Priority customer support *
              </label>
              <select
                id="prioritySupport"
                name="prioritySupport"
                value={formData.prioritySupport}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Support Level</option>
                <option value="Standard">Standard</option>
                <option value="Priority">Priority</option>
                <option value="High Priority">High Priority</option>
                <option value="24/7">24/7</option>
              </select>
            </div>

            {/* Promotional Banner Visibility */}
            <div className="col-span-1">
              <label htmlFor="promotionalBannerVisibility" className="block text-sm font-medium text-gray-700 mb-1">
                Promotional Banner Visibility *
              </label>
              <select
                id="promotionalBannerVisibility"
                name="promotionalBannerVisibility"
                value={formData.promotionalBannerVisibility}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Banner Visibility</option>
                <option value="No">No</option>
                <option value="Monthly">Monthly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>

            {/* Featured Vendor in Category */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Vendor in Category
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="featuredVendorInCategory"
                  name="featuredVendorInCategory"
                  checked={formData.featuredVendorInCategory}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featuredVendorInCategory" className="ml-2 block text-sm text-gray-700">
                  Yes
                </label>
              </div>
            </div>
          </div>

          {/* Description with Tiptap Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              {/* Editor Toolbar */}
              <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-1 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-1 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-1 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={`p-1 rounded ${editor?.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" fill="currentColor" />
                  </svg>
                </button>
                <div className="border-r border-gray-300 mx-1 h-6"></div>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setParagraph().run()}
                  className={`p-1 rounded ${editor?.isActive('paragraph') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`p-1 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-1 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`p-1 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" fill="currentColor" />
                  </svg>
                </button>
                <div className="border-r border-gray-300 mx-1 h-6"></div>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`p-1 rounded ${editor?.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={`p-1 rounded ${editor?.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              
              {/* Editor Content */}
              <div className="p-4 min-h-[200px]">
                <EditorContent editor={editor} className="prose max-w-none min-h-[200px]" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center space-x-4">
              <Link
                href="/finance/vendor-subscriptions"
                className="px-5 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Back
              </Link>
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#41AFFF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center min-w-[120px] shadow-md"
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
                'Save'
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