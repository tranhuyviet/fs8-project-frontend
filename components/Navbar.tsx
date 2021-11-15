import React from 'react';
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='h-16 shadow-md'>
            <div className='container h-full flex items-center'>
                <Link href="/">
                    <a>
                        <h1 className='uppercase font-bold text-xl tracking-widest text-gray-700'>
                            E-COMMERCE
                        </h1>
                    </a>
                </Link>
                <div className='flex items-center space-x-3 ml-auto'>
                    <Link href="/"><a className='hover:font-bold transition duration-300'>Log in</a></Link>
                    <div className='w-[1px] h-[24px] bg-gray-200' />
                    <button className='btn uppercase'>Sign up for free</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
