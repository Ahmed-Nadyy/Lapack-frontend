import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateExistingLaptop } from '../../Redux/slices/laptopSlice';
import ImageUploader from '../ImageUploader';

const EditProduct = ({ product, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        manufacturer: '',
        category: '',
        name: '',
        processor: '',
        ram: '',
        storage: '',
        screen: '',
        additionalDetails: '',
        price: 0,
        discount: 0,
        inStock: true,
        stockQuantity: 1
    });
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setFormData({
                manufacturer: product.manufacturer || '',
                category: product.category || '',
                name: product.name || '',
                processor: product.processor || '',
                ram: product.ram || '',
                storage: product.storage || '',
                screen: product.screen || '',
                additionalDetails: product.additionalDetails || '',
                price: product.price || 0,
                discount: product.discount || 0,
                inStock: product.inStock ?? true,
                stockQuantity: product.stockQuantity || 1
            });
            setImageUrls(product.images || []);
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (imageUrls.length === 0) {
                setError('Please upload at least one image');
                return;
            }

            setLoading(true);
            const updatedProduct = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                discount: formData.discount ? parseFloat(formData.discount) : 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                images: imageUrls,
            };

            const result = await dispatch(updateExistingLaptop(product._id, updatedProduct));
            if (result) {
                onUpdate();
                onClose();
            }
        } catch (err) {
            setError('Failed to update product. Please try again.');
            console.error('Error updating product:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-full overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                            <select
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Manufacturer</option>
                                <option value="Dell">Dell</option>
                                <option value="Lenovo">Lenovo</option>
                                <option value="HP">HP</option>
                                <option value="Asus">Asus</option>
                                <option value="Acer">Acer</option>
                                <option value="Apple">Apple</option>
                                <option value="MSI">MSI</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Programming">Programming</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Business">Business</option>
                                <option value="Student">Student</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Laptop model name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Processor</label>
                            <input
                                type="text"
                                name="processor"
                                value={formData.processor}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., Core i7-11800H"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">RAM</label>
                            <input
                                type="text"
                                name="ram"
                                value={formData.ram}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., 16GB DDR4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Storage</label>
                            <input
                                type="text"
                                name="storage"
                                value={formData.storage}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., 512GB SSD"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Screen</label>
                            <input
                                type="text"
                                name="screen"
                                value={formData.screen}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder='e.g., 15.6" FHD'
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                            <textarea
                                name="additionalDetails"
                                value={formData.additionalDetails}
                                onChange={handleInputChange}
                                rows="3"
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Additional specifications or features"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Discount</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleInputChange}
                                min="0"
                                className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="inline-flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={formData.inStock}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <span className="ml-2">In Stock</span>
                            </label>
                        </div>

                        <div className="col-span-2">
                            <ImageUploader
                                onImagesUploaded={setImageUrls}
                                maxImages={5}
                                initialImages={imageUrls}
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-600 text-sm">{error}</div>
                    )}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;