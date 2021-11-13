import React from 'react';

const Navbar = () => {
    return (
        <nav className='h-16 shadow-xl'>
            <div className='container h-full flex items-center'>
                <h1 className='uppercase font-bold text-xl first-letter:text-green-600 tracking-widest'>
                    E-COMMERCE
                </h1>
                <div className='flex items-center space-x-4 ml-auto'>
                    <p>Navbar</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
