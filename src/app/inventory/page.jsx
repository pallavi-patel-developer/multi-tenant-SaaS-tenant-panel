"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { FiPlus, FiTrash2, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [threshold, setThreshold] = useState('10');

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name, sku, category, price: Number(price), stock: Number(stock), threshold: Number(threshold)
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setName(''); setSku(''); setCategory(''); setPrice(''); setStock(''); setThreshold('10');
        fetchInventory();
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch(`http://localhost:5001/api/v1/tenant/inventory/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchInventory();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
    { header: 'Price', accessor: 'price', render: (row) => `$${row.price}` },
    {
      header: 'Stock', accessor: 'stock', render: (row) => (
        <span className={row.stock <= row.threshold ? 'text-red-600 font-bold' : 'text-gray-700 dark:text-gray-300'}>
          {row.stock}
        </span>
      )
    },
    { header: 'Status', accessor: 'status', render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge> },
  ];

  const actions = (row) => (
    <>
      <button onClick={() => handleDelete(row._id)} className="text-gray-500 hover:text-red-600"><FiTrash2 size={18} /></button>
    </>
  );

  const lowStockCount = products.filter(p => p.stock <= p.threshold).length;

  return (
    <div className="space-y-6">
      {lowStockCount > 0 && (
        <div className="rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                You have <span className="font-medium">{lowStockCount} items</span> running low on stock.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
        <div className="flex gap-2">
          <button onClick={fetchInventory} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={products} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
            <input required type="text" value={sku} onChange={e => setSku(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
            <input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
            <input required type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Low Stock Threshold</label>
            <input required type="number" min="0" value={threshold} onChange={e => setThreshold(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save Product</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
