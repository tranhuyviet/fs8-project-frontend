import React, { useState, useEffect } from 'react'
import Input from '../../components/formElement/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import GlobalMessage from '../../components/formElement/GlobalMessage'
import { useAppSelector } from '../../redux/hooks'
import { useRouter } from 'next/router'


interface IChangePassword {
    currentPassword: string
    password: string
    confirmPassword: string
}

const ChangePassword = () => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const initialValues: IChangePassword = {
        currentPassword: '',
        password: '',
        confirmPassword: ''
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors, } = useFormik<IChangePassword>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('change password:', values)
        try {
            const { data } = await axios.patch('/users/change-password', values)
            if (data.status === 'success') {
                console.log('hehe')
                setValues(initialValues)
                setOpenSuccess(true)
                setTimeout(() => {
                    setOpenSuccess(false)
                }, 3000)
            }

        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) router.push('/login')
    }, [isLoggedIn, router])

    return (
        <main className="container">
            {isLoggedIn && (
                <div className="max-w-xl p-4 mx-auto">
                    <h1 className="text-2xl font-bold tracking-wider text-center uppercase font-poppins ">change password</h1>
                    <div className="flex justify-center mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {openSuccess && <GlobalMessage success="Change password successfully" className="mt-4" />}
                    <form noValidate onSubmit={handleSubmit}>
                        <Input label="Current Password" type="password" name="currentPassword" value={values.currentPassword} onChange={handleChange} error={errors?.currentPassword} />
                        <Input label="New Password" type="password" name="password" value={values.password} onChange={handleChange} error={errors?.password} />
                        <Input label="Confirm Password" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors?.confirmPassword} />

                        <div className="flex justify-end mt-6 space-x-4">
                            {/* <Link href="/"><a className="btn-reverse">Cancel</a></Link> */}
                            <button className=" btn" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export default ChangePassword
