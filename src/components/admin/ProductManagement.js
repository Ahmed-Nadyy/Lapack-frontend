import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const formatPrice = (price) => {
    return price !== undefined && price !== null
      ? Number(price).toFixed(2)
      : 'N/A';
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (price === undefined || price === null || discount === undefined || discount === null) {
      return 'N/A';
    }
    return (Number(price) - Number(discount)).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Discount</th>
              <th className="px-6 py-3 border-b">Final Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{product.name}</td>
                <td className="px-6 py-4 border-b">${formatPrice(product.price)}</td>
                <td className="px-6 py-4 border-b">${formatPrice(product.discount)}</td>
                <td className="px-6 py-4 border-b">
                  ${calculateDiscountedPrice(product.price, product.discount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;