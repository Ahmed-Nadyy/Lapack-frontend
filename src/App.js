import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Compnents/Login';
import HomePage from './Compnents/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Components
import AdminDashboard from './Compnents/Admin/AdminDashboard';
import ProductManagement from './Compnents/Admin/ProductManagement';
import OrderManagement from './Compnents/Admin/OrderManagement';
import UserManagement from './Compnents/Admin/UserManagement';

// Product Components
import ProductDetails from './Compnents/Products/ProductDetails';

// Order Components
import OrderForm from './Compnents/Orders/OrderForm';



function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['master', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={['master', 'admin']}>
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={['master', 'admin']}>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          
          {/* Master-only Routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['master']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          
          {/* Public Routes */}
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order/:id" element={<OrderForm />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
