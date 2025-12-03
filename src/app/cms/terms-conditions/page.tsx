'use client'; // Required for client-side components in Next.js App Router

import React, { useState, useEffect } from 'react';
import {
  ArrowDownTrayIcon as SaveIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  QueueListIcon,
  DocumentTextIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/solid'; // Correct import path
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';


// Sample terms and conditions content in HTML format (converted from markdown)
const sampleTermsConditions = `
  <h1>Terms and Conditions</h1>
  <p><strong>Last updated: June 1, 2025</strong></p>
  <h2>1. Introduction</h2>
  <p>Welcome to our platform. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.</p>
  <h2>2. Definitions</h2>
  <p>In these Terms:</p>
  <ul>
    <li><strong>"Company", "we", "us", or "our"</strong> refers to [Company Name].</li>
    <li><strong>"Service"</strong> refers to the website and all services provided by the Company.</li>
    <li><strong>"User", "you", or "your"</strong> refers to the individual accessing or using the Service.</li>
    <li><strong>"Terms"</strong> refers to these Terms and Conditions.</li>
  </ul>
  <h2>3. Account Registration</h2>
  <p>To use certain features of our Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
  <h2>4. User Responsibilities</h2>
  <p>When using our Service, you agree to:</p>
  <ul>
    <li>Comply with all applicable laws and regulations</li>
    <li>Not violate the rights of others</li>
    <li>Not distribute malware or engage in harmful activities</li>
    <li>Not attempt to gain unauthorized access to our systems</li>
    <li>Not interfere with the proper functioning of the Service</li>
  </ul>
  <h2>5. Intellectual Property</h2>
  <p>The Service and its original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
  <h2>6. Limitation of Liability</h2>
  <p>To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the Service.</p>
  <h2>7. Termination</h2>
  <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
  <h2>8. Changes to Terms</h2>
  <p>We reserve the right to modify or replace these Terms at any time.</p>
  <h2>9. Governing Law</h2>
  <p>These Terms shall be governed by and construed in accordance with the laws of [Your State], without regard to its laws provisions.</p>
  <h2>10. Contact Us</h2>
  <p>If you have any questions about these Terms, please contact us at: terms@example.com</p>
`;

export default function TermsConditionsPage() {
  // State for content, saving state, and save message
  const [content, setContent] = useState(sampleTermsConditions);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes bold, italic, lists, headings, etc.
      Underline, // Adds underline feature
      Placeholder.configure({
        placeholder: 'Write your Terms and Conditions content here...',
      }), // Adds placeholder for empty editor
    ],
    content: sampleTermsConditions, // Set initial content
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
      editor.commands.setContent(sampleTermsConditions);
    }
  }, [editor]);

  // Handle save
  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call to save content (1.5 seconds as per your code)
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Terms and Conditions saved successfully!');
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
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Terms and Conditions</h1>

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