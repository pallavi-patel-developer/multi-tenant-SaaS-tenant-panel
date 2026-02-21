"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiAlertTriangle } from 'react-icons/fi';

const dummyProducts = [
  { id: 'PRD-001', name: 'Wireless Headphones', sku: 'WH-2023', category: 'Electronics', price: '$99.00', stock: 45, threshold: 10, status: 'In Stock' },
  { id: 'PRD-002', name: 'Ergonomic Mouse', sku: 'EM-500', category: 'Accessories', price: '$45.50', stock: 8, threshold: 15, status: 'Low Stock' },
  { id: 'PRD-003', name: 'Mechanical Keyboard', sku: 'MK-RGB', category: 'Electronics', price: '$120.00', stock: 0, threshold: 5, status: 'Out of Stock' },
  { id: 'PRD-004', name: 'USB-C Cable', sku: 'USB-C-2M', category: 'Accessories', price: '$12.99', stock: 150, threshold: 20, status: 'In Stock' },
  { id: 'PRD-005', name: 'Monitor Stand', sku: 'MS-ALU', category: 'Furniture', price: '$55.00', stock: 12, threshold: 10, status: 'In Stock' },
];

export default function InventoryPage() {
  const [products, setProducts] = useState(dummyProducts);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'neutral';
    }
  };

  const columns = [
    {
      header: 'Product Name', accessor: 'name', render: (row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
          <p className="text-xs text-gray-500">{row.category}</p>
        </div>
      )
    },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Price', accessor: 'price' },
    {
      header: 'Stock', accessor: 'stock', render: (row) => (
        <span className={row.stock <= row.threshold ? 'text-red-600 font-bold' : 'text-gray-700'}>
          {row.stock}
        </span>
      )
    },
    { header: 'Status', accessor: 'status', render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge> },
  ];

  const actions = (row) => (
    <>
      <button className="text-gray-500 hover:text-blue-600"><FiEdit2 size={18} /></button>
      <button className="text-gray-500 hover:text-red-600"><FiTrash2 size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Low Stock Alert */}
      <div className="rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              You have <span className="font-medium">2 items</span> running low on stock. Check the inventory below.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-10 rounded-lg border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={products} actions={actions} />
    </div>
  );
}
