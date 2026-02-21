"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { FiSearch, FiCalendar } from 'react-icons/fi';

const dummyLogs = [
  { id: 1, user: 'Jane Tenant', role: 'Owner', action: 'Updated Settings', entity: 'Store Config', entityId: 'N/A', time: '2023-11-20 14:30' },
  { id: 2, user: 'Mark Wilson', role: 'Manager', action: 'Created Product', entity: 'Product', entityId: 'PRD-005', time: '2023-11-20 11:15' },
  { id: 3, user: 'Jane Tenant', role: 'Owner', action: 'Exported Reports', entity: 'Report', entityId: 'REP-2023-10', time: '2023-11-19 16:45' },
  { id: 4, user: 'Sarah Connor', role: 'Staff', action: 'Processed Order', entity: 'Order', entityId: 'ORD-1022', time: '2023-11-19 09:20' },
  { id: 5, user: 'System', role: 'System', action: 'Cron Job', entity: 'Inventory Sync', entityId: 'JOB-55', time: '2023-11-19 00:00' },
];

export default function AuditLogsPage() {
  const [logs] = useState(dummyLogs);

  const columns = [
    {
      header: 'User', accessor: 'user', render: (row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.user}</p>
          <span className="text-xs text-gray-500">{row.role}</span>
        </div>
      )
    },
    { header: 'Action', accessor: 'action', render: (row) => <span className="font-medium text-indigo-600">{row.action}</span> },
    { header: 'Entity Type', accessor: 'entity' },
    { header: 'Entity ID', accessor: 'entityId' },
    { header: 'Timestamp', accessor: 'time' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Audit Logs</h1>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="h-10 rounded-lg border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiCalendar /> Date Range
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={logs} />
    </div>
  );
}
