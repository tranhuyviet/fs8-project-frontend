import React from 'react'
import { GetStaticProps, GetServerSideProps, GetStaticPaths, NextPage } from 'next'
import { useAppSelector } from '../../redux/hooks'

const ProductDetailPage = () => {
    const productsEndpoint = useAppSelector(state => state.apiEndpoint.productsEndpoint)
    console.log('CACCC', productsEndpoint)
    return (
        <main className="container py-4">
            <h1>Product detail page</h1>
        </main>
    )
}


// export const getStaticPaths = async () => {

// }

export default ProductDetailPage