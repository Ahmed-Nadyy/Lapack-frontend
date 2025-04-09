import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      // API call to fetch product details will be implemented here
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  };

  const handleOrderClick = () => {
    navigate(`/order/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="inline-block px-6 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-600 mb-8">{product.type}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Processor:</span> {product.processor}</p>
                      <p><span className="font-medium">RAM:</span> {product.ram}</p>
                      <p><span className="font-medium">Storage:</span> {product.storage}</p>
                      <p><span className="font-medium">Screen:</span> {product.screen}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
                    <p className="text-gray-600">{product.additionalDetails}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {product.discount ? (
                        <>
                          <span className="text-red-600">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </h3>
                    {product.discount > 0 && (
                      <p className="text-sm text-red-600">{product.discount}% OFF</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderClick}
                    disabled={!product.inStock}
                    className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                      product.inStock
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Order Now' : 'Out of Stock'}
                  </button>

                  {!product.inStock && (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      This product is currently unavailable
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;