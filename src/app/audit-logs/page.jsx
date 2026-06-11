"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import { FiSearch, FiCalendar, FiRefreshCw } from 'react-icons/fi';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setLogs(data.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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
    { header: 'Timestamp', accessor: 'createdAt', render: (row) => new Date(row.createdAt).toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Audit Logs</h1>
        <div className="flex gap-2">
          <button onClick={fetchLogs} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
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
