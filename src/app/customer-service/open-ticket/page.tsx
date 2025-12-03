'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PaperClipIcon } from '@heroicons/react/24/outline';

// Sample ticket data
const ticketData = {
  id: 'TKT-001',
  title: 'Product delivery delayed',
  status: 'Open',
  date: '2023-10-10',
  relatedTo: 'Customer',
  relatedName: 'John Smith',
  relatedEmail: 'john.smith@example.com',
  createdBy: 'Customer',
  creatorName: 'John Smith',
  creatorEmail: 'john.smith@example.com',
  priority: 'High',
  description: 'Order #ORD-12345 has not been delivered yet despite being 5 days past the expected delivery date. I have tried contacting customer support multiple times but have not received a satisfactory response. Please look into this matter urgently as I need the items for an upcoming event.',
  attachments: [
    { name: 'order_confirmation.pdf', size: '156 KB' },
    { name: 'delivery_tracking.png', size: '84 KB' }
  ],
  history: [
    {
      id: 1,
      date: '2023-10-10',
      user: 'John Smith',
      userType: 'Customer',
      action: 'Created ticket',
      comment: 'Initial ticket submission'
    },
    {
      id: 2,
      date: '2023-10-11',
      user: 'Support Agent',
      userType: 'Admin',
      action: 'Updated status',
      comment: 'Investigating the delivery delay with the logistics team'
    }
  ]
};

export default function OpenTicketPage() {
  const [status, setStatus] = useState(ticketData.status);
  const [comment, setComment] = useState('');
  const [history, setHistory] = useState(ticketData.history);

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
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/customer-service" 
          className="inline-flex items-center text-sm font-medium text-[#41AFFF] hover:text-[#2D9CFF]"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Customer Service
        </Link>
      </div>

      {/* Ticket header */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {ticketData.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Ticket ID: {ticketData.id}
            </p>
          </div>
          <div className="px-2 py-1 text-xs font-medium rounded-full bg-[#41AFFF]/20 text-[#41AFFF]">
            {status}
          </div>
        </div>
      </div>

      {/* Ticket details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ticket Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Related to</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketData.relatedTo}: {ticketData.relatedName} ({ticketData.relatedEmail})
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(ticketData.date)}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created by</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketData.creatorName} ({ticketData.createdBy})
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketData.priority}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketData.description}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {ticketData.attachments.map((attachment, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-[#41AFFF] hover:text-[#2D9CFF]">
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Add comment / Change status */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Update Ticket</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Change Status
              </label>
              <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border border-gray-300"
                >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Add Comment
              </label>
              <div className="mt-1">
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="shadow-sm focus:ring-[#41AFFF] focus:border-[#41AFFF] block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Add a comment or note about this ticket"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#41AFFF] hover:bg-[#2D9CFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Issue followup history */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Issue History</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {history.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#41AFFF] truncate">
                    {item.user} ({item.userType})
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.action}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {item.comment}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      {formatDate(item.date)}
                    </p>
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