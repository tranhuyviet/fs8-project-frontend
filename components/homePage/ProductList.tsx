import { NextPage } from 'next';
import React, { useEffect } from 'react'
import { IProduct } from '../../pages/index'
import ProductCard from './ProductCard';
import useSWR from 'swr'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setProducts } from '../../redux/slices/productSlice'
import fetchApi from '../../utils/fetchApi'


const ProductList = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.products.products)
    const apiEnpoint = useAppSelector(state => state.apiEndpoint.filterProductEndpoint)
    // console.log('URL: ', apiEnpoint)
    const { data, error } = useSWR(apiEnpoint, fetchApi)

    useEffect(() => {
        if (data && data.data) dispatch(setProducts(data.data))
    }, [data, dispatch])

    if (error) return <p>Loading products error...</p>
    if (!data) return (<div className="w-full flex justify-center items-center mt-2 min-h-[calc(100vh-64px-64px-272px-90px-32px-25px)]">
        <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600">LOADING PRODUCTS</p>
            <ReactLoading type="bars" color="#6B7280" />
        </div>
    </div>)

    // const products = data.data
    console.log('PRODUCTS: ', products)
    return (
        <section className="mt-2 min-h-[calc(100vh-64px-64px-272px-90px-32px-25px)]">
            {/* list of products */}
            <div className="grid grid-cols-4 py-8 gap-x-6 gap-y-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default ProductList
