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
  BanknotesIcon
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
      { name: 'On Hold', href: '/vendor-management/on-hold' },
      { name: 'Rejected Vendors', href: '/vendor-management/rejected' }
    ]
  },
  { 
    name: 'Prescription', 
    href: '/prescription', 
    icon: ClipboardDocumentListIcon,
    subItems: [
      { name: 'Accepted', href: '/prescription/accepted' },
      { name: 'Declined', href: '/prescription/declined' },
      { name: 'Rejected', href: '/prescription/rejected' }
    ]
  },
  { name: 'Products', href: '/products', icon: CubeIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Riders', href: '/riders', icon: TruckIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { 
    name: 'Finance & Accounting', 
    href: '/finance', 
    icon: BanknotesIcon,
    subItems: [
      { name: 'Vendor Subscriptions', href: '/finance/vendor-subscriptions' },
      { name: 'Vendor Payouts on Products', href: '/finance/vendor-payouts' },
      { name: 'Rider Payouts', href: '/finance/rider-payouts' },
      { name: 'Platform Fees', href: '/finance/platform-fees' }
    ]
  },
  { 
    name: 'E-commerce Management', 
    href: '/ecommerce', 
    icon: ShoppingCartIcon,
    subItems: [
      { name: 'Categories', href: '/ecommerce/categories' },
      { name: 'Coupons', href: '/ecommerce/coupons' }
    ]
  },
  { 
    name: 'Content Management', 
    href: '/cms', 
    icon: DocumentChartBarIcon,
    subItems: [
      { name: 'List', href: '/cms/list' },
      { name: 'Privacy Policy', href: '/cms/privacy-policy' },
      { name: 'Terms and Conditions', href: '/cms/terms-conditions' },
      { name: 'About Us', href: '/cms/about-us' },
      { name: 'FAQ', href: '/cms/faq' },
      { name: 'Banners', href: '/cms/banners' }
    ]
  },
  { 
    name: 'Customer Service', 
    href: '/customer-service', 
    icon: TicketIcon
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
    'Finance & Accounting': false,
    'Admin Management': false,
    'Prescription': false,
    'Content Management': false,
    'E-commerce Management': false
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
    // Close all other dropdowns when opening a new one
    setExpandedItems(prev => {
      const newState = {...prev};
      
      // If we're opening this dropdown, close all others
      if (!prev[itemName]) {
        Object.keys(newState).forEach(key => {
          newState[key] = false;
        });
      }
      
      // Toggle the clicked dropdown
      newState[itemName] = !prev[itemName];
      return newState;
    });
  };

  // Render a navigation item with its subitems if expanded
  const renderNavItem = (item: NavigationItem) => {
    // Check if this exact path matches the item's href
    const isExactMatch = pathname === item.href;
    // Check if this path is within the section (starts with item's href + '/')
    const isWithinSection = pathname?.startsWith(item.href + '/');
    // Check if any of the subitems match the current path
    const hasSubItemMatch = item.subItems?.some(subItem => pathname === subItem.href || pathname?.startsWith(subItem.href + '/'));
    // Only highlight the parent if it's an exact match or if it has no subitems
    // For admin and vendor management, don't highlight the parent if we're on a subpage
    const isActive = isExactMatch || (isWithinSection && !(item.subItems && item.subItems.length > 0));
    // Don't highlight the parent item if we're on a subpage for admin or vendor management
    const isParentActive = (item.name === 'Admin Management' || item.name === 'Vendor Management') 
      ? isExactMatch 
      : isActive;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.name];
    
    return (
      <div key={item.name} className="mb-1">
        {/* Main navigation item */}
        {hasSubItems ? (
          <div 
            className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-150 ease-in-out cursor-pointer
              ${isParentActive && !hasSubItemMatch 
                ? 'bg-[#41AFFF] text-white font-medium' 
                : 'text-black hover:bg-gray-100 hover:text-black'}
            `}
            onClick={() => toggleExpand(item.name, item)}
          >
            <div className="flex items-center">
              <item.icon 
                className={`h-5 w-5 flex-shrink-0 ${isParentActive && !hasSubItemMatch ? 'text-white' : 'text-black opacity-80 group-hover:opacity-100'}`} 
                aria-hidden="true" 
              />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              {collapsed && (
                <span className="sr-only">{item.name}</span>
              )}
            </div>
            
            {/* Removed chevron icons as per requirements */}
          </div>
        ) : (
          <Link
            href={item.href}
            className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-150 ease-in-out
              ${isParentActive 
                ? 'bg-[#41AFFF] text-white font-medium' 
                : 'text-black hover:bg-gray-100 hover:text-black'}
            `}
          >
            <div className="flex items-center">
              <item.icon 
                className={`h-5 w-5 flex-shrink-0 ${isParentActive ? 'text-white' : 'text-black opacity-80 group-hover:opacity-100'}`} 
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