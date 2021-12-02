import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setQuantity, removeItem } from '../../redux/slices/cartSlice'
import Link from 'next/link'

const Cart = () => {
    const { cart, totalItems, subTotal } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    const quantitySelector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleRemoveItem = (_id) => {
        console.log('remove: ', _id)
        dispatch(removeItem(_id))
    }

    return (
        <main className="container">
            <div className="grid grid-cols-3 gap-x-4">
                <div className="col-span-2 border p-4 shadow-lg">
                    <h2 className="font-bold text-lg mb-4 uppercase">YOUR CART ({totalItems} items)</h2>
                    {cart && cart.map(item => (
                        <div key={item._id} className="flex mt-4 border-b pb-2 last-of-type:border-b-0 last-of-type:pb-0">
                            <div className="flex-none">
                                <img src={item.image} alt={item.name} className="w-[100px]" />
                            </div>
                            <div className="pl-2 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-center font-bold text truncate">{item.name}</h2>
                                    <p className="font-bold text-red-500">${item.price}</p>
                                    <p>Color: <span className="capitalize">{item.variant}</span></p>
                                    <p>Size: <span className="uppercase">{item.size}</span></p>
                                </div>
                                <div className="flex items-center mt-4 cursor-pointer pb-2 hover:text-red-500 transition duration-300"
                                    onClick={() => handleRemoveItem(item._id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <p className="ml-1">Remove</p>
                                </div>
                            </div>
                            <div className="w-[100px] pl-4 ml-auto flex flex-col justify-between pb-2">
                                <select className="w-full" value={item.quantity} onChange={(e) => {
                                    dispatch(setQuantity({ _id: item._id, quantity: e.target.value }))
                                }}>
                                    {quantitySelector.map(quantity => (
                                        <option key={quantity} value={quantity}>{quantity}</option>
                                    ))}
                                </select>
                                <p className="font-semibold text-base text-right">${item.quantity * item.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-4">
                        <Link href="/"><a className="btn">Continue Shopping</a></Link>
                    </div>
                </div>
                <div className="col-span-1 border p-4 shadow-lg">
                    <h2 className="font-bold text-lg mb-4 uppercase">Total amount</h2>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-base">Subtotal ({totalItems} items):</p>
                        <p className="text-base font-poppins tracking-wider">${subTotal}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-b pb-4">
                        <p className="text-base">Delivery charges:</p>
                        <p className="text-base font-poppins tracking-wider">$0</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 ">
                        <p className="text-base ">Total amount (24% alv):</p>
                        <p className="text-base font-poppins font-semibold tracking-wider">${subTotal}</p>
                    </div>
                    <div>
                        <button className="btn w-full mt-4">Checkout</button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Cart
