/* eslint-disable @typescript-eslint/no-explicit-any */
//Modal Component for present the details of an order
import React, { Dispatch } from 'react';
import { Order } from './DynamicOrderTable';
import { handleSendRecivedEmail, updateOrder } from '@/actions/adminActions';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type OrderModalProps = {
  closeModal: () => void;
  selectedOrder: Order;
  setSelectedOrder: Dispatch<React.SetStateAction<Order>>;
  refreshOrders: () => void;
};

export default function OrderModal({
  closeModal,
  selectedOrder,
  setSelectedOrder,
  refreshOrders,
}: OrderModalProps) {
  //Function for handle the change in the state select or cost input
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Function for manage send a recived order notification to the client and update the order to pending
  const handleRecivedEmail = async () => {
    const res = await handleSendRecivedEmail(selectedOrder);
    if (res.error === false) {
      toast.success(res.response.msg);
    } else {
      toast.error(res.response.msg);
    }
    const updatedOrder = { ...selectedOrder, status: 'pending' };
    setSelectedOrder(updatedOrder);
    const updateRes = await updateOrder(updatedOrder);
    if (updateRes.error === false) {
      toast.success(updateRes.response.msg);
    } else {
      toast.error(updateRes.response.msg);
    }
    refreshOrders();
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  //Function for manage updating a order information as the status or cost
  const handleUpdateOrder = async () => {
    const res = await updateOrder(selectedOrder);
    if (res.error === false) {
      toast.success(res.response.msg);
    } else {
      toast.error(res.response.msg);
    }
    refreshOrders();
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 z-50 bg-black/60 bg-opacity-60 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full text-white overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between text-2xl font-bold mb-6 border-b border-gray-600 pb-2">
            <h2 className="">Order Details</h2>
            <h2 className="uppercase">{selectedOrder.type}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="font-semibold">{selectedOrder.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <Link href={`mailto:${selectedOrder.email}`}>
                {selectedOrder.email}
              </Link>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <a href={`tel:${selectedOrder.phone}`}>{selectedOrder.phone}</a>
            </div>

            <div>
              <p className="text-gray-400">Dimensions</p>
              <p className="font-semibold">
                {selectedOrder.dimensions || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-semibold">
                {selectedOrder.date
                  ? new Date(selectedOrder.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Material</p>
              <p className="font-semibold">{selectedOrder.material || 'N/A'}</p>
            </div>

            <div>
              <p className="text-gray-400">Functionality</p>
              <p className="font-semibold">
                {selectedOrder.functionality ? 'Yes' : 'No'}
              </p>
            </div>

            {selectedOrder.functionalityDescription && (
              <div className="md:col-span-2">
                <p className="text-gray-400">Functionality Description</p>
                <p className="font-semibold overflow-auto max-h-20">
                  {selectedOrder.functionalityDescription}
                </p>
              </div>
            )}

            <div className="md:col-span-2">
              <p className="text-gray-400">Description</p>
              <p className="font-semibold overflow-auto max-h-20">
                {selectedOrder.description || 'N/A'}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-400">File</p>
              {selectedOrder.file ? (
                <a
                  href={selectedOrder.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View File
                </a>
              ) : (
                <p className="text-gray-400 italic">No file</p>
              )}
            </div>

            {selectedOrder.functionality === true && (
              <div>
                <p className="text-gray-400">Functionality Type</p>
                <p className="font-semibold">
                  {selectedOrder.functionalityType || 'N/A'}
                </p>
              </div>
            )}

            <div>
              <p className="text-gray-400">Cost (RD$)</p>
              <input
                type="number"
                name="cost"
                value={selectedOrder.cost || ''}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 mt-1"
              />
            </div>

            <div>
              <p className="text-gray-400">Status</p>
              <select
                value={selectedOrder.status}
                name="status"
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-2 rounded"
              >
                {selectedOrder.status === 'new' && (
                  <option value="">New</option>
                )}
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-between space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleRecivedEmail}
                disabled={selectedOrder.status !== 'new'}
                className={`${selectedOrder.status !== 'new' ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-950 hover:from-gray-900'} px-4 py-2 rounded`}
              >
                Send Recived Email
              </button>
              <button
                onClick={handleUpdateOrder}
                className="bg-gray-950 px-4 py-2 rounded hover:bg-gray-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
