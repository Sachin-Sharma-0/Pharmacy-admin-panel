"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { pacifico, poppins } from './fonts';
import "./globals.css";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Client components don't support metadata - it should be in a separate layout file if needed

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const pathname = usePathname();
  
  // Check if current path is login page
  const isLoginPage = pathname === '/login' || pathname === '/login/';

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize !== undefined) {
      setSidebarOpen(screenSize >= 768);
    }
  }, [screenSize]);

  // Auto-collapse sidebar when a path changes
  useEffect(() => {
    setSidebarCollapsed(true);
    setIsHovering(false);
  }, [pathname]);
  
  // Handle mouse enter/leave for sidebar hover effect
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Auto-collapse when mouse leaves
    setSidebarCollapsed(true);
  };

  // We don't need a toggle function anymore as sidebar will expand on hover and collapse automatically

  return (
    <html lang="en">
      <head>
        {/* No need for external font link as we're using Next.js font loading */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${pacifico.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {isLoginPage ? (
          // Login page layout without sidebar and header
          <div className="flex h-screen overflow-hidden overflow-x-hidden bg-gray-50">
            <div className="flex flex-1 flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        ) : (
          // Admin panel layout with header above sidebar
          <div className="flex flex-col h-screen overflow-hidden overflow-x-hidden bg-gray-50">
            {/* Header at the top */}
            <Header setSidebarOpen={setSidebarOpen} />
            
            <div className="flex flex-1 overflow-hidden relative">
              {/* Mobile sidebar backdrop */}
              <div 
                className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'}`} 
                onClick={() => setSidebarOpen(false)} 
              />

              {/* Sidebar for mobile and desktop */}
              <div 
                className={`fixed top-16 bottom-0 left-0 z-40 transform transition ${sidebarOpen ? 'translate-x-0 ease-out duration-300' : '-translate-x-full ease-in duration-200'}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={`h-full flex flex-col overflow-y-auto bg-white shadow-xl transition-width duration-300 ${(!sidebarCollapsed || isHovering) ? 'w-56' : 'w-14'}`}
                >
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
                  
                  <Sidebar collapsed={sidebarCollapsed && !isHovering} />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-hidden overflow-x-hidden transition-all duration-300 ml-0 md:ml-14">
                <main className="h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-gray-50">
                  {children}
                </main>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
