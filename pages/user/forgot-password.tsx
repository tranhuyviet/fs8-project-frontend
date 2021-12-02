import React, { useState } from 'react'
import Input from '../../components/formElement/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import GlobalMessage from '../../components/formElement/GlobalMessage'

interface IForgotPassword {
    email: string
    global?: string
}

const ForgotPassword = () => {
    const [openSuccess, setOpenSuccess] = useState(false)

    const initialValues: IForgotPassword = {
        email: ''
    }

    const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<IForgotPassword>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('submit')
        try {
            const { data } = await axios.post('/users/forgot-password', values)
            console.log(data)
            if (data.status === 'success') {
                setOpenSuccess(true)
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <main className="container">
            <div className="max-w-md mx-auto mt-4">
                <form noValidate onSubmit={handleSubmit}>
                    <p className="font-semibold text-lg">You forgort your password?</p>
                    <p className="text-gray-500">Provide the email address you used to log in to the this website. We will email you a link to change your password.</p>
                    {openSuccess && (
                        <GlobalMessage success="Success. Please check your email to reset your password" className="mt-4" />
                    )}
                    <Input label="email" type="email" name="email" value={values.email} onChange={handleChange} error={errors?.email} />
                    <div className="mt-4 flex justify-end">
                        <button className="btn">Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ForgotPassword
