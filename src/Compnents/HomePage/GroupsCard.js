import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupsCard({ laptops }) {
    const navigate = useNavigate();
    console.log(laptops);

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-12 max-sm:max-w-sm max-sm:mx-auto">
            {laptops.map((laptop) => (
                <div key={laptop._id} className="border rounded-md p-6 hover:shadow-lg transition-shadow">
                    {laptop.images && laptop.images.length > 0 && (
                        <img 
                            src={laptop.images[0]} 
                            alt={laptop.name} 
                            className="w-full h-38 object-cover rounded-md mb-4"
                        />
                    )}
                    <h3 className="text-2xl font-semibold mb-1 text-center">{laptop.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{laptop.manufacturer}</span>
                        {laptop.category && (
                            <>
                                <span>•</span>
                                <span>{laptop.category}</span>
                            </>
                        )}
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Processor:</span>
                            <span className="font-medium">{laptop.processor}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">RAM:</span>
                            <span className="font-medium">{laptop.ram}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Storage:</span>
                            <span className="font-medium">{laptop.storage}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-2xl font-bold">
                                ${laptop.discount > 0 ? (
                                    <>
                                        <span className="text-red-600">
                                            {(laptop.price * (1 - laptop.discount / 100)).toFixed(2)}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                            {`$${laptop.price}`}
                                        </span>
                                    </>
                                ) : (
                                    laptop.price.toFixed(2)
                                )}
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    laptop.inStock
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {laptop.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/products/${laptop._id}`)}
                                type="button"
                                className={`flex-1 px-2 py-2 text-sm font-semibold text-white rounded-md ${
                                    laptop.inStock
                                        ? 'bg-gray-900 hover:bg-gray-800'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!laptop.inStock}
                            >
                                {laptop.inStock ? 'View Details' : 'Out of Stock'}
                            </button>
                            {laptop.inStock && (
                                <button
                                    type="button"
                                    className="flex-1 px-2 py-2 text-sm font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600"
                                    onClick={() => navigate(`/products/${laptop._id}`)}
                                >
                                    Get it Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}