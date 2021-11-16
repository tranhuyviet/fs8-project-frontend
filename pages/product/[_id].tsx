import React, { useState } from 'react'
import { GetStaticProps, GetServerSideProps, GetStaticPaths, NextPage, NextPageContext, GetStaticPropsContext } from 'next'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import axios from 'axios'
import { IProduct } from '../index'
import Image from 'next/image'
import Head from 'next/head'

const imageNotAvailable: string = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

const ProductDetailPage: NextPage<{ product: IProduct }> = ({ product }) => {
    const [selectImg, setSelectImg] = useState(product.images[0] || imageNotAvailable)
    const [selectColor, setSelectColor] = useState(product.variants[0].name)
    const [selectSize, setSelectSize] = useState<string>()

    return (
        <main className="container py-4 min-h-[calc(100vh-64px-64px)]">
            <Head>
                <title>Ecommerce Website: {product.name}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-12 ] h-full">
                {/* left side: show list of thumb images */}
                <div className=" col-span-6 flex">
                    <div className="flex-none flex flex-col space-y-4 mr-4 cursor-pointer">
                        {product.images && product.images.map((image, index) => (
                            <img key={index} src={image} alt={product.name} className={`w-[100px] border-gray-700 ${image === selectImg ? 'border shadow-lg' : ''}`} onClick={() => setSelectImg(image)} />
                        ))}
                    </div>
                    {/* center side: show big image, it is result of selected image in left side */}
                    <div className=" flex-auto overflow-hidden">
                        <img src={selectImg} className="w-full object-center object-cover" />
                    </div>
                </div>

                {/* right side: information of product: name, description, price, colors, sizes, add to cart,... */}
                <div className="col-span-6 pl-4">
                    <h1 className="font-poppins text-2xl font-bold tracking-wide">{product.name}</h1>
                    <p className="text-xl">{product.price}€</p>
                    <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                    <p className="text-sm mt-4 ">Color: <span className="font-bold">{selectColor}</span></p>
                    <div className="flex space-x-3 mt-2 ml-1">
                        {product.variants.map(variant => (
                            <div key={variant._id} style={{ width: '20px', height: '20px', backgroundColor: variant.colorHex, cursor: 'pointer' }} className={`${variant.name === selectColor ? 'ring-1 ring-offset-2 ring-gray-700' : ''}`} onClick={() => setSelectColor(variant.name)} />
                        ))}
                    </div>

                    <div className="mt-4 w-full">
                        <select name="sizes" id="sizes" className="form w-full" value={selectSize} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectSize(e.target.value)}>
                            <option value="">Select Size</option>
                            {product.sizes && product.sizes.map(size => (
                                <option value={size._id} key={size._id} >{size.name}</option>
                            ))}

                        </select>
                    </div>

                    <div className="text-center mt-6">
                        <button className="btn w-full">Add to cart</button>
                    </div>


                </div>
            </div>
        </main>
    )
}


export const getStaticPaths = async () => {
    console.log('detail path', process.env.NEXTAUTH_URL)
    const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products`)
    const products: IProduct[] = res.data.data
    const paths = products.map(product => {
        return {
            params: { _id: product._id }
        }
    })
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    console.log('detail props')
    const _id = context.params._id
    const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products/${_id}`)
    const product: IProduct = res.data.data
    if (!product) throw new Error('Can not find the product by provided ID')

    return {
        props: { product },
        revalidate: 5
    }
}

export default ProductDetailPage