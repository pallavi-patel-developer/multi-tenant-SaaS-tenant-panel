"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Staff');
  const [status, setStatus] = useState('Active');

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/staff', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setStaff(data.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, role, status })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setName(''); setEmail(''); setRole('Staff'); setStatus('Active');
        fetchStaff();
      }
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return;
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch(`http://localhost:5001/api/v1/tenant/staff/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

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
    { header: 'Created At', accessor: 'createdAt', render: (row) => new Date(row.createdAt).toLocaleDateString() },
  ];

  const actions = (row) => (
    <>
      <button onClick={() => handleDelete(row._id)} className="text-gray-500 hover:text-red-600"><FiTrash2 size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Staff Management</h1>
        <div className="flex gap-2">
          <button onClick={fetchStaff} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiPlus /> Add Staff
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={staff} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Staff Member">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
