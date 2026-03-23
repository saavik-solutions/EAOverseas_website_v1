import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * WebsiteLayout provides a consistent wrapper for all public-facing website sub-pages.
 * It includes the fixed Navbar, a standardized top-spacing offset to prevent overlap,
 * and the Footer.
 */
const WebsiteLayout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col relative overflow-x-hidden">
            {/* Unified Grid Background - Same as Home Page */}
            <div className="absolute inset-0 bg-grid-purple opacity-50 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col flex-grow">
                <Navbar />
                
                {/* 
                    pt-24 (96px) for mobile and pt-36 (144px) for desktop 
                    ensures that page content starts clearly below the fixed Navbar.
                */}
                <main className="flex-grow pt-24 md:pt-36">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default WebsiteLayout;
