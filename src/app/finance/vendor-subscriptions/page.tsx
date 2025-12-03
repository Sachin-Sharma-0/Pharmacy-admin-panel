"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

// Define the subscription plan interface
interface SubscriptionPlan {
  id: number;
  planType: 'Free' | 'Economy' | 'Premium' | 'Gold' | 'Platinum';
  planName: string;
  createdOn: string;
  renewal: 'Monthly' | 'Quarterly' | 'Yearly';
  isAvailableForAllCountries: boolean;
  price: number;
  listingInVendorMarketplace: boolean;
  bookingsAllowedPerMonth: number;
  productListingsInEcommerce: number;
  profileCustomization: 'Basic' | 'Standard' | 'Enhanced' | 'Full Customization';
  customerInsights: 'Limited' | 'Standard' | 'Advanced' | 'Comprehensive';
  prioritySupport: 'Standard' | 'Priority' | 'High Priority' | '24/7';
  promotionalBannerVisibility: 'No' | 'Monthly' | 'Bi-weekly' | 'Weekly';
  featuredVendorInCategory: boolean;
  description: string;
  status: 'active' | 'inactive';
}

// Sample data for subscription plans
const initialSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    planType: 'Free',
    planName: 'Basic Vendor',
    createdOn: '2023-01-15',
    renewal: 'Monthly',
    isAvailableForAllCountries: true,
    price: 0,
    listingInVendorMarketplace: true,
    bookingsAllowedPerMonth: 10,
    productListingsInEcommerce: 5,
    profileCustomization: 'Basic',
    customerInsights: 'Limited',
    prioritySupport: 'Standard',
    promotionalBannerVisibility: 'No',
    featuredVendorInCategory: false,
    description: '<p>Basic vendor plan with limited features. Ideal for new vendors testing the platform.</p>',
    status: 'active'
  },
  {
    id: 2,
    planType: 'Economy',
    planName: 'Standard Vendor',
    createdOn: '2023-02-20',
    renewal: 'Quarterly',
    isAvailableForAllCountries: true,
    price: 29.99,
    listingInVendorMarketplace: true,
    bookingsAllowedPerMonth: 50,
    productListingsInEcommerce: 20,
    profileCustomization: 'Standard',
    customerInsights: 'Standard',
    prioritySupport: 'Priority',
    promotionalBannerVisibility: 'Monthly',
    featuredVendorInCategory: false,
    description: '<p>Standard vendor plan with essential features. Good for established vendors with moderate traffic.</p>',
    status: 'active'
  },
  {
    id: 3,
    planType: 'Premium',
    planName: 'Premium Vendor',
    createdOn: '2023-03-10',
    renewal: 'Yearly',
    isAvailableForAllCountries: true,
    price: 79.99,
    listingInVendorMarketplace: true,
    bookingsAllowedPerMonth: 200,
    productListingsInEcommerce: 100,
    profileCustomization: 'Enhanced',
    customerInsights: 'Advanced',
    prioritySupport: 'High Priority',
    promotionalBannerVisibility: 'Bi-weekly',
    featuredVendorInCategory: true,
    description: '<p>Premium vendor plan with advanced features. Perfect for high-volume vendors seeking growth.</p>',
    status: 'active'
  },
  {
    id: 4,
    planType: 'Gold',
    planName: 'Gold Vendor',
    createdOn: '2023-04-05',
    renewal: 'Yearly',
    isAvailableForAllCountries: false,
    price: 149.99,
    listingInVendorMarketplace: true,
    bookingsAllowedPerMonth: 500,
    productListingsInEcommerce: 250,
    profileCustomization: 'Full Customization',
    customerInsights: 'Comprehensive',
    prioritySupport: 'High Priority',
    promotionalBannerVisibility: 'Weekly',
    featuredVendorInCategory: true,
    description: '<p>Gold vendor plan with premium features. Designed for professional vendors with high customer engagement.</p>',
    status: 'inactive'
  },
  {
    id: 5,
    planType: 'Platinum',
    planName: 'Platinum Vendor',
    createdOn: '2023-05-15',
    renewal: 'Yearly',
    isAvailableForAllCountries: false,
    price: 299.99,
    listingInVendorMarketplace: true,
    bookingsAllowedPerMonth: 1000,
    productListingsInEcommerce: 500,
    profileCustomization: 'Full Customization',
    customerInsights: 'Comprehensive',
    prioritySupport: '24/7',
    promotionalBannerVisibility: 'Weekly',
    featuredVendorInCategory: true,
    description: '<p>Platinum vendor plan with all premium features. Our top-tier offering for enterprise-level vendors.</p>',
    status: 'active'
  }
];

export default function VendorSubscriptionsPage() {
  const router = useRouter();
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(initialSubscriptionPlans);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  // Handle delete subscription plan
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this subscription plan?')) {
      setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== id));
    }
  };

  // Toggle subscription plan status
  const togglePlanStatus = (id: number) => {
    setSubscriptionPlans(prev => 
      prev.map(plan => 
        plan.id === id ? { ...plan, status: plan.status === 'active' ? 'inactive' : 'active' } : plan
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header without back button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Vendor Subscriptions</h1>
        
        {/* Add Subscription Button */}
        <Link
          href="/finance/vendor-subscriptions/create"
          className="flex items-center px-4 py-2 bg-[#41AFFF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Add Subscription</span>
        </Link>
      </div>

      {/* Subscription Plans Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S. No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptionPlans.map((plan, index) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{plan.planType} - {plan.planName}</div>
                    <div className="text-sm text-gray-500">Created on: {formatDate(plan.createdOn)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatPrice(plan.price)}</div>
                    <div className="text-sm text-gray-500">Renewal: {plan.renewal}</div>
                    <div className="text-sm text-gray-500">
                      Available for all countries: {plan.isAvailableForAllCountries ? 'Yes' : 'No'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div>Listing in Vendor Marketplace: {plan.listingInVendorMarketplace ? 'Yes' : 'No'}</div>
                      <div>Bookings allowed per month: {plan.bookingsAllowedPerMonth}</div>
                      <div>Profile customization: {plan.profileCustomization}</div>
                      <div>Access to customer insights: {plan.customerInsights}</div>
                      <div>...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => togglePlanStatus(plan.id)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {plan.status === 'active' ? (
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
                      <Link
                        href={`/finance/vendor-subscriptions/edit/${plan.id}`}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(plan.id)}
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
    </div>
  );
}