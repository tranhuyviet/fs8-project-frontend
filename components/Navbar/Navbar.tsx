import React, { useState } from 'react';
import Link from 'next/link'
import LoginMenu from './LoginMenu';
import CartMenu from './CartMenu';

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)


    const openLoginMenu = () => {
        setLoginOpen(true)
    }
    const closeLoginMenu = () => {
        setLoginOpen(false)
    }

    const openCartMenu = () => {
        setCartOpen(true)
    }

    const closeCartMenu = () => {
        setCartOpen(false)
    }

    return (
        <nav className='h-16 shadow-md'>
            <div className='container flex items-center h-full'>
                <Link href="/">
                    <a>
                        <h1 className='text-xl font-bold tracking-widest text-gray-700 uppercase'>
                            fashion shop
                        </h1>
                    </a>
                </Link>
                <div className='flex items-center ml-auto space-x-1'>
                    <div className={`relative  border-2 p-2 border-white ${loginOpen ? 'hover:border-gray-800' : ''}`} onMouseEnter={openLoginMenu} onMouseLeave={closeLoginMenu} onClick={() => setLoginOpen(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-600 cursor-pointer h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {loginOpen && (
                            <>
                                <LoginMenu />
                                <div className='absolute right-0 z-50 h-2 bg-white w-11 -bottom-1' />
                            </>
                        )}
                    </div>
                    <div className={`relative border-2 p-2 border-white border-b-white ${cartOpen ? 'hover:border-gray-800' : ''}`} onMouseEnter={openCartMenu} onMouseLeave={closeCartMenu} onClick={() => setCartOpen(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-600 cursor-pointer h-7 w-7 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartOpen && (
                            <>
                                <CartMenu />
                                <div className='absolute right-0 z-50 h-2 bg-white w-11 -bottom-1' />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
