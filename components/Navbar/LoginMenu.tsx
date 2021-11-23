import React from 'react'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'
import axios from 'axios'



const LoginMenu = () => {
    const auth = useAppSelector(state => state.auth)
    const user = auth.user
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        console.log('logout click')
        try {
            await axios.get('/users/logout')
            dispatch(logout())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="absolute top-7 border-2 border-gray-800  p-6 mt-4 bg-white w-[320px] z-40" style={{ right: -2 }}>
            <div className="relative">
                {/* if not logged in */}
                {!auth.isLoggedIn && (
                    <>
                        <Link href="/login"><a className="inline-block w-full btn">Login</a></Link>
                        <p className="mt-6 text-base"><Link href="/register"><a className="text-indigo-600">Register now</a></Link>.  It only takes a minute.</p>
                    </>
                )}

                {/* if logged in */}
                {auth.isLoggedIn && (
                    <>
                        <div className="flex flex-col items-center justify-center ">
                            <img src={user.image || 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636489332/avatar_tcj5dx.png'} alt="avatar" className="rounded-full w-14 h-14" />
                            <h2 className="mt-2 text-base font-semibold">{user.name}</h2>
                        </div>

                        <div className="h-[1px] w-full bg-gray-200 mt-4 mb-6" />
                        <button className="w-full btn" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoginMenu
