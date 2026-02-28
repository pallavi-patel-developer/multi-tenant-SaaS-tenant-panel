"use client";
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { FiShoppingBag, FiDollarSign, FiClock, FiAlertCircle } from 'react-icons/fi';
import Card from '@/components/ui/Card';

const metrics = [
  { title: "Total Orders (Today)", value: "24", icon: FiShoppingBag, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  { title: "Total Revenue (Today)", value: "$1,240", icon: FiDollarSign, color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
  { title: "Pending Orders", value: "8", icon: FiClock, color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" },
  { title: "Low Stock Items", value: "3", icon: FiAlertCircle, color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400" },
];

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const orderStatusData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Processing', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ef4444'];

const recentActivity = [
  { id: 1, type: "New Order", user: "John Doe", action: "Placed order #1023", time: "2 mins ago" },
  { id: 2, type: "Stock Alert", user: "System", action: "Product #45 low stock", time: "1 hour ago" },
  { id: 3, type: "Payment", user: "Jane Smith", action: "Payment verified #1022", time: "2 hours ago" },
  { id: 4, type: "Staff", user: "Admin", action: "Updated inventory", time: "4 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`rounded-full p-3 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Trend */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Revenue Trend (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueTenant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenueTenant)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Order Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Activity Type</th>
                <th className="px-6 py-3">Performed By</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3 rounded-r-lg">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentActivity.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.type}</td>
                  <td className="px-6 py-4">{item.user}</td>
                  <td className="px-6 py-4">{item.action}</td>
                  <td className="px-6 py-4 text-gray-400">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
