import { NextPage } from 'next';
import React from 'react'
import { IData } from '../../pages/index'
import ProductCard from './ProductCard';


const ProductList: NextPage<{ data: IData }> = ({ data }) => {
    const total = data.total
    const products = data.data
    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('search...')
    }
    return (
        <section className="mt-8">
            <h1 className="title">Our Product</h1>
            <h2 className="text-base mt-2">Total: <span className="font-bold">{total}</span> products</h2>
            {/* search and filter */}
            <form onSubmit={handleSubmitSearch} className="mt-4">
                <div className="relative  h-[42px] ">
                    <input type="search" placeholder="search product" className="search-input" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-[10px] left-2 inset-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </form>

            {/* list of products */}
            <div className="py-8 grid grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default ProductList
