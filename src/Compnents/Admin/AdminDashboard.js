import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className='flex space-x-4'>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back to Home
        </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange('orders')}
              className={`px-4 py-2 rounded-md ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Orders
            </button>
            <button
              onClick={() => handleTabChange('products')}
              className={`px-4 py-2 rounded-md ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Products
            </button>
            <button
              onClick={() => handleTabChange('users')}
              className={`px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              User Management
            </button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Overview
              </h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Search
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                Please select a section from the navigation above to manage {activeTab}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;