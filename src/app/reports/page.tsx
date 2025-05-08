"use client";
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  // Report type state
  const [reportType, setReportType] = useState('sales');
  const [timeRange, setTimeRange] = useState('last30Days');
  
  // Sample data for different report types
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

  const inventoryData = {
    labels: ['Electronics', 'Clothing', 'Footwear', 'Accessories', 'Home Goods', 'Beauty', 'Food'],
    datasets: [
      {
        label: 'Current Stock',
        data: [150, 230, 180, 90, 120, 75, 60],
        backgroundColor: [
          'rgba(14, 165, 233, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(168, 85, 247, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
  const summaryMetrics = {
    sales: [
      { name: 'Total Revenue', value: '₵258,000', change: '+12.5%', changeType: 'increase' },
      { name: 'Average Order Value', value: '₵65.40', change: '+8.3%', changeType: 'increase' },
      { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', changeType: 'increase' },
      { name: 'Total Orders', value: '3,945', change: '+15.2%', changeType: 'increase' },
    ],
    inventory: [
      { name: 'Total Products', value: '1,245', change: '+5.2%', changeType: 'increase' },
      { name: 'Low Stock Items', value: '28', change: '-12.5%', changeType: 'decrease' },
      { name: 'Out of Stock', value: '15', change: '-8.3%', changeType: 'decrease' },
      { name: 'Inventory Value', value: '₵425,000', change: '+10.5%', changeType: 'increase' },
    ],
    customers: [
      { name: 'Total Customers', value: '8,756', change: '+18.5%', changeType: 'increase' },
      { name: 'New Customers', value: '756', change: '+22.3%', changeType: 'increase' },
      { name: 'Repeat Purchase Rate', value: '42%', change: '+5.8%', changeType: 'increase' },
      { name: 'Average LTV', value: '₵320', change: '+7.5%', changeType: 'increase' },
    ],
  };

  // Get current report data based on selected type
  const getCurrentReportData = () => {
    switch (reportType) {
      case 'sales':
        return salesData;
      case 'inventory':
        return inventoryData;
      case 'customers':
        return customerData;
      default:
        return salesData;
    }
  };

  // Define type for metrics
  type Metric = {
    name: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
  };

  // Get current metrics based on selected report type
  const getCurrentMetrics = (): Metric[] => {
    return []//summaryMetrics[reportType as keyof typeof summaryMetrics] || [];
  };

  // Render appropriate chart based on report type
  const renderChart = () => {
    const data = getCurrentReportData();
    
    switch (reportType) {
      case 'sales':
        return (
          <Line 
            data={data}
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
                    text: 'Revenue ($)',
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
        );
      case 'inventory':
        return (
          <Pie 
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
                title: {
                  display: true,
                  text: 'Inventory by Category',
                },
              },
            }}
          />
        );
      case 'customers':
        return (
          <Bar 
            data={data}
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        
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
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              id="report-type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="customers">Customer Report</option>
            </select>
          </div>
          
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
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {getCurrentMetrics().map((metric) => (
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
          {renderChart()}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {reportType === 'sales' ? 'Sales Details' : 
             reportType === 'inventory' ? 'Inventory Details' : 'Customer Details'}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed breakdown of your {reportType} data.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {reportType === 'sales' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </>
                  )}
                  {reportType === 'inventory' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    </>
                  )}
                  {reportType === 'customers' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample rows for Sales */}
                {reportType === 'sales' && [
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

                {/* Sample rows for Inventory */}
                {reportType === 'inventory' && [
                  { product: 'Wireless Headphones', category: 'Electronics', inStock: 45, status: 'In Stock', lastUpdated: '2023-10-15' },
                  { product: 'Smart Watch', category: 'Electronics', inStock: 32, status: 'In Stock', lastUpdated: '2023-10-14' },
                  { product: 'Cotton T-Shirt', category: 'Clothing', inStock: 78, status: 'In Stock', lastUpdated: '2023-10-12' },
                  { product: 'Running Shoes', category: 'Footwear', inStock: 12, status: 'Low Stock', lastUpdated: '2023-10-10' },
                  { product: 'Protein Powder', category: 'Nutrition', inStock: 5, status: 'Low Stock', lastUpdated: '2023-10-09' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.inStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                  </tr>
                ))}

                {/* Sample rows for Customers */}
                {reportType === 'customers' && [
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