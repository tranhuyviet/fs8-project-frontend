import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useRouter } from 'next/router'
import Input from '../../components/formElement/Input'

const Checkout = () => {
    const auth = useAppSelector(state => state.auth)
    const cartRes = useAppSelector(state => state.cart)
    const router = useRouter()

    useEffect(() => {
        if (!auth.isLoggedIn) router.push('/login')
    }, [auth.isLoggedIn, router])

    return (
        <main className="container">
            <div className="flex justify-center">
                <div className="w-[600px] shadow-lg flex flex-col items-center p-6 border">
                    <img src="/images/logo.png" className="h-[70px]" />
                    {/* <h2 className="text-xl font-semibold uppercase tracking-wider font-poppins mt-4">Total amout: €{cartRes.subTotal}</h2> */}
                    {/* SHIPPING DETAIL */}
                    <div className="w-full mt-4">
                        <h2 className="text-lg uppercase font-semibold">Shipping Detail</h2>
                        <div className="grid grid-cols-2 gap-x-4">
                            <Input label="First Name" type="text" name="firstName" />
                            <Input label="Last Name" type="text" name="firstName" />
                        </div>
                        <Input label="Email" type="email" name="email" value={auth.user.email} />
                        <Input label="Address" type="text" name="address" />
                        <div className="grid grid-cols-3 gap-x-4">
                            <Input label="City" type="text" name="city" />
                            <Input label="State" type="text" name="state" />
                            <Input label="ZIP" type="text" name="zip" />
                        </div>
                    </div>

                    {/* BILLING DETAIL */}
                    <div className="w-full mt-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg uppercase font-semibold">BILLING Detail</h2>
                            <img src="/images/visa-logo.png" alt="visa master" className="w-[120px]" />
                        </div>
                        <Input label="Card number" type="text" name="cardNumber" />

                        <div className="grid grid-cols-2 gap-x-4">
                            <Input label="Expiry Date (MM/YY)" type="text" name="city" />
                            <Input label="CVC" type="text" name="cvc" />
                        </div>
                        <button className="btn w-full mt-6">Pay ${cartRes.subTotal}</button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Checkout
