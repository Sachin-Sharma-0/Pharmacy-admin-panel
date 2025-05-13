"use client";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { pacifico, poppins } from './fonts';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata can't be used in Client Components
//export const metadata = {
  //title: "Admin Panel | Dashboard",
  //description: "Admin panel for managing products, orders, customers, vendors, and riders",
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle window resize to expand sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for custom event to expand sidebar when a tab with subtabs is clicked
  useEffect(() => {
    const handleExpandSidebar = () => {
      if (sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    };

    document.addEventListener('expand-sidebar', handleExpandSidebar);
    
    return () => document.removeEventListener('expand-sidebar', handleExpandSidebar);
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <html lang="en">
      <head>
        {/* No need for external font link as we're using Next.js font loading */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${pacifico.variable} font-poppins antialiased`}
      >
        <div className="flex h-screen overflow-hidden bg-gray-50">
          {/* Mobile sidebar backdrop */}
          <div 
            className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'}`} 
            onClick={() => setSidebarOpen(false)} 
          />

          {/* Sidebar for mobile and desktop */}
          <div 
            className={`fixed inset-y-0 left-0 z-40 w-full max-w-xs transform transition md:relative md:translate-x-0 md:flex-shrink-0 ${sidebarOpen ? 'translate-x-0 ease-out duration-300' : '-translate-x-full ease-in duration-200'} ${sidebarCollapsed ? 'md:w-16' : 'md:w-56'}`}
          >
            <div className="relative flex h-full flex-col overflow-y-auto bg-slate-800 text-white shadow-xl">
              {/* Close button for mobile */}
              <div className="absolute top-0 right-0 -mr-12 pt-2 md:hidden z-50">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Sidebar header with brand */}
              <div className="flex items-center justify-between px-4 py-6">
                {!sidebarCollapsed && (
                  <div>
                    <h1 className="text-2xl font-pacifico text-[#41AFFF]">Oraglan</h1>
                    <p className="text-sm text-white opacity-80">Admin Panel</p>
                  </div>
                )}
                {sidebarCollapsed && (
                  <div className="mx-auto">
                    <span className="text-2xl font-pacifico text-[#41AFFF]">S</span>
                  </div>
                )}
                <button 
                  onClick={toggleSidebar}
                  className="hidden md:block rounded-full p-1 hover:bg-primary-800 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {sidebarCollapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    )}
                  </svg>
                </button>
              </div>
              <Sidebar collapsed={sidebarCollapsed} />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
