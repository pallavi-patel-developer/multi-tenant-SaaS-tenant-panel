"use client";
import React from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdOutlineLocalPharmacy } from 'react-icons/md';

const mockDrugs = [
  { id: "DRG-1001", name: "Paracetamol 500mg", category: "Analgesic", stock: 1200, expiry: "2027-10-15", price: "$0.05/pill", status: "In Stock" },
  { id: "DRG-1002", name: "Amoxicillin 250mg", category: "Antibiotic", stock: 50, expiry: "2026-11-20", price: "$0.20/pill", status: "Low Stock" },
  { id: "DRG-1003", name: "Omeprazole 20mg", category: "Antacid", stock: 0, expiry: "2024-01-10", price: "$0.30/pill", status: "Expired" },
  { id: "DRG-1004", name: "Cetirizine 10mg", category: "Antihistamine", stock: 850, expiry: "2028-05-05", price: "$0.10/pill", status: "In Stock" },
  { id: "DRG-1005", name: "Ibuprofen 400mg", category: "NSAID", stock: 300, expiry: "2026-08-12", price: "$0.15/pill", status: "In Stock" },
];

export default function PharmacyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <MdOutlineLocalPharmacy className="text-indigo-600 dark:text-indigo-400" />
          Pharmacy Inventory
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
          <FiPlus /> Add Drug
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Drug ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Expiry Date</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockDrugs.map((drug) => (
                <tr key={drug.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{drug.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{drug.name}</td>
                  <td className="px-6 py-4">{drug.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{drug.stock}</td>
                  <td className="px-6 py-4">{drug.expiry}</td>
                  <td className="px-6 py-4">{drug.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${drug.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${drug.status === 'Low Stock' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                      ${drug.status === 'Expired' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                    `}>
                      {drug.status}
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
