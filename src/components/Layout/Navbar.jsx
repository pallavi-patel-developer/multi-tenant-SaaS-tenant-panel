"use client";
import React from 'react';
import { FiBell, FiSearch, FiMenu } from 'react-icons/fi';

const Navbar = ({ isSidebarCollapsed, toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <FiMenu size={20} />
        </button>
        <span className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
          My Awesome Store
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-800">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Jane Tenant</p>
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Owner
            </span>
          </div>
          <div className="h-9 w-9 overflow-hidden rounded-full bg-indigo-600">
            {/* Placeholder Avatar */}
            <div className="h-full w-full flex items-center justify-center text-white text-sm font-bold">JT</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
