'use client'; // Required for client-side components in Next.js App Router

import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon as SaveIcon, BoldIcon, ItalicIcon, UnderlineIcon, ListBulletIcon, QueueListIcon, DocumentTextIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon } from '@heroicons/react/24/solid';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

// Sample about us content in HTML format
const sampleAboutUs = `
  <h1>About Our Company</h1>
  <p>Founded in 2010, our company has been at the forefront of innovation in the tech industry for over a decade.</p>
  <h2>Our Mission</h2>
  <p>We strive to create cutting-edge solutions that empower businesses and individuals to achieve their full potential in the digital age.</p>
  <h2>Our Team</h2>
  <p>Our diverse team of experts brings together decades of combined experience in software development, design, and business strategy.</p>
  <h3>Leadership</h3>
  <ul>
    <li><strong>John Smith</strong> - Chief Executive Officer</li>
    <li><strong>Jane Doe</strong> - Chief Technology Officer</li>
    <li><strong>Michael Johnson</strong> - Chief Operations Officer</li>
    <li><strong>Sarah Williams</strong> - Chief Marketing Officer</li>
  </ul>
  <h2>Our Values</h2>
  <ol>
    <li><strong>Innovation:</strong> We constantly push the boundaries of what's possible.</li>
    <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
    <li><strong>Collaboration:</strong> We believe in the power of teamwork and partnership.</li>
    <li><strong>Excellence:</strong> We are committed to delivering the highest quality in everything we do.</li>
    <li><strong>Customer Focus:</strong> Our customers' success is our success.</li>
  </ol>
  <h2>Our History</h2>
  <p>Since our founding, we've grown from a small startup to a global company with offices in 15 countries. Here are some key milestones in our journey:</p>
  <ul>
    <li><strong>2010:</strong> Company founded in a small garage by our visionary founders.</li>
    <li><strong>2012:</strong> Launched our first product, which quickly gained market traction.</li>
    <li><strong>2015:</strong> Expanded operations to Europe and Asia.</li>
    <li><strong>2018:</strong> Reached 1 million customers worldwide.</li>
    <li><strong>2020:</strong> Celebrated our 10-year anniversary and launched our most innovative product line.</li>
    <li><strong>2023:</strong> Continued global expansion with new offices and partnerships.</li>
  </ul>
  <h2>Contact Us</h2>
  <p>We'd love to hear from you! Reach out to us at:</p>
  <p>Email: info@example.com<br>Phone: (123) 456-7890<br>Address: 123 Tech Street, Innovation City, TC 12345</p>
`;

export default function AboutUsPage() {
  // State for editor content, saving state, and save message
  const [content, setContent] = useState(sampleAboutUs);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes bold, italic, lists, headings, etc.
      Underline, // Adds underline feature
      Placeholder.configure({
        placeholder: 'Write your About Us content here...',
      }), // Adds placeholder for empty editor
    ],
    content: sampleAboutUs, // Set initial content
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
      editor.commands.setContent(sampleAboutUs);
    }
  }, [editor]);

  // Handle save
  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call to save content
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('About Us page saved successfully!');
      console.log('Saved content:', content);

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  // Prevent rendering until editor is ready
  if (!editor) {
    return <p className="text-center text-gray-500">Loading Editor...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit About Us</h1>

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