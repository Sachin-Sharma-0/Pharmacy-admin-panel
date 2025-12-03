"use client";
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CustomerReportsPage() {
  // Time range state
  const [timeRange, setTimeRange] = useState('last30Days');
  
  // Sample data for customer report
  const customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Customers',
        data: [45, 52, 49, 60, 55, 65, 70, 75, 68, 72, 80, 85],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'Returning Customers',
        data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Sample summary metrics
  const summaryMetrics = [
    { name: 'Total Customers', value: '8,756', change: '+18.5%', changeType: 'increase' },
    { name: 'New Customers', value: '756', change: '+22.3%', changeType: 'increase' },
    { name: 'Repeat Purchase Rate', value: '42%', change: '+5.8%', changeType: 'increase' },
    { name: 'Average LTV', value: '₵320', change: '+7.5%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Reports</h1>
        
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

      {/* Chart */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm p-6">
        <div className="h-80">
          <Bar 
            data={customerData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Customer Acquisition',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Customers',
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

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed breakdown of your customer data.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Orders</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Total Spent</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Last Order</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'John Smith', email: 'john.smith@example.com', orders: 8, spent: '₵845.50', lastOrder: '2023-10-15' },
                  { name: 'Sarah Johnson', email: 'sarah.j@example.com', orders: 12, spent: '₵1,245.75', lastOrder: '2023-10-14' },
                  { name: 'Michael Brown', email: 'mbrown@example.com', orders: 5, spent: '₵520.25', lastOrder: '2023-10-10' },
                  { name: 'Emily Davis', email: 'emily.davis@example.com', orders: 3, spent: '₵175.99', lastOrder: '2023-10-08' },
                  { name: 'Robert Wilson', email: 'rwilson@example.com', orders: 15, spent: '₵1,890.50', lastOrder: '2023-10-12' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.spent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastOrder}</td>
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