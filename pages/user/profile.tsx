import React, { useEffect } from 'react'
import Link from 'next/link'
import Input from '../../components/formElement/Input'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login } from '../../redux/slices/authSlice'
import axios from 'axios'
import { useRouter } from 'next/router'

interface IProfile {
    name?: string
    email?: string
    image?: string
    global?: string
}

const Profile = () => {
    const router = useRouter()
    const auth = useAppSelector(state => state.auth)
    const user = auth.user
    const dispatch = useAppDispatch()
    const initialValues: IProfile = {
        name: user?.name || '',
        email: user?.email || '',
        image: user?.image || ''
    }

    const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<IProfile>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('submit: ', values)
        try {
            const { data } = await axios.patch('/users', values)
            const user = data.data
            dispatch(login(user))
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    useEffect(() => {
        if (!auth.isLoggedIn) router.push('/login')
    }, [auth.isLoggedIn, router])

    return (
        <main className="container">
            {auth.isLoggedIn && (
                <div className="max-w-xl p-4 mx-auto">
                    <h1 className="text-2xl font-bold tracking-wider text-center uppercase font-poppins ">My Profile</h1>
                    <div className="flex justify-center mt-6">
                        <img src={values.image || 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636489332/avatar_tcj5dx.png'} alt="avatar" className="w-[100px] h-[100px]" />
                    </div>
                    <form noValidate onSubmit={handleSubmit}>
                        <Input label="name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} />
                        <Input label="email" type="email" name="email" value={values.email} onChange={handleChange} error={errors?.email} />
                        <Input label="Image Url" type="search" name="image" value={values.image} onChange={handleChange} error={errors?.image} multi={true} className="h-[120px]" />
                        <div className="flex justify-end mt-6 space-x-4">
                            {/* <Link href="/"><a className="btn-reverse">Cancel</a></Link> */}
                            <button className="btn" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export default Profile
