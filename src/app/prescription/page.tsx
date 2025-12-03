'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample prescription data
const initialPrescriptions = [
  { id: 'PRE-001', name: 'Amoxicillin 500mg', vendorId: 'V-123', status: 'Accepted', dateTime: '2023-10-15T14:30:00' },
  { id: 'PRE-002', name: 'Lisinopril 10mg', vendorId: 'V-456', status: 'Declined', dateTime: '2023-10-14T09:45:00' },
  { id: 'PRE-003', name: 'Metformin 850mg', vendorId: 'V-789', status: 'Rejected', dateTime: '2023-10-13T16:20:00' },
  { id: 'PRE-004', name: 'Atorvastatin 20mg', vendorId: 'V-123', status: 'Accepted', dateTime: '2023-10-12T11:15:00' },
  { id: 'PRE-005', name: 'Sertraline 50mg', vendorId: 'V-456', status: 'Declined', dateTime: '2023-10-11T13:40:00' },
  { id: 'PRE-006', name: 'Albuterol Inhaler', vendorId: 'V-789', status: 'Accepted', dateTime: '2023-10-10T10:30:00' },
  { id: 'PRE-007', name: 'Levothyroxine 75mcg', vendorId: 'V-123', status: 'Rejected', dateTime: '2023-10-09T15:50:00' },
];

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter prescriptions based on status and search query
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesStatus = statusFilter === 'All' || prescription.status === statusFilter;
    const matchesSearch = 
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.vendorId.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Get status badge styling based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-[#41AFFF]/20 text-[#41AFFF]';
      case 'Declined':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#41AFFF] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#3a9ee6] focus:outline-none focus:ring-2 focus:ring-[#41AFFF] focus:ring-offset-2"
          >
            Add Prescription
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#41AFFF] sm:text-sm"
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status-filter"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#41AFFF] sm:text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Prescriptions table */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Prescription ID</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prescription Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vendor ID</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{prescription.id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prescription.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prescription.vendorId}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(prescription.status)}`}>
                    {prescription.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(prescription.dateTime)}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button className="text-[#41AFFF] hover:text-[#3a9ee6] mr-4">View</button>
                  <button className="text-[#41AFFF] hover:text-[#3a9ee6]">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}