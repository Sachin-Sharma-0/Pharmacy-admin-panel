'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TicketIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

// Sample ticket data for open tickets
const initialTickets = [
  { 
    id: 'TKT-001', 
    date: '2023-10-10', 
    relatedTo: 'Customer', 
    relatedName: 'John Smith', 
    relatedEmail: 'john.smith@example.com',
    title: 'Product delivery delayed', 
    description: 'Order #ORD-12345 has not been delivered yet despite being 5 days past the expected delivery date', 
    createdBy: 'Customer', 
    creatorName: 'John Smith',
    creatorEmail: 'john.smith@example.com',
    status: 'Open'
  },
  { 
    id: 'TKT-002', 
    date: '2023-10-09', 
    relatedTo: 'Vendor', 
    relatedName: 'Jane Doe', 
    relatedEmail: 'jane@fashionstore.com',
    title: 'Payment not received', 
    description: 'The payment for September sales has not been credited to my account yet', 
    createdBy: 'Vendor', 
    creatorName: 'Jane Doe',
    creatorEmail: 'jane@fashionstore.com',
    status: 'Open'
  },
  { 
    id: 'TKT-003', 
    date: '2023-10-08', 
    relatedTo: 'Customer', 
    relatedName: 'Robert Johnson', 
    relatedEmail: 'robert@example.com',
    title: 'Defective product received', 
    description: 'The smartphone I received has a cracked screen right out of the box', 
    createdBy: 'Customer', 
    creatorName: 'Robert Johnson',
    creatorEmail: 'robert@example.com',
    status: 'Open'
  },
  { 
    id: 'TKT-004', 
    date: '2023-10-07', 
    relatedTo: 'Vendor', 
    relatedName: 'Sarah Williams', 
    relatedEmail: 'sarah@organicfoods.com',
    title: 'Inventory sync issue', 
    description: 'My inventory is not syncing correctly with the marketplace, showing incorrect stock levels', 
    createdBy: 'Vendor', 
    creatorName: 'Sarah Williams',
    creatorEmail: 'sarah@organicfoods.com',
    status: 'Open'
  },
  { 
    id: 'TKT-005', 
    date: '2023-10-06', 
    relatedTo: 'Customer', 
    relatedName: 'Michael Brown', 
    relatedEmail: 'michael@example.com',
    title: 'Refund not processed', 
    description: 'I returned an item two weeks ago but haven\'t received my refund yet', 
    createdBy: 'Customer', 
    creatorName: 'Michael Brown',
    creatorEmail: 'michael@example.com',
    status: 'Open'
  },
];

export default function OpenTicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Open');

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Open Tickets</h1>
        <Link href="/customer-service/add-ticket" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#41AFFF] hover:bg-[#2D9CFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF]">
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Raise a Ticket
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <Link
            href="/customer-service"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            All Tickets
          </Link>
          <button
            className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Open Tickets
          </button>
          <Link
            href="/customer-service/closed-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Closed Tickets
          </Link>
          <Link
            href="/customer-service/resolved-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Resolved Tickets
          </Link>
          <Link
            href="/customer-service/reopen-tickets"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Reopened Tickets
          </Link>
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10 px-3"
                placeholder="Search by ticket ID, title, or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select
              id="user-filter"
              name="user-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="All">All Users</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status-filter"
              name="status-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Complaint Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Ticket Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Created By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Date: {formatDate(ticket.date)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Related to: {ticket.relatedTo} ({ticket.relatedEmail})
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ticket.creatorName}</div>
                  <div className="text-sm text-gray-500">{ticket.createdBy}</div>
                  <div className="text-sm text-gray-500">{formatDate(ticket.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <Link 
                      href={`/customer-service/ticket/${ticket.id}`}
                      className="text-[#41AFFF] hover:text-[#2D9CFF] bg-[#41AFFF]/10 px-3 py-1 rounded-md text-center"
                    >
                      View
                    </Link>
                    <Link 
                      href="/customer-service/open-ticket"
                      className="text-[#41AFFF] hover:text-[#2D9CFF] bg-[#41AFFF]/10 px-3 py-1 rounded-md text-center"
                    >
                      Open
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}