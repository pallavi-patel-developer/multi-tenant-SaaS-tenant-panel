"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('Pending');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          totalAmount: Number(totalAmount),
          status,
          items: [{ productName: "Sample Item", quantity: 1, price: Number(totalAmount) }]
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setCustomerName('');
        setCustomerEmail('');
        setTotalAmount('');
        setStatus('Pending');
        fetchOrders();
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch(`http://localhost:5001/api/v1/tenant/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

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
    { header: 'Order ID', accessor: '_id', render: (row) => <span className="font-medium text-indigo-600">{row._id.substring(0,8)}</span> },
    { header: 'Customer', accessor: 'customerName', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.customerName}</span> },
    { header: 'Email', accessor: 'customerEmail' },
    { header: 'Total Amount', accessor: 'totalAmount', render: (row) => `$${row.totalAmount}` },
    { header: 'Status', accessor: 'status', render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge> },
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
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Order Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track customer orders</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={fetchOrders} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiPlus /> Create Order
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={orders} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Order">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
            <input required type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Email</label>
            <input required type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount ($)</label>
            <input required type="number" min="0" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save Order</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
