"use client";

import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
      <div className="bg-white rounded-lg modal-content max-w-md w-full mx-4 overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        <div className="p-6">
          <div className="text-gray-700 mb-4">
            {message}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${confirmButtonClass} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}