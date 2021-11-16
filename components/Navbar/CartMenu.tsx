import React from 'react'
import Link from 'next/link'

const CartMenu = () => {
    return (
        <div className="absolute top-7 border-2 border-gray-800  p-6 mt-4 bg-white w-[320px] z-40" style={{ right: -2 }}>
            <div className="relative">
                <h2 className="text-center font-bold text-lg">YOUR BAG IS EMPTY</h2>
                <p className="text-center text-gray-500 mt-2">Go. Go fill it up with all your fashion hopes and dreams.</p>

            </div>
        </div>
    )
}

export default CartMenu
