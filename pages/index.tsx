import Head from 'next/head'
import Hero from '../components/homePage/Hero'
import ProductList from '../components/homePage/ProductList'
import { GetStaticProps, GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

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

const Home: NextPage<{ data: IData }> = ({ data }) => {

  return (
    <div >
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Hero />
        <ProductList data={data} />
        {/* {JSON.stringify(data, null, 2)} */}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // get all product
    const apiGetAllProducts = "http://localhost:5001/api/v1/products"
    const res = await axios.get(apiGetAllProducts)

    const data: IData = res.data

    if (!(data && data.status === "success"))
      throw new Error('Can not get the data')

    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Home
