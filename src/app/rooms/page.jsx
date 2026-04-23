"use client";
import React from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdOutlineBedroomParent } from 'react-icons/md';

const mockRooms = [
  { id: 101, type: "Deluxe", status: "Available", price: "$150/night", capacity: "2 Adults" },
  { id: 102, type: "Suite", status: "Occupied", price: "$300/night", capacity: "4 Adults" },
  { id: 103, type: "Standard", status: "Maintenance", price: "$90/night", capacity: "2 Adults" },
  { id: 104, type: "Deluxe", status: "Available", price: "$150/night", capacity: "2 Adults" },
  { id: 105, type: "Suite", status: "Available", price: "$300/night", capacity: "4 Adults" },
];

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <MdOutlineBedroomParent className="text-indigo-600 dark:text-indigo-400" />
          Room Management
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
          <FiPlus /> Add Room
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Room No.</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{room.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{room.type}</td>
                  <td className="px-6 py-4">{room.capacity}</td>
                  <td className="px-6 py-4">{room.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${room.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${room.status === 'Occupied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      ${room.status === 'Maintenance' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                    `}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors mr-3">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
