import React, { useState } from 'react';
import Navbar from './Navbar';
import Body from './Body';
import SponsersSection from './SponsersSection';
import Footer from './Footer';
import Tracks from './Tracks';
import ContactUs from './ContactUs';

export default function HomePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTag, setActiveTag] = useState("Home");
    const headerTags = ["Home" ,"Laptops","Contact Us"];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <>
            <Navbar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                headerTags={headerTags}
                toggleMobileMenu={toggleMobileMenu}
            />
            {activeTag === "Home" && <Body setActiveTag={setActiveTag} />}
            {activeTag === "Laptops" && <Tracks />}
            {activeTag === "Contact Us" && <ContactUs />}
            <SponsersSection />
            <Footer />
        </>
    );
}
