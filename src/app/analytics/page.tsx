"use client";
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function AnalyticsPage() {
  // Add time range state
  const [timeRange, setTimeRange] = useState('last30Days');
  
  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 85, 80, 85, 95],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Sales 2022',
        data: [20, 25, 30, 45, 40, 50, 55, 75, 70, 65, 70, 80],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#0ea5e9',
          '#8b5cf6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
        ],
        borderWidth: 0,
      },
    ],
  };

  const customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#0ea5e9',
      },
      {
        label: 'Returning Customers',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: '#8b5cf6',
      },
    ],
  };

  // Sample data for vendor payout analytics
  const vendorPayoutData = {
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

  // Sample data for customer payout analytics
  const customerPayoutData = {
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

  // Sample data for order analytics
  const orderData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Completed Orders',
        data: [120, 135, 145, 160, 175, 190, 210, 225, 215, 230, 245, 260],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'Cancelled Orders',
        data: [15, 12, 18, 14, 16, 13, 17, 19, 15, 18, 20, 22],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Completed', 'Processing', 'Shipped', 'Cancelled', 'Returned'],
    datasets: [
      {
        data: [65, 15, 10, 7, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(14, 165, 233, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      {/* Time period selector */}
      <div className="flex justify-end">
        <select 
          className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="last7Days">Last 7 days</option>
          <option value="last30Days">Last 30 days</option>
          <option value="last90Days">Last 90 days</option>
          <option value="lastYear">Last 12 months</option>
          <option value="yearToDate">Year to date</option>
          <option value="allTime">All time</option>
        </select>
      </div>

      {/* Sales Overview */}
      <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
        <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
        <div className="mt-6 h-80">
          <Line 
            data={salesData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
              plugins: {
                title: {
                  display: true,
                  text: 'Monthly Sales Comparison',
                },
                legend: {
                  position: 'top',
                },
              },
            }} 
          />
        </div>
      </div>

      {/* Two column charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales by Category */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
          <div className="mt-6 h-60 flex justify-center">
            <div className="w-full max-w-xs">
              <Doughnut 
                data={categoryData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Customer Acquisition</h3>
          <div className="mt-6 h-60">
            <Bar 
              data={customerData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      {/* Order Analytics Section */}
      <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
        <h3 className="text-lg font-medium text-gray-900">Order Analytics</h3>
        <div className="mt-6 h-80">
          <Line 
            data={orderData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Orders',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month',
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Order Trends',
                },
                legend: {
                  position: 'top',
                },
              },
            }} 
          />
        </div>
      </div>

      {/* Order Status and Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Status */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Order Status Distribution</h3>
          <div className="mt-6 h-60 flex justify-center">
            <div className="w-full max-w-xs">
              <Doughnut 
                data={orderStatusData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>

        {/* Order Metrics */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Order Metrics</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { name: 'Average Processing Time', value: '1.2 days', change: '-0.3 days', changeType: 'decrease' },
              { name: 'Order Completion Rate', value: '94.5%', change: '+2.1%', changeType: 'increase' },
              { name: 'Cancellation Rate', value: '3.8%', change: '-0.5%', changeType: 'decrease' },
              { name: 'Return Rate', value: '2.2%', change: '-0.3%', changeType: 'decrease' },
            ].map((metric) => (
              <div key={metric.name} className="bg-gray-50 overflow-hidden rounded-lg p-5">
                <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{metric.value}</dd>
                <dd className="mt-2">
                  <span className={`text-sm ${metric.changeType === 'increase' ? 
                    (metric.name.includes('Cancellation') || metric.name.includes('Return') ? 'text-red-600' : 'text-green-600') : 
                    (metric.name.includes('Cancellation') || metric.name.includes('Return') ? 'text-green-600' : 'text-red-600')}`}>
                    {metric.change}
                  </span>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Payout Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Vendor Payout Trends */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Vendor Payout Trends</h3>
          <div className="mt-6 h-80">
            <Line 
              data={vendorPayoutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
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
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Top Vendors by Payout</h3>
          <div className="mt-6 h-80">
            <Bar 
              data={topVendorsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
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

      {/* Customer Payout Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer Payout Trends */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Customer Payout Trends</h3>
          <div className="mt-6 h-80">
            <Line 
              data={customerPayoutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
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
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          <div className="mt-6 h-80 flex justify-center items-center">
            <div className="w-full max-w-md">
              <Doughnut 
                data={paymentMethodData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
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

      {/* Key Metrics */}
      <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Key Performance Metrics</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Average Order Value', value: '₵65.40', change: '+12.3%', changeType: 'increase' },
            { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', changeType: 'increase' },
            { name: 'Cart Abandonment', value: '21%', change: '-2.5%', changeType: 'decrease' },
            { name: 'Customer Retention', value: '68%', change: '+5.2%', changeType: 'increase' },
          ].map((metric) => (
            <div key={metric.name} className="bg-gray-50 overflow-hidden rounded-lg p-5">
              <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
              <dd className="mt-1 text-4xl font-semibold text-gray-900">{metric.value}</dd>
              <dd className="mt-2">
                <span className={`text-sm ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}