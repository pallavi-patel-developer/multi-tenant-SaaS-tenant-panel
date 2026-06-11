"use client";
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiRefreshCw } from 'react-icons/fi';
import Modal from '../../components/ui/Modal';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('In Stock');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name, category, price: Number(price), stock: Number(stock), status
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setName(''); setCategory(''); setPrice(''); setStock(''); setStatus('In Stock');
        fetchProducts();
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch(`http://localhost:5001/api/v1/tenant/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiBriefcase className="text-indigo-600 dark:text-indigo-400" />
          Product Catalog
        </h1>
        <div className="flex gap-2">
          <button onClick={fetchProducts} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
            <FiPlus /> Add Product
          </button>
        </div>
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
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">{product._id.substring(0,8)}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">${product.price}</td>
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
                    <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !isLoading && (
                <tr><td colSpan="7" className="text-center py-4">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
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
