import React, { useState, useEffect } from 'react'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import { openConfirmDialog, closeConfirmDialog, IAction } from '../../redux/slices/confirmDialogSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ConfirmDialog from '../formElement/ConfirmDialog'
import axios from 'axios'
import Input from '../formElement/Input'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { setProducts, addProduct, updateProduct } from '../../redux/slices/productSlice'



interface IProduct {
    _id?: string
    name: string
    description: string
    price: number
    discount: number
    images: string[]
    category: string
    variants: string[]
    sizes: string[]
    user: string,
    createdAt?: string
    updateAt?: string
    global?: string
}

const Product = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products.products)
    // const { data, error } = useSWR('/products', fetchApi)
    // const [products, setProducts] = useState<IProduct[]>()

    const [imageUrl, setImageUrl] = useState('')

    const categories = useAppSelector(state => state.options.categories)
    const variants = useAppSelector(state => state.options.variants)
    const sizes = useAppSelector(state => state.options.sizes)
    const user = useAppSelector(state => state.auth.user)

    const confirm = useAppSelector(state => state.confirm)

    const [edit, setEdit] = useState({
        isEdit: false,
        _id: ''
    })

    const initialValues: IProduct = {
        name: '',
        description: '',
        price: 0,
        discount: 0,
        images: [],
        category: '',
        variants: [],
        sizes: [],
        user: user._id
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<IProduct>({ initialValues, onSubmit })

    async function onSubmit(values) {
        console.log('add new submit: ', values)
        // edit product
        if (edit.isEdit && edit._id) {
            handleEditProduct()
        } else {
            // add new product
            handleAddNewProduct()
        }
    }

    // ADD NEW PRODUCT
    const handleAddNewProduct = async () => {
        try {
            const { data } = await axios.post('/products', values)
            if (data.status === 'success') {
                dispatch(addProduct(data.data))
                setValues(initialValues)
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    // EDIT PRODUCT
    const handleEditProduct = async () => {
        try {
            const { data } = await axios.patch(`/products/${edit._id}`, values)
            if (data.status === 'success') {
                console.log(data.data)
                // const product = products.find(product => product._id === edit._id)
                // product.name = data.data.name
                // setProducts([...products])
                dispatch(updateProduct(data.data))
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

    // HANDLE EDIT BUTTON CLICK
    const handleEditButtonClick = (product) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setEdit({ isEdit: true, _id: product._id })
        const category = product.category._id
        const variants = product.variants.map(variant => variant._id)
        const sizes = product.sizes.map(size => size._id)

        setValues({ ...product, category, variants, sizes, user: user._id })
    }

    // DELETE PRODUCT
    const handleDeleteProduct = async () => {
        try {
            if (confirm.action === IAction.delete && confirm._id) {
                const { data } = await axios.delete(`/products/${confirm._id}`)
                if (data.status === 'success') {
                    const updatedProducts = products.filter(product => product._id !== confirm._id)
                    dispatch(setProducts(updatedProducts))
                    dispatch(closeConfirmDialog())
                }
            }
        } catch (error) {
            console.log('Delete product error: ', error)
        }
    }

    // ADD IMAGE
    const handleAddImage = () => {
        setValues({ ...values, images: [...values.images, imageUrl] })
        setImageUrl('')
    }

    // DELETE IMAGE
    const handleDeleteImage = (index: number) => {
        console.log('delete: ', index)
        const temp = [...values.images]
        const images = temp.filter((image, i) => i !== index)
        setValues({ ...values, images })
    }

    // useEffect(() => {
    //     if (data) setProducts(data.data)
    // }, [data])

    console.log('PRODUCT VALUES:', values)

    // if (error) return <p>Error: {error}</p>

    return (
        <div className="p-4" id="top">
            <h1 className="dashboardTitle" id="top1">dashboard product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4  mx-auto p-4 border border-gray-500 shadow-lg" id="top2">
                <div className="w-full">
                    <Input label="Product name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} className="py-2 w-full" />
                    <Input label="Description" type="text" multi name="description" value={values.description} onChange={handleChange} error={errors?.description} className="py-2 w-full h-32" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Price(€)" type="number" name="price" value={values.price} onChange={handleChange} error={errors?.price} className="py-2 w-full" />
                        <Input label="Discount(%)" type="number" name="discount" value={values.discount} onChange={handleChange} error={errors?.discount} className="py-2 w-full" />
                    </div>

                    <div className="flex mt-6 flex-wrap">
                        {values.images && values.images.map((image, index) => (
                            <div key={index} className="relative p-3">
                                <div className="w-[100px] max-h-[130px] border shadow-lg">
                                    <img src={image} key={index} alt="product" className="w-full max-h-[130px] filter object-top object-cover" />
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 absolute left-0 top-0 hover:cursor-pointer hover:bg-red-600 hover:text-white transition duration-300 text-red-600 border-gray-200 rounded-full bg-white border p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => handleDeleteImage(index)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end">
                        <div className="flex-auto">
                            <Input label="Image Url" type="text" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.currentTarget.value)} className="py-2 w-full" />
                        </div>
                        <button className="btn h-[43px] ml-4" type="button" onClick={handleAddImage}>Add Image</button>
                    </div>
                    {/* categories, variants and sizes select */}
                    <div className="mt-6">
                        {/* categories */}
                        <div className="flex flex-col">
                            <label htmlFor="categories" className="text-base font-poppins font-semibold tracking-wide capitalize">Category</label>
                            <select name="categories" id="categories" className="form capitalize mt-1" value={values.category} onChange={(e) => setValues({ ...values, category: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories && categories.map(category => (
                                    <option value={category._id} key={category._id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-600 mt-1">{errors.category}</p>}
                        </div>
                        {/* variants */}
                        <div className="mt-6">
                            <p className="text-base font-poppins font-semibold tracking-wide capitalize">Colors</p>
                            <div className="flex flex-col space-y-4 mt-2">
                                {variants && variants.map(variant => (
                                    <div key={variant._id} >
                                        <div className="flex items-center mr-4">
                                            <div className={`h-6 w-6 mr-1`} style={{ backgroundColor: variant.colorHex }} />
                                            <input type="checkbox" value={variant._id} id={variant.name} checked={values.variants.includes(variant._id)} onChange={e => {
                                                if (e.target.checked) {
                                                    setValues({ ...values, variants: [...values.variants, e.target.value] })
                                                } else {
                                                    const temp = values.variants.filter(variant => variant !== e.target.value)
                                                    setValues({ ...values, variants: temp })
                                                }
                                            }} />
                                            <label htmlFor={variant.name} className="capitalize font-bold text-base ml-1">{variant.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.variants && <p className="text-red-600 mt-1">{errors.variants}</p>}
                        </div>
                        {/* sizes */}
                        <div className="mt-6">
                            <p className="text-base font-poppins font-semibold tracking-wide capitalize">Sizes</p>
                            <div className="flex mt-1">
                                {sizes && sizes.map(size => ((
                                    <div key={size._id} className="mr-4 flex items-center">
                                        <input type="checkbox" value={size._id} id={size.name} checked={values.sizes.includes(size._id)} onChange={(e) => {
                                            if (e.target.checked) {
                                                setValues({ ...values, sizes: [...values.sizes, e.target.value] })
                                            } else {
                                                const temp = values.sizes.filter(size => size !== e.target.value)
                                                setValues({ ...values, sizes: temp })
                                            }
                                        }
                                        } />
                                        <label htmlFor={size.name} className="uppercase font-bold text-base ml-1">{size.name}</label>
                                    </div>
                                )))}
                            </div>
                            {errors.sizes && <p className="text-red-600 mt-1">{errors.sizes}</p>}
                        </div>
                    </div>
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
                    {products && products.map(product => (
                        <div className="grid grid-cols-12 px-4 py-3 border-b last:border-b-0 capitalize" key={product._id}>
                            <div className="col-span-10 flex items-center">
                                <p>{product.name}</p>
                            </div>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-indigo-700': !edit.isEdit })} onClick={() => handleEditButtonClick(product)}>Edit</p>
                            <p className={classNames("col-span-1 text-center self-center font-semibold  cursor-pointer ", { 'text-gray-400': edit.isEdit }, { 'text-red-700': !edit.isEdit })} onClick={() => {
                                dispatch(openConfirmDialog({ action: IAction.delete, name: product.name, _id: product._id }))
                                window.scrollTo({ top: 0 });
                            }}>Delete</p>
                        </div>
                    ))}
                    {edit.isEdit && <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-50 cursor-not-allowed" />}

                </div>
            </div>
            {confirm.show && <ConfirmDialog confirm={confirm} closeConfirm={() => dispatch(closeConfirmDialog())} handleDelete={handleDeleteProduct} />}

        </div >
    )
}

export default Product