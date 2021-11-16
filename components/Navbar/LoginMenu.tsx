import React from 'react'
import Link from 'next/link'

const LoginMenu = () => {
    return (
        <div className="absolute top-7 border-2 border-gray-800  p-6 mt-4 bg-white w-[320px] z-40" style={{ right: -2 }}>
            <div className="relative">
                <Link href="/login"><a className="btn w-full inline-block">Login</a></Link>
                <p className="mt-6 text-base"><Link href="/register"><a className="text-indigo-600">Register now</a></Link>.  It only takes a minute.</p>
            </div>
        </div>
    )
}

export default LoginMenu
