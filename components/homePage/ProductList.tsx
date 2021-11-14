import { NextPage } from 'next';
import React from 'react'
import { IProduct } from '../../pages/index'
import ProductCard from './ProductCard';


const ProductList: NextPage<{ products: IProduct[] }> = ({ products }) => {

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('search...')
    }
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
