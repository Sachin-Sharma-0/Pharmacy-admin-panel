"use client";
import React from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: any) => void;
}

export default function DataTable({
  columns,
  data,
  title,
  subtitle,
  emptyMessage = 'No data available',
  className = '',
  onRowClick,
}: DataTableProps) {
  return (
    <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${className}`}>
      {(title || subtitle) && (
        <div className="px-4 py-5 sm:px-6">
          {title && <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                    >
                      {column.cell 
                        ? column.cell(row[column.accessor], row)
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status badge component for use in tables
export function StatusBadge({ 
  status, 
  variant = 'default',
  className = '',
}: { 
  status: string; 
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  className?: string;
}) {
  const getColorClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorClasses()} ${className}`}>
      {status}
    </span>
  );
}