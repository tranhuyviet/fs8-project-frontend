import { useState, useEffect } from 'react'
import Head from 'next/head'
import Hero from '../components/homePage/Hero'
import ProductList from '../components/homePage/ProductList'
import { NextPage } from 'next'
import axios from 'axios'
import Filters from '../components/homePage/Filters'

import { useAppDispatch } from '../redux/hooks'
import { setFilterProductEndpoint } from '../redux/slices/apiEnpointSlice'
import { login } from '../redux/slices/authSlice'

import jwtDecode from 'jwt-decode'
import { IUser as IUserAuth } from '../redux/slices/authSlice'

export interface IData {
  status: string
  total: number
  data: IProduct[]
}

export interface IProduct {
  _id?: string
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
  global?: string
}

export interface ICategory {
  _id?: string
  name: string
  global?: string
}

export interface IVariant {
  _id?: string
  name: string
  colorHex: string
  global?: string
}

export interface ISize {
  _id?: string
  name: string
  global?: string
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

const Home: NextPage<{ categories: ICategory[], variants: IVariant[], sizes: ISize[], user: IUserAuth }> = ({ categories, variants, sizes, user }) => {
  const dispatch = useAppDispatch()

  // console.log('USER INDEX', user)
  if (user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    dispatch(login(user))
  }


  const [filter, setFilter] = useState<IProductFilter>({
    page: 1,
    limit: 9
  })

  useEffect(() => {
    let newUrl = '/products?'
    if (filter.page) newUrl = newUrl + '&page=' + filter.page
    if (filter.limit) newUrl = newUrl + '&limit=' + filter.limit
    if (filter.category) newUrl = newUrl + '&category=' + filter.category
    if (filter.variant) newUrl = newUrl + '&variant=' + filter.variant
    if (filter.size) newUrl = newUrl + '&size=' + filter.size
    if (filter.name) newUrl = newUrl + '&name=' + filter.name
    dispatch(setFilterProductEndpoint(newUrl))
  }, [filter, dispatch])

  // console.log('INDEX RENDER')

  return (
    <div >
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <main className="container">
        <Filters categories={categories} variants={variants} sizes={sizes} filter={filter} setFilter={setFilter} />
        <ProductList filter={filter} setFilter={setFilter} />
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  try {

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
      user.token = token
    }

    return {
      props: {
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
