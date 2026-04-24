"use client";
import React from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiTool } from 'react-icons/fi';

const mockBatches = [
  { id: "PRD-2024-001", product: "Paracetamol 500mg", stage: "Formulation", status: "In Progress", completion: "2026-05-10" },
  { id: "PRD-2024-002", product: "Amoxicillin 250mg", stage: "Packaging", status: "In Progress", completion: "2026-04-28" },
  { id: "PRD-2024-003", product: "Omeprazole 20mg", stage: "Quality Assurance", status: "Pending", completion: "2026-04-30" },
  { id: "PRD-2024-004", product: "Cetirizine 10mg", stage: "Dispatch", status: "Completed", completion: "2026-04-20" },
  { id: "PRD-2024-005", product: "Ibuprofen 400mg", stage: "Raw Materials", status: "Pending", completion: "2026-06-15" },
];

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiTool className="text-indigo-600 dark:text-indigo-400" />
          Production & Manufacturing
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
          <FiPlus /> New Batch
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Batch ID</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Current Stage</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Est. Completion</th>
                <th className="px-6 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{batch.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{batch.product}</td>
                  <td className="px-6 py-4">{batch.stage}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${batch.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${batch.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      ${batch.status === 'Pending' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                    `}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{batch.completion}</td>
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
