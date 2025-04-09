import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewLaptop, fetchLaptops, removeExistingLaptop } from '../../Redux/slices/laptopSlice';
import ImageUploader from '../ImageUploader';
import EditProduct from './EditProduct';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        manufacturer: '',
        categories: [],
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

    const { laptops, loading: reduxLoading, error: reduxError } = useSelector(state => state.laptops);

    useEffect(() => {
        dispatch(fetchLaptops());
    }, [dispatch]);

    useEffect(() => {
        if (laptops && Array.isArray(laptops)) {
            setProducts(laptops);
        } else {
            setProducts([]);
        }
        setLoading(reduxLoading);
        if (reduxError) {
            setError(reduxError);
            console.error('Error fetching products:', reduxError);
        }
    }, [laptops, reduxLoading, reduxError]);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await dispatch(removeExistingLaptop(productId));
                dispatch(fetchLaptops());
            } catch (err) {
                setError('Failed to delete product. Please try again.');
                console.error('Error deleting product:', err);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            manufacturer: '',
            categories: [],
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
        setImageUrls([]);
        setShowAddForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'categories') {
            const updatedCategories = formData.categories.includes(value)
                ? formData.categories.filter(cat => cat !== value)
                : [...formData.categories, value];
            setFormData(prev => ({
                ...prev,
                categories: updatedCategories
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (imageUrls.length === 0) {
                setError('Please upload at least one image');
                return;
            }

            setLoading(true);
            const newProduct = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                discount: formData.discount ? parseFloat(formData.discount) : 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                images: imageUrls,
            };

            const result = await dispatch(createNewLaptop(newProduct));
            if (result.status === 'success') {
                resetForm();
                setError(null);
                setShowAddForm(false);
                dispatch(fetchLaptops());
            }
        } catch (err) {
            setError('Failed to add product. Please try again.');
            console.error('Error adding product:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add New Laptop
                    </button>
                </div>

                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-full overflow-auto">
                            <h2 className="text-2xl font-bold mb-4">Add New Laptop</h2>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                                        <div className="space-y-2">
                                            {['Programming', 'Engineering', 'Gaming', 'Business', 'Student', 'General'].map((category) => (
                                                <div key={category} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={category}
                                                        name="categories"
                                                        value={category}
                                                        checked={formData.categories.includes(category)}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor={category} className="ml-2 block text-sm text-gray-900">
                                                        {category}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {formData.categories.length === 0 && (
                                            <p className="text-red-500 text-sm mt-1">Please select at least one category</p>
                                        )}
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
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showEditForm && (
                    <EditProduct
                        product={selectedProduct}
                        onClose={() => {
                            setShowEditForm(false);
                            setSelectedProduct(null);
                        }}
                        onUpdate={() => {
                            dispatch(fetchLaptops());
                            setShowEditForm(false);
                            setSelectedProduct(null);
                        }}
                    />
                )}

                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specifications</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No products available
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {product.manufacturer} - {product.categories && product.categories.length > 0 ? product.categories.join(', ') : 'No categories'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div>
                                                        <p>{product.processor}, {product.ram}, {product.storage}, {product.screen}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.stockQuantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                            setShowEditForm(true);
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;