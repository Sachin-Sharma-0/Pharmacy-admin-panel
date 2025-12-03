"use client";
import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function TableSkeleton({ rows = 6, cols = 5 }: TableSkeletonProps) {
  const cells = Array.from({ length: cols });
  const rowsArray = Array.from({ length: rows });

  return (
    <>
      {rowsArray.map((_, rIdx) => (
        <tr key={`skeleton-row-${rIdx}`} className="animate-pulse">
          {cells.map((_, cIdx) => (
            <td key={`skeleton-cell-${rIdx}-${cIdx}`} className="px-3 py-4">
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

