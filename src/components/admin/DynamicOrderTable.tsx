/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import OrderModal from './OrderModal';
import { deleteOrder } from '@/actions/adminActions';
import toast, { Toaster } from 'react-hot-toast';

// Define the Order type interface for flexibility
export interface Order {
  [key: string]: any;
}

// Main component: displays and manages dynamic table of orders
export default function DynamicOrderTable({
  orders,
  refreshOrders,
}: {
  orders: Order[];
  refreshOrders: any;
}) {
  // State hooks for filters and modal handling
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [modalOpen, setModalOpen] = useState(false);

  // Modal open/close handlers
  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(undefined);
    setModalOpen(false);
  };

  // Order delete handler
  const handleDeleteOrder = async (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const res = await deleteOrder(id);
      if (res.error == false) {
        toast.success(res.response.msg);
      } else {
        toast.error(res.response.msg);
      }
      refreshOrders();
    }
  };
  // Fallback if no orders
  if (!orders || orders.length === 0)
    return <p className="text-gray-400 p-4">No orders found.</p>;

  // Extract headers dynamically (excluding some fields)
  const headers = Object.keys(orders[0]);

  // Define status badge colors
  const statusStyles = {
    approved: 'bg-green-600/80 text-white',
    rejected: 'bg-red-600/80 text-white',
    pending: 'bg-yellow-600/80 text-white',
    new: 'bg-blue-600/80 text-white',
  };

  return (
    <div className="p-4 min-h-screen text-gray-200">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="design">Design</option>
            <option value="printing">Printing</option>
          </select>
        </div>
      </div>
      <div className=" p-6 bg-gray-900 rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              {headers
                .filter(
                  (key) =>
                    key !== '_id' &&
                    key !== 'functionalityDescription' &&
                    key !== 'functionalityType' &&
                    key !== 'dimensions' &&
                    key !== 'cost' &&
                    key !== 'description' &&
                    key !== 'file' &&
                    key !== 'material'
                )
                .map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-gray-400 uppercase text-xs"
                  >
                    {key}
                  </th>
                ))}
              <th className="px-4 py-2 text-gray-400 uppercase text-xs">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {orders
              .filter(
                (order) =>
                  (!status || order.status === status) &&
                  (!type || order.type === type) &&
                  (!date ||
                    new Date(order.date).toLocaleDateString('en-US') ===
                      new Date(date).toLocaleDateString('en-US'))
              )
              // Sort orders by date descending
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              // Render each order row
              .map((order, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  {headers
                    .filter(
                      (key) =>
                        key !== '_id' &&
                        key !== 'functionalityDescription' &&
                        key !== 'functionalityType' &&
                        key !== 'dimensions' &&
                        key !== 'cost' &&
                        key !== 'description' &&
                        key !== 'file' &&
                        key !== 'material'
                    )
                    .map((key) => {
                      const value = order[key];
                      if (key === 'file' && value) {
                        return (
                          <td
                            key={key}
                            className="px-4 py-2 border border-gray-700 text-blue-400"
                          >
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          </td>
                        );
                      }
                      if (key === 'status') {
                        return (
                          <td key={key} className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                statusStyles[
                                  value as keyof typeof statusStyles
                                ] || 'bg-gray-500 text-white'
                              }`}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      }
                      if (key === 'date') {
                        const formattedDate = new Date(
                          value
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        });
                        return (
                          <td key={key} className="px-4 py-2">
                            {formattedDate}
                          </td>
                        );
                      }
                      if (value === null) {
                        return (
                          <td
                            key={key}
                            className="px-4 py-2  italic text-gray-400"
                          >
                            N/A
                          </td>
                        );
                      }
                      if (typeof value === 'boolean') {
                        return (
                          <td key={key} className="px-4 py-2 ">
                            {value ? 'Yes' : 'No'}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={key}
                          className="px-4 py-2 overflow-y-auto max-w-[300px] whitespace-nowrap h-[100px]"
                        >
                          {value}
                        </td>
                      );
                    })}
                  <td className="px-4 pt-10 flex items-center gap-4">
                    {/* View and Delete buttons */}
                    <button
                      onClick={() => openModal(order)}
                      aria-label="View details"
                      className="text-gray-400 hover:text-white px-1"
                    >
                      <Eye size={22} />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      aria-label="Delete user"
                      className="text-red-500 hover:text-red-600 px-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Show order details in modal */}
        {modalOpen && selectedOrder && (
          <OrderModal
            closeModal={closeModal}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            refreshOrders={refreshOrders}
          />
        )}
      </div>
    </div>
  );
}
