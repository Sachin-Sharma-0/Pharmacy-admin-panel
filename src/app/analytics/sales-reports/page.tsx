"use client";
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function SalesReportsPage() {
  // Time range state
  const [timeRange, setTimeRange] = useState('last30Days');
  
  // Sample data for sales report
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 15000, 17500, 16000, 19000, 22000, 24000, 26000, 23000, 25000, 28000, 30000],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Sample summary metrics
  const summaryMetrics = [
    { name: 'Total Revenue', value: '₵258,000', change: '+12.5%', changeType: 'increase' },
    { name: 'Average Order Value', value: '₵65.40', change: '+8.3%', changeType: 'increase' },
    { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', changeType: 'increase' },
    { name: 'Total Orders', value: '3,945', change: '+15.2%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Sales Reports</h1>
        
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
          <Line 
            data={salesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Monthly Revenue',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Revenue (₵)',
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sales Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed breakdown of your sales data.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { date: '2023-10-15', orderId: '#ORD-001', customer: 'John Smith', amount: '₵125.00', status: 'Completed' },
                  { date: '2023-10-14', orderId: '#ORD-002', customer: 'Sarah Johnson', amount: '₵89.50', status: 'Completed' },
                  { date: '2023-10-14', orderId: '#ORD-003', customer: 'Michael Brown', amount: '₵210.75', status: 'Processing' },
                  { date: '2023-10-13', orderId: '#ORD-004', customer: 'Emily Davis', amount: '₵45.99', status: 'Completed' },
                  { date: '2023-10-12', orderId: '#ORD-005', customer: 'Robert Wilson', amount: '₵178.25', status: 'Completed' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
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