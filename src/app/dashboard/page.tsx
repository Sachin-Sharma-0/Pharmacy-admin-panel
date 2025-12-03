"use client";

import React from 'react';
import { StatItem, Vendor, Customer, DoughnutChartData, LineChartData, StatCardProps, EntityListProps } from './types';
import Link from 'next/link';
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CubeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  CalendarIcon,
  TicketIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// Customer Analytics data
const customerStats: StatItem[] = [
  { name: 'Active Customers', value: '1,845', icon: UsersIcon, change: '+12.2%', changeType: 'increase' },
  { name: 'Inactive Customers', value: '258', icon: UsersIcon, change: '-5.3%', changeType: 'decrease' },
  { name: 'New Signups Today', value: '24', icon: UsersIcon, change: '+18.5%', changeType: 'increase' },
  { name: 'Overall Users', value: '2,103', icon: UsersIcon, change: '+10.7%', changeType: 'increase' },
];

// Vendor Analytics data
const vendorStats: StatItem[] = [
  { name: 'Active Vendors', value: '187', icon: CubeIcon, change: '+8.4%', changeType: 'increase' },
  { name: 'Approved Vendors', value: '156', icon: CheckCircleIcon, change: '+5.2%', changeType: 'increase' },
  { name: 'Pending Approval', value: '32', icon: ClockIcon, change: '+12.8%', changeType: 'increase' },
  { name: 'Suspended Vendors', value: '8', icon: XCircleIcon, change: '-15.3%', changeType: 'decrease' },
  { name: 'Total Vendors', value: '227', icon: CubeIcon, change: '+7.6%', changeType: 'increase' },
];

// Order Analytics data
const orderStats: StatItem[] = [
  { name: 'New Orders', value: '78', icon: ShoppingCartIcon, change: '+14.2%', changeType: 'increase' },
  { name: 'Shipped Orders', value: '124', icon: TruckIcon, change: '+8.7%', changeType: 'increase' },
  { name: 'Delivered Orders', value: '95', icon: CheckCircleIcon, change: '+6.3%', changeType: 'increase' },
  { name: 'Approved Orders', value: '297', icon: CheckCircleIcon, change: '+9.5%', changeType: 'increase' },
  { name: 'Canceled Orders', value: '18', icon: XCircleIcon, change: '-12.4%', changeType: 'decrease' },
];

// Revenue Analytics data
const revenueStats: StatItem[] = [
  { name: 'Today\'s Revenue', value: '₵4,231', icon: CurrencyDollarIcon, change: '+15.7%', changeType: 'increase' },
  { name: 'This Week Revenue', value: '₵18,456', icon: CurrencyDollarIcon, change: '+8.3%', changeType: 'increase' },
  { name: 'This Month Revenue', value: '₵45,231', icon: CurrencyDollarIcon, change: '+20.1%', changeType: 'increase' },
  { name: 'Refund Amount', value: '₵1,245', icon: CurrencyDollarIcon, change: '-5.8%', changeType: 'decrease' },
];

// Payout Analytics data
const payoutStats: StatItem[] = [
  { name: 'Pending Payouts', value: '₵12,450', icon: ClockIcon, change: '+7.2%', changeType: 'increase' },
  { name: 'Processed Payouts', value: '₵28,750', icon: CheckCircleIcon, change: '+12.5%', changeType: 'increase' },
  { name: 'Scheduled Payouts', value: '₵8,320', icon: CalendarIcon, change: '+4.8%', changeType: 'increase' },
];

// Support Ticket Analytics data
const ticketStats: StatItem[] = [
  { name: 'New Tickets', value: '24', icon: TicketIcon, change: '+8.7%', changeType: 'increase' },
  { name: 'In Progress', value: '18', icon: ClockIcon, change: '+3.2%', changeType: 'increase' },
  { name: 'Solved Tickets', value: '42', icon: CheckCircleIcon, change: '+15.4%', changeType: 'increase' },
];

// Platform Earnings data
const earningStats: StatItem[] = [
  { name: 'Commission Earnings', value: '₵8,450', icon: CurrencyDollarIcon, change: '+18.3%', changeType: 'increase' },
  { name: 'Fee Earnings', value: '₵3,275', icon: CurrencyDollarIcon, change: '+9.7%', changeType: 'increase' },
];

// Sample data for vendor lists
const newVendors: Vendor[] = [
  { id: 1, name: 'John Smith', email: 'john@techsolutions.com', date: '2023-08-15' },
  { id: 2, name: 'Emma Johnson', email: 'emma@freshgrocers.com', date: '2023-08-14' },
  { id: 3, name: 'Michael Brown', email: 'michael@fashionforward.com', date: '2023-08-14' },
  { id: 4, name: 'Sophia Williams', email: 'sophia@homeessentials.com', date: '2023-08-13' },
  { id: 5, name: 'Robert Jones', email: 'robert@digitaldevices.com', date: '2023-08-12' },
  { id: 6, name: 'Olivia Davis', email: 'olivia@beautysupplies.com', date: '2023-08-12' },
  { id: 7, name: 'William Miller', email: 'william@sportsgear.com', date: '2023-08-11' },
  { id: 8, name: 'Ava Wilson', email: 'ava@petproducts.com', date: '2023-08-11' },
  { id: 9, name: 'James Taylor', email: 'james@officeworks.com', date: '2023-08-10' },
  { id: 10, name: 'Charlotte Anderson', email: 'charlotte@kitchenware.com', date: '2023-08-10' },
];

const pendingVendors: Vendor[] = [
  { id: 3, name: 'Michael Brown', email: 'michael@fashionforward.com', date: '2023-08-14' },
  { id: 7, name: 'William Miller', email: 'william@sportsgear.com', date: '2023-08-11' },
  { id: 11, name: 'Daniel Thomas', email: 'daniel@organicfoods.com', date: '2023-08-09' },
  { id: 15, name: 'Mia Jackson', email: 'mia@handcrafted.com', date: '2023-08-07' },
  { id: 18, name: 'Benjamin White', email: 'benjamin@electronics.com', date: '2023-08-05' },
];

const topRatedVendors: Vendor[] = [
  { id: 4, name: 'Sophia Williams', email: 'sophia@homeessentials.com', rating: 4.9 },
  { id: 2, name: 'Emma Johnson', email: 'emma@freshgrocers.com', rating: 4.8 },
  { id: 10, name: 'Charlotte Anderson', email: 'charlotte@kitchenware.com', rating: 4.8 },
  { id: 1, name: 'John Smith', email: 'john@techsolutions.com', rating: 4.7 },
  { id: 8, name: 'Ava Wilson', email: 'ava@petproducts.com', rating: 4.7 },
];

const topRevenueVendors: Vendor[] = [
  { id: 1, name: 'John Smith', email: 'john@techsolutions.com', revenue: '₵12,450' },
  { id: 4, name: 'Sophia Williams', email: 'sophia@homeessentials.com', revenue: '₵10,875' },
  { id: 2, name: 'Emma Johnson', email: 'emma@freshgrocers.com', revenue: '₵9,320' },
  { id: 5, name: 'Robert Jones', email: 'robert@digitaldevices.com', revenue: '₵8,745' },
  { id: 10, name: 'Charlotte Anderson', email: 'charlotte@kitchenware.com', revenue: '₵7,890' },
];

const repeatCustomers: Customer[] = [
  { id: 101, name: 'Sarah Johnson', email: 'sarah@example.com', orders: 12 },
  { id: 102, name: 'David Lee', email: 'david@example.com', orders: 10 },
  { id: 103, name: 'Jennifer Smith', email: 'jennifer@example.com', orders: 9 },
  { id: 104, name: 'Michael Chen', email: 'michael@example.com', orders: 8 },
  { id: 105, name: 'Emily Davis', email: 'emily@example.com', orders: 7 },
];

// Sample data for charts
const doughnutData: DoughnutChartData = {
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

const lineData: LineChartData = {
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

// Stat Card Component for reusability
const StatCard = ({ stat }: StatCardProps) => (
  <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow-card p-4">
    <div className="flex items-center">
      <div className="flex-shrink-0 rounded-md bg-primary-100 p-2.5">
        <stat.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
      </div>
      <div className="ml-4 w-0 flex-1">
        <dl>
          <dt className="text-xs font-medium text-gray-500 truncate">{stat.name}</dt>
          <dd>
            <div className="text-base font-medium text-gray-900">{stat.value}</div>
          </dd>
        </dl>
      </div>
    </div>
    <div className="mt-2">
      <div className={`text-xs ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
        {stat.change} from last period
      </div>
    </div>
  </div>
);

// Vendor/Customer List Component
const EntityList = ({ title, entities, type, viewAllLink }: EntityListProps) => {
  // Type guards to check entity type
  const isVendor = (entity: Vendor | Customer): entity is Vendor => 
    'date' in entity || 'rating' in entity || 'revenue' in entity;
  
  const isCustomer = (entity: Vendor | Customer): entity is Customer => 
    'orders' in entity;

  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-card">
      <div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <Link href={viewAllLink} className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
          View All <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="px-4 py-3">
        <ul className="divide-y divide-gray-100">
          {entities.slice(0, 5).map((entity) => (
            <li key={entity.id} className="py-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{entity.name}</p>
                  <p className="text-xs text-gray-500">{entity.email}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {type === 'vendor-signup' && isVendor(entity) && entity.date && formatDate(entity.date)}
                  {type === 'vendor-rating' && isVendor(entity) && entity.rating && <span className="font-medium text-primary-600">★ {entity.rating}</span>}
                  {type === 'vendor-revenue' && isVendor(entity) && entity.revenue && <span className="font-medium text-green-600">{entity.revenue}</span>}
                  {type === 'customer-repeat' && isCustomer(entity) && <span className="font-medium text-primary-600">{entity.orders} orders</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Analytics Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
      </div>
      
      {/* Customer Analytics */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Analytics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {customerStats.map((stat) => (
            <StatCard key={stat.name} stat={stat} />
          ))}
        </div>
      </div>
      
      {/* Vendor Analytics */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Vendor Analytics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {vendorStats.map((stat) => (
            <StatCard key={stat.name} stat={stat} />
          ))}
        </div>
      </div>
      
      {/* Order Analytics */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Order Analytics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {orderStats.map((stat) => (
            <StatCard key={stat.name} stat={stat} />
          ))}
        </div>
      </div>
      
      {/* Revenue & Financial Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Revenue Analytics</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {revenueStats.map((stat) => (
              <StatCard key={stat.name} stat={stat} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Payout Analytics</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {payoutStats.map((stat) => (
              <StatCard key={stat.name} stat={stat} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Support & Platform Earnings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Support Tickets</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ticketStats.map((stat) => (
              <StatCard key={stat.name} stat={stat} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Platform Earnings</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {earningStats.map((stat) => (
              <StatCard key={stat.name} stat={stat} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Vendor & Customer Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EntityList 
          title="New Vendor Signups" 
          entities={newVendors} 
          type="vendor-signup" 
          viewAllLink="/vendor-management"
        />
        
        <EntityList 
          title="Pending Vendor Approvals" 
          entities={pendingVendors} 
          type="vendor-signup" 
          viewAllLink="/vendor-management/pending"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EntityList 
          title="Top Performing Vendors by Rating" 
          entities={topRatedVendors} 
          type="vendor-rating" 
          viewAllLink="/vendor-management"
        />
        
        <EntityList 
          title="Top Performing Vendors by Revenue" 
          entities={topRevenueVendors} 
          type="vendor-revenue" 
          viewAllLink="/vendor-management"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <EntityList 
          title="Repeat Customers" 
          entities={repeatCustomers} 
          type="customer-repeat" 
          viewAllLink="/customers"
        />
      </div>
    </div>
  );
}