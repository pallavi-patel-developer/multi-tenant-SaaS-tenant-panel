"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome, FiShoppingBag, FiBox, FiUsers, FiBarChart2, FiActivity, FiSettings, FiLogOut, FiMenu
} from 'react-icons/fi';
import clsx from 'clsx';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const pathname = usePathname();

  const navItems = [
    { icon: FiHome, href: '/dashboard', label: 'Dashboard' },
    { icon: FiShoppingBag, href: '/orders', label: 'Orders' },
    { icon: FiBox, href: '/inventory', label: 'Inventory' },
    { icon: FiUsers, href: '/staff', label: 'Staff' },
    { icon: FiBarChart2, href: '/reports', label: 'Reports' },
    { icon: FiActivity, href: '/audit-logs', label: 'Audit Logs' },
    { icon: FiSettings, href: '/settings', label: 'Settings' },
  ];

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white text-gray-600 transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-100 dark:border-gray-800">
        <div className={clsx("flex items-center gap-3 overflow-hidden transition-all", isCollapsed && "justify-center w-full")}>
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            T
          </div>
          {!isCollapsed && <span className="font-bold text-lg whitespace-nowrap text-gray-800 dark:text-white">TenantPanel</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ""}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 group relative",
                isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                  : "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              )}
            >
              <item.icon
                size={20}
                className={clsx("shrink-0", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300")}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.label}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button className={clsx(
          "flex w-full items-center gap-3 rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors",
          isCollapsed ? "justify-center" : ""
        )}>
          <FiLogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
