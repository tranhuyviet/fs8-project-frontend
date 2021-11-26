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
import classNames from 'classnames'
import { Link } from 'react-scroll'

const Category = () => {
    const { data, error } = useSWR('/categories', fetchApi)
    const [categories, setCategories] = useState<ICategory[]>()
    const dispatch = useAppDispatch()
    const confirm = useAppSelector(state => state.confirm)
    const [edit, setEdit] = useState({
        isEdit: false,

        _id: ''
    })

    const initialValues: ICategory = {
        name: ''
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<ICategory>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('add new submit: ', values)
        // edit category
        if (edit.isEdit && edit._id) {
            handleEditCategory()
        } else {
            // add new category
            handleAddNewCategory()
        }
    }

    // ADD NEW CATEGORY
    const handleAddNewCategory = async () => {
        try {
            const { data } = await axios.post('/categories', values)
            if (data.status === 'success') {
                console.log(data.data)

                setCategories([...categories, data?.data])
                setValues(initialValues)
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    // EDIT CATEGORY
    const handleEditCategory = async () => {
        try {
            const { data } = await axios.patch(`/categories/${edit._id}`, values)
            if (data.status === 'success') {
                console.log(data.data)
                const category = categories.find(category => category._id === edit._id)
                category.name = data.data.name
                setCategories([...categories])
                setValues(initialValues)
                setEdit({
                    isEdit: false,

                    _id: ''
                })
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
        <div className="p-4" id="top">
            <h1 className="dashboardTitle" id="top1">category</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4  mx-auto p-4 border border-gray-500 shadow-lg" id="top2">
                <div className="w-full">
                    <Input label="Category name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} className="py-2 w-full" />
                    <div className="flex justify-end">
                        {edit.isEdit ? (<>
                            <p className="btn-reverse w-[180px] mt-4 cursor-pointer" onClick={() => {
                                setEdit({ isEdit: false, _id: '' })
                                setValues(initialValues)
                            }}>cancel</p>
                            <button className="btn w-[180px] mt-4 ml-4" type="submit">Save</button>
                        </>
                        ) : (
                            <button className="btn w-[180px] mt-4" type="submit">Add new </button>

                        )}
                    </div>
                </div>
            </form >
            <div className="w-full mt-6 shadow-lg">
                {/* table header */}
                <div className="grid grid-cols-12 px-4 uppercase text-xs font-semibold bg-gray-100 py-3 rounded-t-xl border ">
                    <p className="col-span-10">name</p>
                    <p className="col-span-1 text-center">Edit</p>
                    <p className="col-span-1 text-center">Delete</p>
                </div>
                {/* table content */}
                <div className="border border-t-0 relative">
                    {categories && categories.map(category => (
                        <div className="grid grid-cols-12 px-4 py-3 border-b last:border-b-0 capitalize" key={category._id}>
                            <div className="col-span-10 flex items-center">
                                <p>{category.name}</p>
                            </div>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-indigo-700': !edit.isEdit })} onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setEdit({ isEdit: true, _id: category._id })
                                setValues({ name: category.name })
                            }}>Edit</p>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-red-700': !edit.isEdit })} onClick={() => {
                                dispatch(openConfirmDialog({ action: IAction.delete, name: category.name, _id: category._id }))
                                window.scrollTo({ top: 0 });
                            }}>Delete</p>
                        </div>
                    ))}
                    {edit.isEdit && <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-50 cursor-not-allowed" />}

                </div>
            </div>
            {confirm.show && <ConfirmDialog confirm={confirm} closeConfirm={() => dispatch(closeConfirmDialog())} handleDelete={handleDeleteCategory} />}

        </div >
    )
}

export default Category