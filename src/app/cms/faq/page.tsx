'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDownTrayIcon as SaveIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

// Define FAQ interface
interface FAQ {
  id: number;
  question: string;
  answer: string;
  enabled: boolean;
}

// Sample FAQ data
const sampleFAQs: FAQ[] = [
  {
    id: 1,
    question: 'How do I create an account?',
    answer: '<p>To create an account, click on the "Sign Up" button in the top right corner of our website. Fill in your details including your name, email address, and password. Then click "Create Account" to complete the process.</p>',
    enabled: true,
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer: '<p>We accept various payment methods including:</p><ul><li>Credit/Debit Cards (Visa, Mastercard, American Express)</li><li>PayPal</li><li>Bank Transfers</li><li>Digital Wallets (Apple Pay, Google Pay)</li></ul>',
    enabled: true,
  },
  {
    id: 3,
    question: 'How can I track my order?',
    answer: '<p>You can track your order by logging into your account and navigating to the "Orders" section. Click on the specific order you want to track, and you will see the current status and tracking information.</p>',
    enabled: false,
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer: '<p>Our return policy allows returns within 30 days of purchase. Items must be in their original condition with all tags and packaging intact. Please contact our customer service team to initiate a return.</p>',
    enabled: true,
  },
];

export default function FAQPage() {
  // State for FAQs, editing, and panel visibility
  const [faqs, setFaqs] = useState<FAQ[]>(sampleFAQs);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<FAQ>({ id: 0, question: '', answer: '', enabled: true });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for confirmation dialogs
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedFAQId, setSelectedFAQId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<boolean>(false);

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write your answer here...',
      }),
    ],
    content: '',
    editable: true,
    onUpdate: ({ editor }) => {
      setCurrentFAQ(prev => ({ ...prev, answer: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none p-4 min-h-[200px] bg-white rounded-lg shadow-sm border border-gray-200',
      },
    },
  });

  // Update editor content when editing an existing FAQ
  useEffect(() => {
    if (editor && currentFAQ.answer) {
      editor.commands.setContent(currentFAQ.answer);
    }
  }, [editor, currentFAQ.id]);

  // Handle opening the add/edit panel
  const handleAddFAQ = () => {
    setCurrentFAQ({ id: 0, question: '', answer: '', enabled: true });
    setIsEditing(false);
    setIsAddPanelOpen(true);
    if (editor) {
      editor.commands.setContent('');
    }
  };

  // Handle editing an existing FAQ
  const handleEditFAQ = (faq: FAQ) => {
    setCurrentFAQ(faq);
    setIsEditing(true);
    setIsAddPanelOpen(true);
  };

  // Handle toggling FAQ enabled status - opens confirmation dialog
  const handleToggleFAQ = (id: number) => {
    const faq = faqs.find(f => f.id === id);
    if (faq) {
      setSelectedFAQId(id);
      setNewStatus(!faq.enabled);
      setIsToggleModalOpen(true);
    }
  };

  // Handle toggle confirmation
  const handleToggleConfirm = () => {
    if (selectedFAQId !== null) {
      setFaqs(faqs.map(faq => 
        faq.id === selectedFAQId ? { ...faq, enabled: newStatus } : faq
      ));
      setIsToggleModalOpen(false);
    }
  };

  // Handle deleting an FAQ - opens confirmation dialog
  const handleDeleteFAQ = (id: number) => {
    setSelectedFAQId(id);
    setIsDeleteModalOpen(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedFAQId !== null) {
      setFaqs(faqs.filter(faq => faq.id !== selectedFAQId));
      setIsDeleteModalOpen(false);
    }
  };

  // Handle saving the current FAQ
  const handleSaveFAQ = () => {
    if (!currentFAQ.question.trim()) {
      alert('Please enter a question');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      if (isEditing) {
        // Update existing FAQ
        setFaqs(faqs.map(faq => 
          faq.id === currentFAQ.id ? currentFAQ : faq
        ));
      } else {
        // Add new FAQ with a new ID
        const newId = Math.max(0, ...faqs.map(faq => faq.id)) + 1;
        setFaqs([...faqs, { ...currentFAQ, id: newId }]);
      }

      setIsSaving(false);
      setSaveMessage(`FAQ ${isEditing ? 'updated' : 'added'} successfully!`);
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
        setIsAddPanelOpen(false);
      }, 3000);
    }, 1000);
  };

  // Handle canceling the add/edit operation
  const handleCancel = () => {
    setIsAddPanelOpen(false);
  };

  // Handle question input change
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFAQ({ ...currentFAQ, question: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add FAQ button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h1>
        {!isAddPanelOpen && (
          <button
            onClick={handleAddFAQ}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#41AFFF] hover:bg-[#2b9fe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF]"
          >
            Add FAQ
          </button>
        )}
      </div>

      {/* FAQ Table */}
      {!isAddPanelOpen && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S. No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Answer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <tr key={faq.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {faq.question}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                      <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={faq.enabled} 
                            onChange={() => handleToggleFAQ(faq.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#41AFFF]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#41AFFF]"></div>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditFAQ(faq)} className="text-[#41AFFF] hover:text-[#2b9fe8]">
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button onClick={() => handleDeleteFAQ(faq.id)} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit FAQ Panel */}
      {isAddPanelOpen && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</h2>
          
          {/* Question Input */}
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              id="question"
              value={currentFAQ.question}
              onChange={handleQuestionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#41AFFF] focus:border-[#41AFFF]"
              placeholder="Enter the question"
            />
          </div>

          {/* Answer Editor */}
          <div className="mb-8">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            {editor && (
              <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Bold"
                  >
                    <span className="font-bold">B</span>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Italic"
                  >
                    <span className="italic">I</span>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('underline') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Underline"
                  >
                    <span className="underline">U</span>
                  </button>
                  <span className="mx-1 text-gray-300">|</span>
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Numbered List"
                  >
                    1. List
                  </button>
                  <span className="mx-1 text-gray-300">|</span>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    title="Heading"
                  >
                    H3
                  </button>
                </div>
                <EditorContent editor={editor} className="min-h-[250px]" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveFAQ}
              disabled={isSaving}
              className={`flex items-center px-4 py-2 bg-[#41AFFF] text-white rounded-md hover:bg-[#2b9fe8] transition-colors duration-200 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon className="h-5 w-5 mr-2" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>

            {saveMessage && <span className="ml-4 text-green-600">{saveMessage}</span>}
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete this FAQ? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Toggle Status Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isToggleModalOpen}
        title="Confirm Status Change"
        message={`Are you sure you want to ${newStatus ? 'enable' : 'disable'} this FAQ?`}
        confirmText="Confirm"
        cancelText="Cancel"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        onConfirm={handleToggleConfirm}
        onCancel={() => setIsToggleModalOpen(false)}
      />
    </div>
  );
}