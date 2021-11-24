import React, { useState } from 'react'
import Category from '../../../components/dashboardPage/Category'
import Product from '../../../components/dashboardPage/Product'
import SideMenu from '../../../components/dashboardPage/sideMenu'
import Size from '../../../components/dashboardPage/Size'
import User from '../../../components/dashboardPage/User'
import Variant from '../../../components/dashboardPage/Variant'

export enum EMenu {
    User = 'USER',
    Category = 'CATEGORY',
    Variant = 'VARIANT',
    Size = 'SIZE',
    Product = 'PRODUCT',
}

const Dashboard = () => {
    const [menu, setMenu] = useState(EMenu.User)
    console.log(menu)
    return (
        <main className="container my-4 ">
            <div className="flex shadow-2xl">
                {/* side menu */}
                <div className="text-white bg-gray-700 border border-r-0">
                    <SideMenu setMenu={setMenu} menu={menu} />
                </div>
                {/* detail */}
                <div className="flex-auto h-screen bg-white border border-l-0">
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
