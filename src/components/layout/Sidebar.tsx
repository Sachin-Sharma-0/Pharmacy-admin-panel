"use client";
import React, { useState, useEffect } from 'react';
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
  UserCircleIcon,
  ShieldCheckIcon,
  TicketIcon,
  BanknotesIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Define navigation items with support for nested sub-items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { 
    name: 'Admin Management', 
    href: '/admin-management', 
    icon: ShieldCheckIcon,
    subItems: [
      { name: 'Manage Admins', href: '/admin-management' },
      { name: 'Permission Roles', href: '/admin-management/permission-roles' },
      { name: 'Create Permissions', href: '/admin-management/create-permissions' }
    ]
  },
  { 
    name: 'Vendor Management', 
    href: '/vendor-management', 
    icon: TruckIcon,
    subItems: [
      { name: 'All Vendors', href: '/vendor-management' },
      { name: 'Pending Approval', href: '/vendor-management/pending' },
      { name: 'Approved Vendors', href: '/vendor-management/approved' },
      { name: 'Suspended Vendors', href: '/vendor-management/suspended' }
    ]
  },
  { name: 'Products', href: '/products', icon: CubeIcon },
  { name: 'Inventory', href: '/inventory', icon: ClipboardDocumentListIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Riders', href: '/riders', icon: TruckIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon },
  { 
    name: 'Finance', 
    href: '/finance', 
    icon: BanknotesIcon,
    subItems: [
      { name: 'Revenue', href: '/finance/revenue' },
      { name: 'Payouts', href: '/finance/payouts' },
      { name: 'Refunds', href: '/finance/refunds' }
    ]
  },
  { 
    name: 'Customer Service', 
    href: '/customer-service', 
    icon: TicketIcon,
    subItems: [
      { name: 'All Tickets', href: '/customer-service' },
      { name: 'New Tickets', href: '/customer-service/new' },
      { name: 'In Progress', href: '/customer-service/in-progress' },
      { name: 'Resolved', href: '/customer-service/resolved' }
    ]
  },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

interface SidebarProps {
  collapsed?: boolean;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  subItems?: { name: string; href: string }[];
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'Vendor Management': false,
    'Customer Service': false,
    'Finance': false,
    'Admin Management': false
  });

  // Check if the current path is within a section to auto-expand that section
  useEffect(() => {
    navigation.forEach(item => {
      if (item.subItems && pathname.startsWith(item.href)) {
        setExpandedItems(prev => ({
          ...prev,
          [item.name]: true
        }));
      }
    });
  }, [pathname]);

  const toggleExpand = (itemName: string, item: NavigationItem) => {
    // If sidebar is collapsed and item has subitems, expand the sidebar
    if (collapsed && item.subItems && item.subItems.length > 0) {
      // We need to dispatch a custom event to notify the parent component
      const event = new CustomEvent('expand-sidebar', { detail: { itemName } });
      document.dispatchEvent(event);
    }
    
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const renderNavItem = (item: NavigationItem) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.name];
    
    return (
      <div key={item.name} className="mb-1">
        {/* Main navigation item */}
        {hasSubItems ? (
          <div 
            className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-150 ease-in-out cursor-pointer
              ${isActive 
                ? 'bg-[#41AFFF] text-white font-medium' 
                : 'text-black hover:bg-gray-100 hover:text-black'}
            `}
            onClick={() => toggleExpand(item.name, item)}
          >
            <div className="flex items-center">
              <item.icon 
                className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-black opacity-80 group-hover:opacity-100'}`} 
                aria-hidden="true" 
              />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              {collapsed && (
                <span className="sr-only">{item.name}</span>
              )}
            </div>
            
            {!collapsed && (
              <div className="flex items-center">
                {isExpanded ? (
                  <ChevronDownIcon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-black'}`} />
                ) : (
                  <ChevronRightIcon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-black'}`} />
                )}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-150 ease-in-out
              ${isActive 
                ? 'bg-[#41AFFF] text-white font-medium' 
                : 'text-black hover:bg-gray-100 hover:text-black'}
            `}
          >
            <div className="flex items-center">
              <item.icon 
                className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-black opacity-80 group-hover:opacity-100'}`} 
                aria-hidden="true" 
              />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              {collapsed && (
                <span className="sr-only">{item.name}</span>
              )}
            </div>
          </Link>
        )}
        
        {/* Sub-items */}
        {hasSubItems && isExpanded && !collapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems?.map((subItem) => {
              const isSubActive = pathname === subItem.href || pathname?.startsWith(subItem.href + '/');
              return (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={`flex items-center px-2 py-1.5 text-sm rounded-md transition-colors duration-150 ease-in-out
                    ${isSubActive 
                      ? 'bg-[#41AFFF] text-white font-medium' 
                      : 'text-black opacity-80 hover:bg-gray-100 hover:opacity-100'}
                  `}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-white' : 'bg-black opacity-70'} mr-2`}></div>
                  <span>{subItem.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navigation.map(renderNavItem)}
      </nav>
    </div>
  );
}