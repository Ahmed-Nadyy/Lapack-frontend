import React from 'react'
import homeImg from '../../Assets/Images/Home Image.png'

export default function Body({ setActiveTag }) {
    return (
        <>
            <section className="px-2 pt-32 pb-12 bg-white md:px-0">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">Premium Laptops</span>
                                    <span className="block text-blue-700 xl:inline">Store.</span>
                                </h1>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Premium Laptops and Accessories for Every Need
                                <span className='text-blue-500 font-bold'> - BROWSE, Compare and Shop -</span>
                                </p>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Powerd By
                                <span className='text-blue-500 font-bold'> - Khier-Allah Group -</span>
                                </p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTag('Laptops')}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Check Laptops
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                                <img src={homeImg} className='w-full' />
                            </div>
                        </div> */}
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl items-center justify-center flex">
                                <img src={homeImg} className='w-[500px]' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
