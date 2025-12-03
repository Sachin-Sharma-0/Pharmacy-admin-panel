"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import LogoutButton from '../common/LogoutButton';
import Link from 'next/link';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-pacifico text-[#41AFFF] ml-2">Oraglan</h1>
            <h1 className="text-l font-pacifico text-[#41AFFF] font-bold ml-3 mt-3">Admin Panel</h1>
          </div>
        </div>

        <div className="flex items-center">
          {/* Logout Button */}
          <div className="mr-4">
            <LogoutButton />
          </div>
          
          {/* Notification bell */}
          <button
            type="button"
            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <header className="sticky top-0 z-50 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-pacifico text-[#41AFFF] ml-2">Oraglan</h1>
            <h1 className="text-l font-pacifico text-[#41AFFF] font-bold ml-3 mt-3">Admin Panel</h1>
          </div>
        </div>

        <div className="flex items-center">
          {/* Logout Button */}
          <div className="mr-4">
            <LogoutButton />
          </div>
          
          {/* Notification bell */}
          <button
            type="button"
            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="ml-2 hidden md:flex items-center">
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const ProfileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        id="user-menu-button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="ml-2 hidden md:flex items-center">
          <span className="text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
          <div className="px-2 py-1">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};