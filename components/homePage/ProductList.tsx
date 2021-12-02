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
import Pagination from './Pagination';


const ProductList = ({ filter, setFilter }) => {
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
    // console.log('PRODUCTS: ', data)
    return (
        <section className="min-h-[calc(100vh-64px-64px-272px-90px-32px-25px)]">
            <p className="text-gray-500 mt-4 text-base font-poppins">{data.total} products</p>
            {/* list of products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 pt-6 pb-8 sm:gap-x-6 gap-y-6">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <Pagination filter={filter} setFilter={setFilter} total={data.total} />
        </section>
    )
}

export default ProductList
