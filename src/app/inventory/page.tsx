"use client";
import React, { useState } from 'react';

export default function InventoryPage() {
  // Sample inventory data
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, sku: 'PROD-001', name: 'Wireless Headphones', category: 'Electronics', inStock: 45, lowStockThreshold: 10, status: 'In Stock', lastUpdated: '2023-10-15' },
    { id: 2, sku: 'PROD-002', name: 'Smart Watch', category: 'Electronics', inStock: 32, lowStockThreshold: 8, status: 'In Stock', lastUpdated: '2023-10-14' },
    { id: 3, sku: 'PROD-003', name: 'Cotton T-Shirt', category: 'Clothing', inStock: 78, lowStockThreshold: 20, status: 'In Stock', lastUpdated: '2023-10-12' },
    { id: 4, sku: 'PROD-004', name: 'Running Shoes', category: 'Footwear', inStock: 12, lowStockThreshold: 15, status: 'Low Stock', lastUpdated: '2023-10-10' },
    { id: 5, sku: 'PROD-005', name: 'Protein Powder', category: 'Nutrition', inStock: 5, lowStockThreshold: 10, status: 'Low Stock', lastUpdated: '2023-10-09' },
    { id: 6, sku: 'PROD-006', name: 'Yoga Mat', category: 'Fitness', inStock: 0, lowStockThreshold: 5, status: 'Out of Stock', lastUpdated: '2023-10-08' },
    { id: 7, sku: 'PROD-007', name: 'Water Bottle', category: 'Accessories', inStock: 25, lowStockThreshold: 10, status: 'In Stock', lastUpdated: '2023-10-07' },
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered inventory items
  const filteredItems = inventoryItems.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set(inventoryItems.map(item => item.category))];

  // Handle stock adjustment
  const handleStockAdjustment = (id: number, adjustment: number) => {
    setInventoryItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.inStock + adjustment);
          let newStatus = 'In Stock';
          if (newStock === 0) {
            newStatus = 'Out of Stock';
          } else if (newStock <= item.lowStockThreshold) {
            newStatus = 'Low Stock';
          }
          return { ...item, inStock: newStock, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status-filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category-filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Search by name or SKU"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.inStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStockAdjustment(item.id, 1)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => handleStockAdjustment(item.id, -1)}
                        className="text-red-600 hover:text-red-900"
                        disabled={item.inStock === 0}
                      >
                        - Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Low Stock Alert Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Low Stock Alerts</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Products that need to be restocked soon.</p>
        </div>
        <div className="border-t border-gray-200">
          <div className="divide-y divide-gray-200">
            {inventoryItems.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').map((item) => (
              <div key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary-600 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sku} - {item.category}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">{item.inStock} in stock</span>
                  </div>
                </div>
              </div>
            ))}
            {inventoryItems.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length === 0 && (
              <div className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500">
                No low stock alerts at this time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}