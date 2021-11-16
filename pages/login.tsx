import React from 'react'
import Link from 'next/link'
import Input from '../components/formElement/Input'

const LoginPage = () => {
    return (
        <main className="container min-h-[calc(100vh-64px-64px)]">
            <div className="max-w-lg mx-auto pt-10 ">
                <form className="flex flex-col" noValidate>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 bg-gray-700 text-white p-4 rounded-3xl block shadow-xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-center text-2xl font-bold font-poppins uppercase tracking-wider mt-4">Login</h1>
                    <Input label="email" type="email" name="email" />
                    <Input label="password" type="password" name="password" />
                    <button className="btn mt-6" type="submit">LOGIN</button>
                    <Link href="/"><a className="mt-4 text-base text-indigo-600">Forgot your password?</a></Link>
                </form>
                <div className="h-[1px] w-[60%] bg-gray-300 mt-10 mx-auto" />
                <div className="mt-8">
                    <h2 className="text-center font-semibold text-base">{`Don't have account?`}</h2>
                    <Link href="/register"><a className="btn w-full mt-4">Register new account</a></Link>
                </div>

            </div>
        </main>
    )
}

export default LoginPage
