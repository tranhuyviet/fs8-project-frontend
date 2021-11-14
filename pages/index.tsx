import Head from 'next/head'
import Hero from '../components/homePage/Hero'
import ProductList from '../components/homePage/ProductList'
import { GetStaticProps, GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import Filters from '../components/homePage/Filters'

export interface IData {
  status: string
  total: number
  data: IProduct[]
}

export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  discount: number
  images: string[]
  category: ICategory
  variants: IVariant[]
  sizes: ISize[]
  user: IUser,
  createdAt: string
  updateAt: string
}

export interface ICategory {
  _id: string
  name: string
}

export interface IVariant {
  _id: string
  name: string
}

export interface ISize {
  _id: string
  name: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  image?: string
}

const Home: NextPage<{ products: IProduct[], categories: ICategory[], variants: IVariant[], sizes: ISize[] }> = ({ products, categories, variants, sizes }) => {

  return (
    <div >
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Hero />
        <Filters categories={categories} variants={variants} sizes={sizes} total={products.length as number} />
        <ProductList products={products} />
        {/* {JSON.stringify(data, null, 2)} */}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // get all categories
    const resCategories = await axios.get('http://localhost:5001/api/v1/categories')
    const categories: ICategory[] = resCategories.data.data
    if (!categories) throw new Error('Can not get Categories')

    // get all variants
    const resVariants = await axios.get('http://localhost:5001/api/v1/variants')
    const variants: IVariant[] = resVariants.data.data
    if (!variants) throw new Error('Can not get Variants')

    // get all sizes
    const resSizes = await axios.get('http://localhost:5001/api/v1/sizes')
    const sizes: ISize[] = resSizes.data.data
    if (!sizes) throw new Error('Can not get Sizes')

    // get all product
    const resProducts = await axios.get("http://localhost:5001/api/v1/products")
    const products: IProduct[] = resProducts.data.data
    if (!products) throw new Error('Can not get Products')

    return {
      props: {
        products,
        categories,
        variants,
        sizes
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Home
