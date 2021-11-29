import React from 'react'
import { EMenu } from '../../pages/user/dashboard'
import classNames from 'classnames'

const SideMenu = ({ menu, setMenu }) => {
    return (
        <aside>
            <ul>
                <li><button type="button" className={classNames("sideMenuBtn", { 'bg-white text-gray-700 font-bold': menu === EMenu.User })} onClick={() => setMenu(EMenu.User)}>User</button></li>
                <li><button type="button" className={classNames("sideMenuBtn", { 'bg-white text-gray-700 font-bold': menu === EMenu.Category })} onClick={() => setMenu(EMenu.Category)}>Category</button></li>
                <li><button type="button" className={classNames("sideMenuBtn", { 'bg-white text-gray-700 font-bold': menu === EMenu.Variant })} onClick={() => setMenu(EMenu.Variant)}>Variant</button></li>
                <li><button type="button" className={classNames("sideMenuBtn", { 'bg-white text-gray-700 font-bold': menu === EMenu.Size })} onClick={() => setMenu(EMenu.Size)}>Size</button></li>
                <li><button type="button" className={classNames("sideMenuBtn", { 'bg-white text-gray-700 font-bold': menu === EMenu.Product })} onClick={() => setMenu(EMenu.Product)}>Product</button></li>
            </ul>
        </aside>
    )
}

export default SideMenu
