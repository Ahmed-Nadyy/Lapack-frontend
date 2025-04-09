import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FireIcon } from '@heroicons/react/20/solid';

const FilterComponent = ({ filter, setFilter, resetFilters }) => {
    const handlePriceChange = (values) => {
        setFilter({ ...filter, priceRange: `${values[0]}-${values[1]}` });
    };

    const getPriceValues = () => {
        if (!filter.priceRange) return [0, 100000];
        const [min, max] = filter.priceRange.split('-').map(Number);
        return [min, max];
    };
    return (
        <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Filters</h2>
            <div className='my-6'>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        Category
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            <FireIcon className="h-3 w-3" /> New
                        </span>
                    </label>
                    <select
                        value={filter.category}
                        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        className="w-full px-4 py-2 bg-white border-2 rounded-md relative before:absolute before:inset-0 before:-z-10 before:rounded-md before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-red-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" className="bg-white">All Categories</option>
                        <option value="Programming" className="bg-white">Programming</option>
                        <option value="Engineering" className="bg-white">Engineering</option>
                        <option value="Gaming" className="bg-white">Gaming</option>
                        <option value="Business" className="bg-white">Business</option>
                        <option value="Student" className="bg-white">Student</option>
                    </select>
                    <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500">Ex: Programming</p>
                    </div>
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 md:space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <div className="space-y-2">
                        {['All Brands', 'Dell', 'Lenovo', 'HP', 'Asus'].map((brand) => (
                            <div key={brand} className="flex items-center">
                                <input
                                    type="radio"
                                    id={brand}
                                    name="brand"
                                    value={brand === 'All Brands' ? '' : brand.toLowerCase()}
                                    checked={filter.brand === (brand === 'All Brands' ? '' : brand.toLowerCase())}
                                    onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor={brand} className="ml-2 text-sm text-gray-700">{brand}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <div className="px-2 py-4">
                        <Slider
                            range
                            min={0}
                            max={100000}
                            value={getPriceValues()}
                            onChange={handlePriceChange}
                            className="mb-2"
                            trackStyle={[{ backgroundColor: '#2563eb' }]}
                            handleStyle={[{ borderColor: '#2563eb' }, { borderColor: '#2563eb' }]}
                            railStyle={{ backgroundColor: '#e5e7eb' }}
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>EGP {getPriceValues()[0]}</span>
                            <span>EGP {getPriceValues()[1]}</span>
                        </div>
                    </div>
                </div>
               
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Processor</label>
                    <select
                        value={filter.processor}
                        onChange={(e) => setFilter({ ...filter, processor: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                        <option value="">All Processors</option>
                        <option value="i3">Intel Core i3</option>
                        <option value="i5">Intel Core i5</option>
                        <option value="i7">Intel Core i7</option>
                        <option value="i9">Intel Core i9</option>
                        <option value="ryzen">AMD Ryzen</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RAM</label>
                    <select
                        value={filter.ramRange}
                        onChange={(e) => setFilter({ ...filter, ramRange: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                        <option value="">All RAM</option>
                        <option value="4-8">4GB - 8GB</option>
                        <option value="8-16">8GB - 16GB</option>
                        <option value="16-32">16GB - 32GB</option>
                        <option value="32-128">32GB</option>
                    </select>
                </div>
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="inStock"
                        checked={filter.inStock}
                        onChange={(e) => setFilter({ ...filter, inStock: e.target.checked })}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                        In Stock Only
                    </label>
                </div>
                <div>
                    <button
                        onClick={resetFilters}
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;