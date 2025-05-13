"use client";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function AnalyticsPage() {
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      {/* Time period selector */}
      <div className="flex justify-end">
        <select className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 12 months</option>
          <option>Year to date</option>
          <option>All time</option>
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