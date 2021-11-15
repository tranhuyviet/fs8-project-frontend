import React from 'react'
import { GetStaticProps, GetServerSideProps, GetStaticPaths, NextPage, NextPageContext, GetStaticPropsContext } from 'next'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import axios from 'axios'
import { IProduct } from '../index'

const ProductDetailPage: NextPage<{ product: IProduct }> = ({ product }) => {

    return (
        <main className="container py-4">
            <h1>Product detail page</h1>
        </main>
    )
}


export const getStaticPaths = async () => {
    console.log(process.env.NEXTAUTH_URL)
    const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products`)
    const products: IProduct[] = res.data.data
    const paths = products.map(product => {
        return {
            params: { _id: product._id }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const _id = context.params._id
    const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products/${_id}`)
    const product: IProduct = res.data.data
    if (!product) throw new Error('Can not find the product by provided ID')

    return {
        props: { product }
    }
}

export default ProductDetailPage