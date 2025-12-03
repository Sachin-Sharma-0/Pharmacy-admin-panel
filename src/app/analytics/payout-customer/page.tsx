"use client";
import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CustomerPayoutAnalyticsPage() {
  // Time range state
  const [timeRange, setTimeRange] = useState('last30Days');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  
  // Sample data for customer payout analytics
  const payoutTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Refunds',
        data: [1200, 1500, 1300, 1800, 1600, 1400, 1700, 1900, 1500, 1600, 1800, 2000],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      },
      {
        label: 'Cashbacks',
        data: [800, 900, 850, 950, 1000, 1100, 1200, 1300, 1100, 1200, 1400, 1500],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
    ],
  };

  const paymentMethodData = {
    labels: ['Credit Card', 'Debit Card', 'Mobile Money', 'Bank Transfer', 'Cash on Delivery'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(14, 165, 233, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample summary metrics
  const summaryMetrics = [
    { name: 'Total Refunds', value: '₵18,500', change: '+5.2%', changeType: 'increase' },
    { name: 'Total Cashbacks', value: '₵12,300', change: '+8.7%', changeType: 'increase' },
    { name: 'Avg. Processing Time', value: '2.5 days', change: '-0.5 days', changeType: 'decrease' },
    { name: 'Pending Payouts', value: '₵4,200', change: '-12.5%', changeType: 'decrease' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Payout Analytics</h1>
        
        <div className="flex space-x-2">
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export PDF
          </button>
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700">Time Range</label>
            <select
              id="time-range"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="last90Days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="payment-type" className="block text-sm font-medium text-gray-700">Payment Type</label>
            <select
              id="payment-type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="refunds">Refunds</option>
              <option value="cashbacks">Cashbacks</option>
              <option value="credits">Store Credits</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <div key={metric.name} className="bg-white overflow-hidden rounded-lg shadow-sm p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</dd>
            <dd className="mt-2">
              <span className={`text-sm ${metric.changeType === 'increase' ? 
                (metric.name.includes('Refunds') ? 'text-red-600' : 'text-green-600') : 
                (metric.name.includes('Refunds') ? 'text-green-600' : 'text-red-600')}`}>
                {metric.change}
              </span>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payout Trends */}
        <div className="bg-white overflow-hidden rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payout Trends</h3>
          <div className="h-80">
            <Line 
              data={payoutTrendsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Amount (₵)',
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Month',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white overflow-hidden rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="h-80 flex justify-center items-center">
            <div className="w-full max-w-md">
              <Doughnut 
                data={paymentMethodData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' as const,
                    },
                    title: {
                      display: true,
                      text: 'Distribution by Payment Method',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Payout Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed breakdown of customer payouts.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { customer: 'John Smith', orderId: '#ORD-001', type: 'Refund', amount: '₵125.00', date: '2023-10-15', status: 'Completed' },
                  { customer: 'Sarah Johnson', orderId: '#ORD-002', type: 'Cashback', amount: '₵45.50', date: '2023-10-14', status: 'Completed' },
                  { customer: 'Michael Brown', orderId: '#ORD-003', type: 'Refund', amount: '₵210.75', date: '2023-10-14', status: 'Processing' },
                  { customer: 'Emily Davis', orderId: '#ORD-004', type: 'Cashback', amount: '₵35.99', date: '2023-10-13', status: 'Completed' },
                  { customer: 'Robert Wilson', orderId: '#ORD-005', type: 'Store Credit', amount: '₵78.25', date: '2023-10-12', status: 'Completed' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}