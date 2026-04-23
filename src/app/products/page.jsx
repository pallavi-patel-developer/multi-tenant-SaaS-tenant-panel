"use client";
import React from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from 'react-icons/fi';

const mockProducts = [
  { id: "PRD-001", name: "Premium Coffee Beans", category: "Beverages", price: "$15.99", stock: 142, status: "In Stock" },
  { id: "PRD-002", name: "Ceramic Mug", category: "Kitchenware", price: "$8.50", stock: 0, status: "Out of Stock" },
  { id: "PRD-003", name: "Espresso Machine", category: "Appliances", price: "$299.99", stock: 5, status: "Low Stock" },
  { id: "PRD-004", name: "Organic Green Tea", category: "Beverages", price: "$12.00", stock: 89, status: "In Stock" },
  { id: "PRD-005", name: "French Press", category: "Kitchenware", price: "$24.99", stock: 34, status: "In Stock" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiBriefcase className="text-indigo-600 dark:text-indigo-400" />
          Product Catalog
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
          <FiPlus /> Add Product
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Product ID</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">{product.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${product.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                      ${product.status === 'Out of Stock' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors mr-3">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
