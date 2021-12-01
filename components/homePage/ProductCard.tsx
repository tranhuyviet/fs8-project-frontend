import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { IProduct } from '../../redux/slices/productSlice'
import { useRouter } from 'next/router'

const imageNotAvailable = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

const ProductCard: NextPage<{ product: IProduct }> = ({ product }) => {
    const router = useRouter()
    return (
        <div className="hover:cursor-pointer" onClick={() => {
            router.push('/product/' + product._id)
        }}>
            <Image src={product.images[0] || imageNotAvailable} width="240" height="300" alt={product.name} className="object-top object-cover hover:transform transition duration-700 hover:scale-110 " />
            <div className="">

                <h2 className="truncate text-gray-500 font-poppins text-sm mt-2 mb-1">{product.name}</h2>
                <p className="font-semibold text-sm font-poppins">{product.price}€</p>
            </div>
        </div>
    )
}

export default ProductCard
