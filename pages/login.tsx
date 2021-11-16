import React from 'react'
import Link from 'next/link'
import Input from '../components/formElement/Input'

const LoginPage = () => {
    return (
        <main className="container min-h-[calc(100vh-64px-64px)]">
            <div className="max-w-lg mx-auto pt-10 ">
                <form className="flex flex-col " noValidate>
                    <h1 className="text-center text-3xl font-bold font-poppins uppercase tracking-wider">Login</h1>
                    <Input label="email" type="email" name="email" />
                    <Input label="password" type="password" name="password" />
                    <button className="btn mt-6" type="submit">LOGIN</button>
                    <Link href="/"><a className="mt-4 text-base text-indigo-600">Forgot your password?</a></Link>
                </form>
                <div className="h-[1px] w-[60%] bg-gray-300 mt-10 mx-auto" />
                <div className="mt-8">
                    <h2 className="text-center font-semibold text-base">Don't have account?</h2>
                    <Link href="/register"><a className="btn w-full mt-4">Register new account</a></Link>
                </div>

            </div>
        </main>
    )
}

export default LoginPage
