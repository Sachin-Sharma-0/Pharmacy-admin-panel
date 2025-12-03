"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon, CalendarIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

// Define interfaces
interface Order {
  id: string;
  orderDate: string;
  subTotal: number;
  grandTotal: number;
  productName: string;
  orderStatus: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled' | 'Returned';
  vendorName: string;
  paymentStatus: 'Paid' | 'Unpaid';
  transactionId?: string;
  paymentDate?: string;
  commissionPercentage: number;
  commissionAmount: number;
  vendorPayout: number;
}

// Sample data
const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    orderDate: '2023-05-15',
    subTotal: 120.00,
    grandTotal: 135.50,
    productName: 'Premium Health Supplement',
    orderStatus: 'Delivered',
    vendorName: 'HealthPlus Pharmacy',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12345',
    paymentDate: '2023-05-20',
    commissionPercentage: 10,
    commissionAmount: 13.55,
    vendorPayout: 121.95
  },
  {
    id: 'ORD-002',
    orderDate: '2023-05-18',
    subTotal: 85.00,
    grandTotal: 92.50,
    productName: 'Organic Multivitamin',
    orderStatus: 'Delivered',
    vendorName: 'NatureCare',
    paymentStatus: 'Unpaid',
    commissionPercentage: 8,
    commissionAmount: 7.40,
    vendorPayout: 85.10
  },
  {
    id: 'ORD-003',
    orderDate: '2023-05-20',
    subTotal: 210.00,
    grandTotal: 230.00,
    productName: 'Medical Test Kit',
    orderStatus: 'Shipped',
    vendorName: 'MediTest Labs',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12346',
    paymentDate: '2023-05-25',
    commissionPercentage: 12,
    commissionAmount: 27.60,
    vendorPayout: 202.40
  },
  {
    id: 'ORD-004',
    orderDate: '2023-05-22',
    subTotal: 150.00,
    grandTotal: 165.00,
    productName: 'Prescription Medication',
    orderStatus: 'Processing',
    vendorName: 'HealthPlus Pharmacy',
    paymentStatus: 'Unpaid',
    commissionPercentage: 10,
    commissionAmount: 16.50,
    vendorPayout: 148.50
  },
  {
    id: 'ORD-005',
    orderDate: '2023-05-10',
    subTotal: 75.00,
    grandTotal: 82.50,
    productName: 'First Aid Kit',
    orderStatus: 'Delivered',
    vendorName: 'MediSupplies',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12347',
    paymentDate: '2023-05-15',
    commissionPercentage: 8,
    commissionAmount: 6.60,
    vendorPayout: 75.90
  },
  {
    id: 'ORD-006',
    orderDate: '2023-05-25',
    subTotal: 320.00,
    grandTotal: 350.00,
    productName: 'Advanced Medical Device',
    orderStatus: 'Delivered',
    vendorName: 'MediTech',
    paymentStatus: 'Unpaid',
    commissionPercentage: 15,
    commissionAmount: 52.50,
    vendorPayout: 297.50
  },
];

// Vendor list for dropdown
const vendors = [
  { id: 1, name: 'All Vendors' },
  { id: 2, name: 'HealthPlus Pharmacy' },
  { id: 3, name: 'NatureCare' },
  { id: 4, name: 'MediTest Labs' },
  { id: 5, name: 'MediSupplies' },
  { id: 6, name: 'MediTech' },
];

// Date range presets
const dateRangePresets = [
  { id: 'today', name: 'Today' },
  { id: 'yesterday', name: 'Yesterday' },
  { id: 'last7days', name: 'Last 7 Days' },
  { id: 'last30days', name: 'Last 30 Days' },
  { id: 'thisMonth', name: 'This Month' },
  { id: 'lastMonth', name: 'Last Month' },
  { id: 'custom', name: 'Custom Range' },
];

export default function VendorPayoutsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedDatePreset, setSelectedDatePreset] = useState('last30days');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [paymentData, setPaymentData] = useState({ transactionId: '', paymentDate: new Date().toISOString().split('T')[0] });

  // Calculate summary data
  const totalEarnings = orders.reduce((sum, order) => sum + order.grandTotal, 0);
  const totalPayouts = orders.reduce((sum, order) => sum + order.vendorPayout, 0);
  const paidPayouts = orders
    .filter(order => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.vendorPayout, 0);
  const unpaidPayouts = orders
    .filter(order => order.paymentStatus === 'Unpaid')
    .reduce((sum, order) => sum + order.vendorPayout, 0);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle vendor selection
  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVendor(e.target.value);
  };

  // Handle date range selection
  const handleDateRangeChange = (preset: string) => {
    setSelectedDatePreset(preset);
    const today = new Date();
    let fromDate = new Date();
    let toDate = new Date();

    switch (preset) {
      case 'today':
        fromDate = today;
        toDate = today;
        break;
      case 'yesterday':
        fromDate = new Date(today.setDate(today.getDate() - 1));
        toDate = new Date(fromDate);
        break;
      case 'last7days':
        fromDate = new Date(today.setDate(today.getDate() - 7));
        toDate = new Date();
        break;
      case 'last30days':
        fromDate = new Date(today.setDate(today.getDate() - 30));
        toDate = new Date();
        break;
      case 'thisMonth':
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        toDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'custom':
        // Keep current custom dates if any
        return;
      default:
        fromDate = new Date(today.setDate(today.getDate() - 30));
        toDate = new Date();
    }

    setDateRange({
      from: fromDate.toISOString().split('T')[0],
      to: toDate.toISOString().split('T')[0]
    });
  };

  // Handle custom date changes
  const handleDateChange = (field: 'from' | 'to', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
    setSelectedDatePreset('custom');
  };

  // Apply filters
  const applyFilters = () => {
    // In a real app, this would make an API call with the filters
    // For now, we'll just close the date picker
    setIsDatePickerOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedVendor('All Vendors');
    setDateRange({ from: '', to: '' });
    setSelectedDatePreset('last30days');
    setIsDatePickerOpen(false);
  };

  // Open payment modal
  const openPaymentModal = (order: Order) => {
    setCurrentOrder(order);
    setPaymentData({ transactionId: '', paymentDate: new Date().toISOString().split('T')[0] });
    setIsPaymentModalOpen(true);
  };

  // Handle payment update
  const handlePaymentUpdate = () => {
    if (!currentOrder) return;
    
    // Update the order with payment information
    const updatedOrders = orders.map(order => {
      if (order.id === currentOrder.id) {
        return {
          ...order,
          paymentStatus: 'Paid' as const,
          transactionId: paymentData.transactionId,
          paymentDate: paymentData.paymentDate
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Vendor Payouts on Products</h1>
      
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Filter */}
          <div className="relative flex-grow max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search via Order ID"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
            />
          </div>
          
          {/* Date Range Filter */}
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
              <span>Order Date</span>
            </button>
            
            {isDatePickerOpen && (
              <div className="absolute z-10 mt-1 w-80 bg-white rounded-md shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Select Date Range</h3>
                  <button 
                    onClick={() => setIsDatePickerOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {dateRangePresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handleDateRangeChange(preset.id)}
                      className={`px-3 py-1.5 text-sm rounded-md ${selectedDatePreset === preset.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => handleDateChange('from', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => handleDateChange('to', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#41AFFF] border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Vendor Filter */}
          <div className="relative flex-grow max-w-xs">
            <select
              value={selectedVendor}
              onChange={handleVendorChange}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Earnings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Earnings</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalEarnings)}</p>
          <p className="text-sm text-gray-500 mt-1">From all orders</p>
        </div>
        
        {/* Total Payouts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Payouts</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPayouts)}</p>
          <p className="text-sm text-gray-500 mt-1">To all vendors</p>
        </div>
        
        {/* Total Paid Payouts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Paid Payouts</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(paidPayouts)}</p>
          <p className="text-sm text-gray-500 mt-1">Successfully processed</p>
        </div>
        
        {/* Total Unpaid Payouts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Unpaid Payouts</h3>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(unpaidPayouts)}</p>
          <p className="text-sm text-gray-500 mt-1">Pending payment</p>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Payout</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Sub Total: {formatCurrency(order.subTotal)}</div>
                    <div className="text-sm font-medium text-gray-900">Grand Total: {formatCurrency(order.grandTotal)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.vendorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.paymentStatus === 'Paid' ? (
                      <div>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          <div>TXN ID: {order.transactionId}</div>
                          <div>Date: {order.paymentDate ? formatDate(order.paymentDate) : '-'}</div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => openPaymentModal(order)}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
                      >
                        Unpaid
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.commissionPercentage}%</div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(order.commissionAmount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.vendorPayout)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Payment Modal */}
      {isPaymentModalOpen && currentOrder && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 modal-backdrop transition-opacity" aria-hidden="true" onClick={() => setIsPaymentModalOpen(false)}>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden modal-content transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-20" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Payment Status</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Order ID: {currentOrder.id}</p>
                      <p className="text-sm text-gray-500 mb-2">Vendor: {currentOrder.vendorName}</p>
                      <p className="text-sm text-gray-500 mb-2">Amount: {formatCurrency(currentOrder.vendorPayout)}</p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                      <input
                        type="text"
                        value={paymentData.transactionId}
                        onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                        placeholder="Enter transaction ID"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                      <input
                        type="date"
                        value={paymentData.paymentDate}
                        onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handlePaymentUpdate}
                  disabled={!paymentData.transactionId}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${paymentData.transactionId ? 'bg-[#41AFFF] hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'}`}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}