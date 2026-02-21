"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { FiPlus, FiEdit2, FiUserX } from 'react-icons/fi';

const dummyStaff = [
  { id: 'STF-001', name: 'Jane Tenant', email: 'jane@store.com', role: 'Owner', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'STF-002', name: 'Mark Wilson', email: 'mark@store.com', role: 'Manager', status: 'Active', lastLogin: '1 day ago' },
  { id: 'STF-003', name: 'Sarah Connor', email: 'sarah@store.com', role: 'Staff', status: 'Inactive', lastLogin: '1 week ago' },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(dummyStaff);

  const getRoleVariant = (role) => {
    switch (role) {
      case 'Owner': return 'primary';
      case 'Manager': return 'success';
      default: return 'neutral';
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role', render: (row) => <Badge variant={getRoleVariant(row.role)}>{row.role}</Badge> },
    {
      header: 'Status', accessor: 'status', render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.status === 'Active' ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Last Login', accessor: 'lastLogin' },
  ];

  const actions = (row) => (
    <>
      <button className="text-gray-500 hover:text-blue-600"><FiEdit2 size={18} /></button>
      <button className="text-gray-500 hover:text-red-600"><FiUserX size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Staff Management</h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <FiPlus /> Add Staff
        </button>
      </div>

      <DataTable columns={columns} data={staff} actions={actions} />
    </div>
  );
}
