import React, { useState, useEffect } from 'react'
import { ICategory } from '../../pages/index'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import { openConfirmDialog, closeConfirmDialog, IAction } from '../../redux/slices/confirmDialogSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ConfirmDialog from '../formElement/ConfirmDialog'
import axios from 'axios'
import Input from '../formElement/Input'
import { useFormik } from 'formik'

const Category = () => {
    const { data, error } = useSWR('/categories', fetchApi)
    const [categories, setCategories] = useState<ICategory[]>()
    const dispatch = useAppDispatch()
    const confirm = useAppSelector(state => state.confirm)

    const initialValues: ICategory = {
        name: ''
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<ICategory>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('add new submit: ', values)
        handleAddNewCagegory()
    }

    // ADD NEW CATEGORY
    const handleAddNewCagegory = async () => {
        try {
            const { data } = await axios.post('/categories', values)
            if (data.status === 'success') {
                setCategories({ ...categories, ...data?.data })
                setValues(initialValues)
            }

        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    // DELETE CATETORY
    const handleDeleteCategory = async () => {
        try {
            if (confirm.action === IAction.delete && confirm._id) {
                const { data } = await axios.delete(`/categories/${confirm._id}`)
                if (data.status === 'success') {
                    const updatedCategories = categories.filter(category => category._id !== confirm._id)
                    setCategories(updatedCategories)
                    dispatch(closeConfirmDialog())
                }
            }
        } catch (error) {
            console.log('Delete category error: ', error)
        }
    }

    useEffect(() => {
        if (data) setCategories(data.data)
    }, [data])

    if (error) return <p>Error: {error}</p>

    return (
        <div className="p-4">
            <h1 className="dashboardTitle">category</h1>
            <form onSubmit={handleSubmit} className="flex items-end mt-2">
                <div className="w-full">
                    <Input label="Category name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} className="py-2 w-full" />

                </div>
                <button className="btn w-[180px] ml-4">Add new</button>
            </form>
            <div className="w-full mt-6 shadow-lg">
                {/* table header */}
                <div className="grid grid-cols-12 px-4 uppercase text-xs font-semibold bg-gray-100 py-3 rounded-t-xl border ">
                    <p className="col-span-10">name</p>
                    <p className="col-span-1 text-center">Edit</p>
                    <p className="col-span-1 text-center">Delete</p>
                </div>
                {/* table content */}
                <div className="border border-t-0">
                    {categories && categories.map(category => (
                        <div className="grid grid-cols-12 px-4 py-3 border-b last:border-b-0" key={category._id}>
                            <div className="col-span-10 flex items-center">
                                <p>{category.name}</p>
                            </div>
                            <p className="col-span-1 text-center self-center font-semibold text-indigo-700 cursor-pointer">Edit</p>
                            <p className="col-span-1 text-center self-center font-semibold text-red-700 cursor-pointer" onClick={() => dispatch(openConfirmDialog({ action: IAction.delete, name: category.name, _id: category._id }))}>Delete</p>
                        </div>
                    ))}
                </div>
            </div>
            {confirm.show && <ConfirmDialog confirm={confirm} closeConfirm={() => dispatch(closeConfirmDialog())} handleDelete={handleDeleteCategory} />}
        </div>
    )
}

export default Category