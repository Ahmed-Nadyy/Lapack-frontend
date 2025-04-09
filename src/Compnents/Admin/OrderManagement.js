import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('all');

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // API call to update order status will be implemented here
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const filterOrders = () => {
    if (orderStatus === 'all') return orders;
    return orders.filter(order => order.status === orderStatus);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex space-x-4">
           
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setOrderStatus('all')}
                className={`px-4 py-2 rounded-md ${orderStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                All Orders
              </button>
              <button
                onClick={() => setOrderStatus('pending')}
                className={`px-4 py-2 rounded-md ${orderStatus === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setOrderStatus('accepted')}
                className={`px-4 py-2 rounded-md ${orderStatus === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Accepted
              </button>
              <button
                onClick={() => setOrderStatus('completed')}
                className={`px-4 py-2 rounded-md ${orderStatus === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Completed
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search orders..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterOrders().length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filterOrders().map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                          <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.product.name}</div>
                        <div className="text-sm text-gray-500">{order.product.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${order.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                          ${order.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                        `}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => handleOrderSelect(order)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Customer Information</h3>
                  <p>Name: {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                  <p>Email: {selectedOrder.customer.email}</p>
                  <p>Phone: {selectedOrder.customer.phone}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Product Information</h3>
                  <p>Name: {selectedOrder.product.name}</p>
                  <p>Type: {selectedOrder.product.type}</p>
                  <p>Price: ${selectedOrder.product.price}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Order Status</h3>
                  <p>Current Status: {selectedOrder.status}</p>
                  <p>Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;