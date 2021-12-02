import React, { useState } from 'react'
import Input from '../../../components/formElement/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import GlobalMessage from '../../../components/formElement/GlobalMessage'
import { useRouter } from 'next/router'

interface IResetPassword {
    password: string
    confirmPassword: string
    global?: string
}

const ResetPassword = () => {
    const router = useRouter()
    const resetPasswordToken = router.asPath.split('/user/reset-password/')[1]
    // console.log(resetPasswordToken)
    const [openSuccess, setOpenSuccess] = useState(false)

    const initialValues: IResetPassword = {
        password: '',
        confirmPassword: ''
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<IResetPassword>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('submit', values)
        try {
            const { data } = await axios.patch(`/users/reset-password/${resetPasswordToken}`, values)
            console.log(data)
            if (data.status === 'success') {
                setOpenSuccess(true)
                setValues(initialValues)
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <main className="container">
            <div className="max-w-md mx-auto mt-4">
                <form noValidate onSubmit={handleSubmit}>
                    <p className="font-semibold text-lg">Reset your password</p>
                    <p className="text-gray-500">Please enter your new password.</p>
                    {openSuccess && (
                        <GlobalMessage success="Reset password successfully! Now you can log-in with your new password." link="Wanna to Login?" to="/login" className="mt-4" />
                    )}
                    <Input label="password" type="password" name="password" value={values.password} onChange={handleChange} error={errors?.password} />
                    <Input label="confirm password" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors?.confirmPassword} />
                    <div className="mt-4 flex justify-end">
                        <button className="btn">Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ResetPassword
