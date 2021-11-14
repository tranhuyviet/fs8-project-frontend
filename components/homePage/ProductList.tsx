import { NextPage } from 'next';
import React, { useState } from 'react'
import { IProduct } from '../../pages/index'
import ProductCard from './ProductCard';
import useSWR from 'swr'
import axios from 'axios'
import ReactLoading from 'react-loading'


const fetchProducts = async (url: string) => {
    try {
        // get all product
        const resProducts = await axios.get(url)
        const products: IProduct[] = resProducts.data.data
        if (!products) throw new Error('Can not get Products')

        return products
    } catch (error) {
        console.log('Fetch product error: ', error)
    }
}

const ProductList: NextPage<{ url: string }> = ({ url }) => {

    console.log('URL: ', url)
    const { data, error } = useSWR(url, fetchProducts)
    const products = data
    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('search...')
    }

    if (error) return <p>Loading products error...</p>
    if (!data) return (<div className="w-full flex justify-center py-4">
        <ReactLoading type="bars" color="#6B7280" />
    </div>)
    return (
        <section className="mt-2">
            {/* list of products */}
            <div className="py-8 grid grid-cols-4 gap-x-6 gap-y-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default ProductList
