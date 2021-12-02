import React, { useState, useEffect } from 'react'
import Category from '../../../components/dashboardPage/Category'
import Product from '../../../components/dashboardPage/Product'
import SideMenu from '../../../components/dashboardPage/sideMenu'
import Size from '../../../components/dashboardPage/Size'
import User from '../../../components/dashboardPage/User'
import Variant from '../../../components/dashboardPage/Variant'
import { useAppSelector } from '../../../redux/hooks'
import { useRouter } from 'next/router'

export enum EMenu {
    User = 'USER',
    Category = 'CATEGORY',
    Variant = 'VARIANT',
    Size = 'SIZE',
    Product = 'PRODUCT',
}

const Dashboard = () => {
    const auth = useAppSelector(state => state.auth)
    const router = useRouter()
    const [menu, setMenu] = useState(EMenu.User)

    useEffect(() => {
        if (!auth.isLoggedIn && auth.user.role !== 'admin') {
            router.push('/')
        }
    }, [auth.isLoggedIn, router, auth.user.role])

    return (
        <main className="container my-4 ">
            <div className="flex shadow-2xl mt-4">
                {/* side menu */}
                <div className="text-white  bg-gray-700 border border-r-0">
                    <SideMenu setMenu={setMenu} menu={menu} />
                </div>

                {/* detail */}
                <div className="flex-auto bg-white border border-l-0 min-h-[calc(100vh-64px-64px-32px-32px)] pb-[20px]">
                    {(menu === EMenu.User) && <User />}
                    {(menu === EMenu.Category) && <Category />}
                    {(menu === EMenu.Variant) && <Variant />}
                    {(menu === EMenu.Size) && <Size />}
                    {(menu === EMenu.Product) && <Product />}
                </div>
            </div>
        </main>
    )
}

export default Dashboard
