import React from 'react'
import Link from 'next/link'
import Input from '../components/formElement/Input'

const RegisterPage = () => {
    return (
        <main className="container">
            <div className="max-w-lg pt-10 pb-10 mx-auto">
                <form className="flex flex-col" noValidate>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="block w-16 h-16 p-4 text-white bg-gray-700 shadow-xl rounded-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-wider text-center uppercase font-poppins">REGISTER NEW ACCOUNT</h1>
                    <Input label="email" type="email" name="email" />
                    <Input label="password" type="password" name="password" />
                    <Input label="confirm password" type="password" name="password" />
                    <button className="mt-6 btn" type="submit">REGISTER</button>

                </form>
                <div className="h-[1px] w-[60%] bg-gray-300 mt-10 mx-auto" />
                <div className="mt-8">
                    <h2 className="text-base font-semibold text-center">{`Already have an account?`}</h2>
                    <Link href="/login"><a className="w-full mt-4 btn">Login</a></Link>
                </div>

            </div>
        </main>
    )
}

export default RegisterPage
