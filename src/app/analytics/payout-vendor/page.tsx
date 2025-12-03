"use client";
import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function VendorPayoutAnalyticsPage() {
  // Time range state
  const [timeRange, setTimeRange] = useState('last30Days');
  const [vendorFilter, setVendorFilter] = useState('all');
  
  // Sample data for vendor payout analytics
  const payoutTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Payouts',
        data: [15000, 17500, 16800, 18200, 19500, 22000, 24500, 26000, 25000, 27500, 29000, 31000],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
      },
    ],
  };

  const topVendorsData = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'],
    datasets: [
      {
        label: 'Payout Amount',
        data: [45000, 38000, 32000, 28000, 25000],
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
    { name: 'Total Payouts', value: '₵258,000', change: '+12.5%', changeType: 'increase' },
    { name: 'Average Payout', value: '₵8,600', change: '+5.3%', changeType: 'increase' },
    { name: 'Active Vendors', value: '30', change: '+3', changeType: 'increase' },
    { name: 'Pending Payouts', value: '₵45,000', change: '-8.2%', changeType: 'decrease' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Vendor Payout Analytics</h1>
        
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
            <label htmlFor="vendor-filter" className="block text-sm font-medium text-gray-700">Vendor</label>
            <select
              id="vendor-filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
            >
              <option value="all">All Vendors</option>
              <option value="vendorA">Vendor A</option>
              <option value="vendorB">Vendor B</option>
              <option value="vendorC">Vendor C</option>
              <option value="vendorD">Vendor D</option>
              <option value="vendorE">Vendor E</option>
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
              <span className={`text-sm ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
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

        {/* Top Vendors by Payout */}
        <div className="bg-white overflow-hidden rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Vendors by Payout</h3>
          <div className="h-80">
            <Bar 
              data={topVendorsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y' as const,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Amount (₵)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Vendor Payout Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed breakdown of vendor payouts.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Vendor</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Payout Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Orders</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { vendor: 'Vendor A', date: '2023-10-15', amount: '₵12,500', orders: 145, status: 'Completed' },
                  { vendor: 'Vendor B', date: '2023-10-15', amount: '₵9,800', orders: 112, status: 'Completed' },
                  { vendor: 'Vendor C', date: '2023-10-14', amount: '₵8,250', orders: 98, status: 'Completed' },
                  { vendor: 'Vendor D', date: '2023-10-14', amount: '₵7,400', orders: 85, status: 'Processing' },
                  { vendor: 'Vendor E', date: '2023-10-13', amount: '₵6,800', orders: 76, status: 'Completed' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href="#" className="text-[#41AFFF] hover:text-blue-800">View Details</a>
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