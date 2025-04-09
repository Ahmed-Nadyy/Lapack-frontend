import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import acer from '../../Assets/Images/acerr.png'
import apple from '../../Assets/Images/apple.png'
import asus from '../../Assets/Images/asus.png'
import dell from '../../Assets/Images/dell.png'
import hp from '../../Assets/Images/hp.png'
import lenovo from '../../Assets/Images/lenovo.png'
import msi from '../../Assets/Images/msi.png'

export default function SponsersSection() {
    const [autoPlay, setAutoPlay] = useState(true);
    const originalSponsors = [acer, apple, asus, dell, hp, lenovo, msi];
    const [sponsors, setSponsors] = useState([...originalSponsors, ...originalSponsors]);
    const slideSpeed = 0.8; // Pixels per frame
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(() => {
                const newTranslateX = translateX - slideSpeed;
                setTranslateX(newTranslateX);
                
                // Reset position when needed for infinite loop
                if (Math.abs(newTranslateX) >= originalSponsors.length * 100) {
                    setTranslateX(0);
                }
            }, 30);
        }
        return () => clearInterval(interval);
    }, [autoPlay, translateX, originalSponsors.length]);


    return (
        <div className='flex flex-col justify-center items-center my-4 md:my-8'>
            <h1 className='text-lg md:text-xl font-bold text-[#111827]-700 my-4 md:my-6'>- Our Featured Laptop Brands -</h1>
            <div className='w-[95%] md:w-[80%] bg-[#F8F8F8] py-6 md:py-10 rounded-3xl overflow-hidden relative'>
                <div className='flex justify-center items-center gap-4 md:gap-8 overflow-hidden'>
                    <div 
                        className='flex flex-row transition-transform duration-300 ease-in-out'
                        style={{ 
                            transform: `translateX(${translateX}px)`,
                            display: 'flex',
                            width: `${sponsors.length * 100}%`
                        }}
                    >
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={index}
                                className='w-20 h-20 md:w-32 md:h-32 flex items-center justify-center transform transition-all duration-500 ease-in-out'
                                style={index < originalSponsors.length ? {
                                    opacity: 1,
                                    transform: `translateX(0)`,
                                    minWidth: '200px',
                                    maxWidth: '200px'
                                } : {}}
                            >
                                <img
                                    src={sponsor}
                                    alt={`Sponsor ${index + 1}`}
                                    className='px-2 max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}