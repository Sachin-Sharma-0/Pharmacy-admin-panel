"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon, CalendarIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

// Define interfaces
interface RiderOrder {
  id: string;
  orderDate: string;
  deliveryDate: string;
  deliveryArea: string;
  orderValue: number;
  riderName: string;
  deliveryStatus: 'Delivered' | 'In Transit' | 'Failed' | 'Returned';
  paymentStatus: 'Paid' | 'Unpaid';
  transactionId?: string;
  paymentDate?: string;
  deliveryFee: number;
  platformCommission: number;
  riderPayout: number;
}

// Sample data
const initialRiderOrders: RiderOrder[] = [
  {
    id: 'ORD-001',
    orderDate: '2023-05-15',
    deliveryDate: '2023-05-16',
    deliveryArea: 'North Zone',
    orderValue: 135.50,
    riderName: 'John Doe',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12345',
    paymentDate: '2023-05-20',
    deliveryFee: 15.00,
    platformCommission: 3.00,
    riderPayout: 12.00
  },
  {
    id: 'ORD-002',
    orderDate: '2023-05-18',
    deliveryDate: '2023-05-19',
    deliveryArea: 'South Zone',
    orderValue: 92.50,
    riderName: 'Jane Smith',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Unpaid',
    deliveryFee: 12.00,
    platformCommission: 2.40,
    riderPayout: 9.60
  },
  {
    id: 'ORD-003',
    orderDate: '2023-05-20',
    deliveryDate: '2023-05-21',
    deliveryArea: 'East Zone',
    orderValue: 230.00,
    riderName: 'Mike Johnson',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12346',
    paymentDate: '2023-05-25',
    deliveryFee: 18.00,
    platformCommission: 3.60,
    riderPayout: 14.40
  },
  {
    id: 'ORD-004',
    orderDate: '2023-05-22',
    deliveryDate: '2023-05-23',
    deliveryArea: 'West Zone',
    orderValue: 165.00,
    riderName: 'John Doe',
    deliveryStatus: 'In Transit',
    paymentStatus: 'Unpaid',
    deliveryFee: 15.00,
    platformCommission: 3.00,
    riderPayout: 12.00
  },
  {
    id: 'ORD-005',
    orderDate: '2023-05-10',
    deliveryDate: '2023-05-11',
    deliveryArea: 'Central Zone',
    orderValue: 82.50,
    riderName: 'Sarah Williams',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Paid',
    transactionId: 'TXN-12347',
    paymentDate: '2023-05-15',
    deliveryFee: 10.00,
    platformCommission: 2.00,
    riderPayout: 8.00
  },
  {
    id: 'ORD-006',
    orderDate: '2023-05-25',
    deliveryDate: '2023-05-26',
    deliveryArea: 'North Zone',
    orderValue: 350.00,
    riderName: 'Mike Johnson',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Unpaid',
    deliveryFee: 20.00,
    platformCommission: 4.00,
    riderPayout: 16.00
  },
];

// Rider list for dropdown
const riders = [
  { id: 1, name: 'All Riders' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Mike Johnson' },
  { id: 5, name: 'Sarah Williams' },
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

export default function RiderPayoutsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<RiderOrder[]>(initialRiderOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRider, setSelectedRider] = useState('All Riders');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedDatePreset, setSelectedDatePreset] = useState('last30days');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<RiderOrder | null>(null);
  const [paymentData, setPaymentData] = useState({ transactionId: '', paymentDate: new Date().toISOString().split('T')[0] });

  // Calculate summary data
  const totalDeliveryFees = orders.reduce((sum, order) => sum + order.deliveryFee, 0);
  const totalCommissions = orders.reduce((sum, order) => sum + order.platformCommission, 0);
  const totalPayouts = orders.reduce((sum, order) => sum + order.riderPayout, 0);
  const paidPayouts = orders
    .filter(order => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.riderPayout, 0);
  const unpaidPayouts = orders
    .filter(order => order.paymentStatus === 'Unpaid')
    .reduce((sum, order) => sum + order.riderPayout, 0);

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

  // Handle rider selection
  const handleRiderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRider(e.target.value);
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
    setSelectedRider('All Riders');
    setDateRange({ from: '', to: '' });
    setSelectedDatePreset('last30days');
    setIsDatePickerOpen(false);
  };

  // Open payment modal
  const openPaymentModal = (order: RiderOrder) => {
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rider Payouts</h1>
      
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
          
          {/* Rider Filter */}
          <div className="relative flex-grow max-w-xs">
            <select
              value={selectedRider}
              onChange={handleRiderChange}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {riders.map(rider => (
                <option key={rider.id} value={rider.name}>{rider.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Delivery Fees */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Delivery Fees</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalDeliveryFees)}</p>
          <p className="text-sm text-gray-500 mt-1">From all deliveries</p>
        </div>
        
        {/* Total Payouts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Payouts</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPayouts)}</p>
          <p className="text-sm text-gray-500 mt-1">To all riders</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Area</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Fee</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider Payout</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.deliveryDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveryArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.orderValue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.riderName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.deliveryStatus === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : 
                        order.deliveryStatus === 'Failed' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {order.deliveryStatus}
                    </span>
                  </td>
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
                    <div className="text-sm text-gray-900">{formatCurrency(order.deliveryFee)}</div>
                    <div className="text-xs text-gray-500">Commission: {formatCurrency(order.platformCommission)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.riderPayout)}
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
                      <p className="text-sm text-gray-500 mb-2">Rider: {currentOrder.riderName}</p>
                      <p className="text-sm text-gray-500 mb-2">Amount: {formatCurrency(currentOrder.riderPayout)}</p>
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