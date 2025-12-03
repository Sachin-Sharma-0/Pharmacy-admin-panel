'use client'; // Required for client-side components in Next.js App Router

import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon as SaveIcon, BoldIcon, ItalicIcon, UnderlineIcon, ListBulletIcon, QueueListIcon, DocumentTextIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon } from '@heroicons/react/24/solid';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

// Sample privacy policy content in HTML format (converted from markdown)
const samplePrivacyPolicy = `
  <h1>Privacy Policy</h1>
  <p><strong>Last updated: June 1, 2023</strong></p>
  <h2>1. Introduction</h2>
  <p>Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our services.</p>
  <h2>2. Information We Collect</h2>
  <p>We may collect the following types of information:</p>
  <ul>
    <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, and payment details.</li>
    <li><strong>Usage Data:</strong> Information about how you interact with our website, including browsing history, clicks, and time spent on pages.</li>
    <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
    <li><strong>Location Data:</strong> General location information based on IP address or more precise location if you grant permission.</li>
  </ul>
  <h2>3. How We Use Your Information</h2>
  <p>We use your information for the following purposes:</p>
  <ul>
    <li>To provide and maintain our services</li>
    <li>To process transactions and send related information</li>
    <li>To improve and personalize your experience</li>
    <li>To communicate with you about updates, promotions, and support</li>
    <li>To detect, prevent, and address technical issues and security threats</li>
  </ul>
  <h2>4. Data Sharing and Disclosure</h2>
  <p>We may share your information with:</p>
  <ul>
    <li><strong>Service Providers:</strong> Third-party companies that help us deliver our services</li>
    <li><strong>Business Partners:</strong> Trusted partners who help us provide and improve our services</li>
    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
  </ul>
  <h2>5. Data Security</h2>
  <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
  <h2>6. Your Rights</h2>
  <p>Depending on your location, you may have the right to:</p>
  <ul>
    <li>Access your personal information</li>
    <li>Correct inaccurate information</li>
    <li>Delete your information</li>
    <li>Object to or restrict processing of your information</li>
    <li>Data portability</li>
  </ul>
  <h2>7. Changes to This Policy</h2>
  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
  <h2>8. Contact Us</h2>
  <p>If you have any questions about this Privacy Policy, please contact us at: privacy@example.com</p>
`;

export default function PrivacyPolicyPage() {
  // State for editor content, saving state, and save message
  const [content, setContent] = useState(samplePrivacyPolicy);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes bold, italic, lists, headings, etc.
      Underline, // Adds underline feature
      Placeholder.configure({
        placeholder: 'Write your Privacy Policy content here...',
      }), // Adds placeholder for empty editor
    ],
    content: samplePrivacyPolicy, // Set initial content
    editable: true, // Allow editing
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Update content state on editor change
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none p-6 min-h-[600px] bg-white rounded-lg shadow-sm border border-gray-200',
      },
    },
  });

  // Load the sample content when the component mounts
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(samplePrivacyPolicy);
    }
  }, [editor]);

  // Handle save
  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call to save content (1.5 seconds as per your code)
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Privacy Policy saved successfully!');
      console.log('Saved content:', content);

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1500);
  };

  // Prevent rendering until editor is ready
  if (!editor) {
    return <p className="text-center text-gray-500">Loading Editor...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Privacy Policy</h1>

      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-gray-50 border border-gray-200 rounded-lg shadow-sm mb-4 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('bold') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          title="Bold"
        >
          <BoldIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('italic') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <ItalicIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('underline') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Underline"
        >
          <UnderlineIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Bullet List"
        >
          <ListBulletIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('orderedList') ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Numbered List"
        >
          <QueueListIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Heading 2"
        >
          <DocumentTextIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[#41AFFF] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Heading 3"
        >
          <DocumentTextIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-md bg-white text-gray-600 hover:bg-gray-100 transition-colors"
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-md bg-white text-gray-600 hover:bg-gray-100 transition-colors"
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <ArrowUturnRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Editor */}
      <div className="mb-6">
        <EditorContent editor={editor} />
      </div>

      {/* Save Button */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-4 py-2 bg-[#41AFFF] text-white rounded-md hover:bg-[#2b9fe8] transition-colors duration-200 ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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
              Save Changes
            </>
          )}
        </button>

        {saveMessage && <span className="ml-4 text-green-600">{saveMessage}</span>}
      </div>
    </div>
  );
}