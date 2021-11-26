import { useState, useEffect } from 'react'
import Head from 'next/head'
import Hero from '../components/homePage/Hero'
import ProductList from '../components/homePage/ProductList'
import { GetStaticProps, GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import Filters from '../components/homePage/Filters'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setFilterProductEndpoint } from '../redux/slices/apiEnpointSlice'
import { login } from '../redux/slices/authSlice'

import jwtDecode from 'jwt-decode'
import mongoose from 'mongoose'
import { IUser as IUserAuth } from '../redux/slices/authSlice'

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
  _id?: string
  name: string
  global?: string
}

export interface IVariant {
  _id: string
  name: string
  colorHex: string
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

export interface IProductFilter {
  page: number
  limit: number
  name?: string
  category?: string
  variant?: string
  size?: string
}

const Home: NextPage<{ categories: ICategory[], variants: IVariant[], sizes: ISize[], rootUrl: string, user: IUserAuth }> = ({ categories, variants, sizes, rootUrl, user }) => {
  const dispatch = useAppDispatch()

  // console.log('USER INDEX', user)
  if (user) {
    dispatch(login(user))
  }
  // set products endpoint
  // dispatch(setProductsEndpoint(rootUrl + "/products"))

  const [filter, setFilter] = useState<IProductFilter>({
    page: 1,
    limit: 10
  })

  useEffect(() => {
    let newUrl = '/products?'
    if (filter.page) newUrl = newUrl + '&page=' + filter.page
    if (filter.limit) newUrl = newUrl + '&limit=' + filter.limit
    if (filter.category) newUrl = newUrl + '&category=' + filter.category
    if (filter.variant) newUrl = newUrl + '&variant=' + filter.variant
    if (filter.size) newUrl = newUrl + '&size=' + filter.size
    if (filter.name) newUrl = newUrl + '&name=' + filter.name
    dispatch(setFilterProductEndpoint(rootUrl + newUrl))
  }, [filter, rootUrl, dispatch])

  console.log('INDEX RENDER')

  return (
    <div >
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Hero />
        <Filters categories={categories} variants={variants} sizes={sizes} filter={filter} setFilter={setFilter} />
        <ProductList />
        {/* {JSON.stringify(data, null, 2)} */}
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  try {

    const rootUrl = process.env.BASE_ENDPOINT_URL

    // get all categories
    const resCategories = await axios.get(`/categories`)
    const categories: ICategory[] = resCategories.data.data
    if (!categories) throw new Error('Can not get Categories')

    // get all variants
    const resVariants = await axios.get('/variants')
    const variants: IVariant[] = resVariants.data.data
    if (!variants) throw new Error('Can not get Variants')

    // get all sizes
    const resSizes = await axios.get('/sizes')
    const sizes: ISize[] = resSizes.data.data
    if (!sizes) throw new Error('Can not get Sizes')

    // // get all product
    // const resProducts = await axios.get("http://localhost:5001/api/v1/products/?page=1&limit=10")
    // const products: IProduct[] = resProducts.data.data
    // if (!products) throw new Error('Can not get Products')

    const token = context.req.cookies.ecommerceJwt
    let user: IUserAuth = null
    if (token && token !== 'loggedout') {
      user = jwtDecode(token)
    }

    return {
      props: {
        rootUrl,
        categories,
        variants,
        sizes,
        user
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Home
