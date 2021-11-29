import React, { useState, useEffect } from 'react'
import { IVariant } from '../../pages/index'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import { openConfirmDialog, closeConfirmDialog, IAction } from '../../redux/slices/confirmDialogSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ConfirmDialog from '../formElement/ConfirmDialog'
import axios from 'axios'
import Input from '../formElement/Input'
import { useFormik } from 'formik'
import classNames from 'classnames'

const Variant = () => {
    const { data, error } = useSWR('/variants', fetchApi)
    const [variants, setVariants] = useState<IVariant[]>()
    const dispatch = useAppDispatch()
    const confirm = useAppSelector(state => state.confirm)
    const [edit, setEdit] = useState({
        isEdit: false,
        _id: ''
    })

    const initialValues: IVariant = {
        name: '',
        colorHex: ''
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<IVariant>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('add new submit: ', values)
        // edit variant
        if (edit.isEdit && edit._id) {
            handleEditVariant()
        } else {
            // add new variant
            handleAddNewVariant()
        }
    }

    // ADD NEW VARIANT
    const handleAddNewVariant = async () => {
        try {
            const { data } = await axios.post('/variants', values)
            if (data.status === 'success') {
                console.log(data.data)

                setVariants([...variants, data?.data])
                setValues(initialValues)
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    // EDIT VARIANT
    const handleEditVariant = async () => {
        try {
            const { data } = await axios.patch(`/variants/${edit._id}`, values)
            if (data.status === 'success') {
                console.log(data.data)
                const variant = variants.find(variant => variant._id === edit._id)
                variant.name = data.data.name
                variant.colorHex = data.data.colorHex
                setVariants([...variants])
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

    // DELETE VARIANT
    const handleDeleteVariant = async () => {
        try {
            if (confirm.action === IAction.delete && confirm._id) {
                const { data } = await axios.delete(`/variants/${confirm._id}`)
                if (data.status === 'success') {
                    const updatedVariants = variants.filter(variant => variant._id !== confirm._id)
                    setVariants(updatedVariants)
                    dispatch(closeConfirmDialog())
                }
            }
        } catch (error) {
            console.log('Delete variant error: ', error)
        }
    }

    useEffect(() => {
        if (data) setVariants(data.data)
    }, [data])

    if (error) return <p>Error: {error}</p>
    console.log(data)

    return (
        <div className="p-4" id="top">
            <h1 className="dashboardTitle" id="top1">dashboard variant</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4  mx-auto p-4 border border-gray-500 shadow-lg" id="top2">
                <div className="w-full">
                    <Input label="Variant name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} className="py-2 w-full" />
                    <Input label="ColorHex" type="text" name="colorHex" value={values.colorHex} onChange={handleChange} error={errors?.colorHex} className="py-2 w-full" />
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
                    <p className="col-span-8">name</p>
                    <p className="col-span-1 text-center">color</p>
                    <p className="col-span-1 text-center">hex</p>
                    <p className="col-span-1 text-center">Edit</p>
                    <p className="col-span-1 text-center">Delete</p>
                </div>
                {/* table content */}
                <div className="border border-t-0 relative">
                    {variants && variants.map(variant => (
                        <div className="grid grid-cols-12 px-4 py-3 border-b last:border-b-0 capitalize" key={variant._id}>
                            <div className="col-span-8 flex items-center">
                                <p>{variant.name}</p>
                            </div>
                            <div className={`col-span-1 text-center self-center w-6 h-6 mx-auto`} style={{ backgroundColor: variant.colorHex }} />
                            <p className="col-span-1 text-center self-center">{variant.colorHex}</p>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-indigo-700': !edit.isEdit })} onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setEdit({ isEdit: true, _id: variant._id })
                                setValues({ name: variant.name, colorHex: variant.colorHex })
                            }}>Edit</p>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-red-700': !edit.isEdit })} onClick={() => {
                                dispatch(openConfirmDialog({ action: IAction.delete, name: variant.name, _id: variant._id }))
                                window.scrollTo({ top: 0 });
                            }}>Delete</p>
                        </div>
                    ))}
                    {edit.isEdit && <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-50 cursor-not-allowed" />}

                </div>
            </div>
            {confirm.show && <ConfirmDialog confirm={confirm} closeConfirm={() => dispatch(closeConfirmDialog())} handleDelete={handleDeleteVariant} />}

        </div >
    )
}

export default Variant