"use client";

import React from 'react';
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CubeIcon 
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// Sample data for stats
const stats = [
  { name: 'Total Revenue', value: '₵45,231', icon: CurrencyDollarIcon, change: '+20.1%', changeType: 'increase' },
  { name: 'Orders', value: '356', icon: ShoppingCartIcon, change: '+4.75%', changeType: 'increase' },
  { name: 'Customers', value: '2,103', icon: UsersIcon, change: '+12.2%', changeType: 'increase' },
  { name: 'Products', value: '124', icon: CubeIcon, change: '-2.7%', changeType: 'decrease' },
];

// Sample data for charts
const doughnutData = {
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

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 40, 35, 50, 49, 60],
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      tension: 0.3,
    },
    {
      label: 'Revenue',
      data: [50, 60, 55, 70, 65, 80],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.3,
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow-card p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-primary-100 p-3">
                <stat.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales by Category */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
          <div className="mt-6 h-60 flex justify-center">
            <div className="w-full max-w-xs">
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-white overflow-hidden rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
          <div className="mt-6 h-60">
            <Line 
              data={lineData} 
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white overflow-hidden rounded-lg shadow-card">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-6 py-5">
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, activity: 'New order #1234 from John Doe', time: '2 minutes ago' },
              { id: 2, activity: 'Payment received for order #1233', time: '15 minutes ago' },
              { id: 3, activity: 'New product added: Wireless Headphones', time: '1 hour ago' },
              { id: 4, activity: 'Customer support ticket #567 resolved', time: '3 hours ago' },
              { id: 5, activity: 'Inventory updated for 5 products', time: '5 hours ago' },
            ].map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{item.activity}</h3>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}