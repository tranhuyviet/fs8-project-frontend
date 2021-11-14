import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { IData, IProduct } from '../../pages'

const imageNotAvailable = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

const ProductCard: NextPage<{ product: IProduct }> = ({ product }) => {
    return (
        <div className="">
            <Image src={product.images[0] || imageNotAvailable} width="240" height="300" alt={product.name} className="object-center object-cover hover:transform transition duration-700 hover:scale-110 " />
            <div className="">

                <h2 className="truncate text-gray-600 font-poppins">{product.name}</h2>
                <p className="font-semibold text-base font-poppins">{product.price}€</p>
            </div>
        </div>
    )
}

export default ProductCard
