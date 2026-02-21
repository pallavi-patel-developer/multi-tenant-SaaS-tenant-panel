"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { FiPlus, FiEye, FiEdit2, FiFilter, FiCalendar } from 'react-icons/fi';

const dummyOrders = [
  { id: 'ORD-1024', customer: 'Alice Johnson', items: 3, total: '$145.00', status: 'Pending', created: '2023-11-20 10:30 AM' },
  { id: 'ORD-1023', customer: 'Bob Smith', items: 1, total: '$29.99', status: 'Completed', created: '2023-11-19 02:15 PM' },
  { id: 'ORD-1022', customer: 'Charlie Brown', items: 5, total: '$450.50', status: 'Processing', created: '2023-11-19 11:00 AM' },
  { id: 'ORD-1021', customer: 'David Lee', items: 2, total: '$89.00', status: 'Cancelled', created: '2023-11-18 05:45 PM' },
  { id: 'ORD-1020', customer: 'Eva Green', items: 4, total: '$210.00', status: 'Completed', created: '2023-11-18 09:10 AM' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(dummyOrders);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Processing': return 'primary';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'danger';
      default: return 'neutral';
    }
  };

  const columns = [
    { header: 'Order ID', accessor: 'id', render: (row) => <span className="font-medium text-indigo-600">{row.id}</span> },
    { header: 'Customer', accessor: 'customer', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.customer}</span> },
    { header: 'Items', accessor: 'items' },
    { header: 'Total Amount', accessor: 'total' },
    { header: 'Status', accessor: 'status', render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge> },
    { header: 'Created At', accessor: 'created' },
  ];

  const actions = (row) => (
    <>
      <button className="text-gray-500 hover:text-indigo-600"><FiEye size={18} /></button>
      <button className="text-gray-500 hover:text-blue-600"><FiEdit2 size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Order Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track customer orders</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiCalendar /> Date Range
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiFilter /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiPlus /> Create Order
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={orders} actions={actions} />
    </div>
  );
}
