"use client";
import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { FiDollarSign, FiShoppingBag, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';

export default function ReportsPage() {
  const [data, setData] = useState({ metrics: {}, revenueData: [], topProducts: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('tenant_token');
      const res = await fetch('http://localhost:5001/api/v1/tenant/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) setData(result.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const metricsArray = [
    { title: "Total Revenue", value: data.metrics.totalRevenue || "$0.00", icon: FiDollarSign, change: "+12.5%", color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400" },
    { title: "Total Orders", value: data.metrics.totalOrders || "0", icon: FiShoppingBag, change: "+8.2%", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
    { title: "Avg. Order Value", value: data.metrics.avgOrderValue || "$0.00", icon: FiTrendingUp, change: "+5.1%", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h1>
        <div className="flex gap-2">
          <button onClick={fetchReports} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {metricsArray.map((metric, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-green-500">{metric.change}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Revenue & Orders</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueData}>
                <defs>
                  <linearGradient id="colorRevenueReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenueReports)" />
                <Area type="monotone" dataKey="orders" stroke="#10b981" fillOpacity={0} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Top Selling Products</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.1} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
