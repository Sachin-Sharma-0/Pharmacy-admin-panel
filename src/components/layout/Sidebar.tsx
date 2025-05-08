"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CubeIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  DocumentChartBarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: CubeIcon },
  { name: 'Inventory', href: '/inventory', icon: ClipboardDocumentListIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Vendors', href: '/vendors', icon: TruckIcon },
  { name: 'Riders', href: '/riders', icon: TruckIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                ${isActive 
                  ? 'bg-primary-800 text-white' 
                  : 'text-white hover:bg-primary-800 hover:text-white'}
              `}
            >
              <item.icon 
                className={`h-6 w-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-white opacity-80 group-hover:opacity-100'}`} 
                aria-hidden="true" 
              />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              {collapsed && (
                <span className="sr-only">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}