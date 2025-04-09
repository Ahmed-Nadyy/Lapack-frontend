import React, { useState, useEffect } from 'react';
import GroupsCard from './GroupsCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import SearchBar from './SearchBar';
import FilterComponent from './FilterComponent';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL_FOR_GET_LAPTOPS = `${apiUrl}/laptops`;

export default function Tracks() {
    const [laptops, setLaptops] = useState([]);
    const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({
        brand: '',
        priceRange: '',
        inStock: true,
        category: '',
        processor: '',
        ramRange: ''
    });
    const ITEMS_PER_PAGE = 6;

    const showToastMessage = (message, type = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast((prevToast) => ({ ...prevToast, visible: false }));
        }, 3000);
    };

    const fetchLaptops = async (page = 1) => {
        setIsLoading(true);
        try {
            let url = `${API_URL_FOR_GET_LAPTOPS}?page=${page}&limit=${ITEMS_PER_PAGE}`;

            // Add search query if present
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }

            // Add filters
            if (filter.brand) url += `&brand=${encodeURIComponent(filter.brand)}`;
            if (filter.priceRange) {
                const [min, max] = filter.priceRange.split('-');
                url += `&minPrice=${min}&maxPrice=${max}`;
            }
            if (filter.category) url += `&category=${encodeURIComponent(filter.category)}`;
            if (filter.processor) url += `&processor=${encodeURIComponent(filter.processor)}`;
            if (filter.ramRange) {
                const [min, max] = filter.ramRange.split('-');
                url += `&minRam=${min}&maxRam=${max}`;
            }
            if (filter.inStock) url += '&inStock=true';

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched laptops:', data.data);
                setLaptops(data.data.laptops || []);
                setTotalPages(Math.ceil(data.data.total / ITEMS_PER_PAGE));
            } else {
                console.log('Failed to fetch laptops:', response.statusText);
                showToastMessage('Failed to fetch laptops.', 'error');
            }
        } catch (error) {
            console.log('Error fetching laptops:', error);
            showToastMessage('Failed to fetch laptops.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLaptops(currentPage);
    }, [currentPage, searchQuery, filter]);

    return (
        <>
            <div className="min-h-screen pt-32">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 font-[sans-serif] text-[#333] overflow-hidden">
                    <div className="w-full md:w-64 shrink-0">
                        <FilterComponent filter={filter} setFilter={setFilter} resetFilters={() => setFilter({
                            brand: '',
                            priceRange: '',
                            inStock: true,
                            category: '',
                            processor: '',
                            ramRange: ''
                        })} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">Available Laptops</h2>
                                <p className="text-sm text-gray-500">
                                    Browse our selection of high-quality laptops for every need!
                                </p>
                            </div>
                            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                {isLoading ? (
                                    <div className="gap-44 flex justify-center items-center min-h-[200px]">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : laptops.length > 0 ? (
                                    <>
                                        <GroupsCard laptops={laptops} />
                                        <div className="flex items-center justify-center gap-2 mt-8">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`p-2 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                            >
                                                <ChevronLeftIcon className="h-5 w-5" />
                                            </button>
                                            <span className="text-gray-600">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`p-2 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                            >
                                                <ChevronRightIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="mt-12 max-sm:max-w-sm max-sm:mx-auto text-center text-gray-500">No laptops available at the moment.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toast.visible && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                >
                    {toast.message}
                </div>
            )}
        </>
    );
}
