import React, { useEffect, useState } from 'react'
// import { GetStaticProps, GetServerSideProps, GetStaticPaths, NextPage, NextPageContext, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import { useAppSelector } from '../../redux/hooks'
import { IProduct } from '../../redux/slices/productSlice'
import ProductCard from '../../components/homePage/ProductCard'

const imageNotAvailable: string = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

//const ProductDetailPage: NextPage<{ product: IProduct }> = ({ product }) => {
const ProductDetailPage = () => {
    const router = useRouter()
    const _id = router.asPath.split('product/')[1]
    const { data: productData, error } = useSWR(`/products/${_id}`, fetchApi)

    const [selectImg, setSelectImg] = useState<string>(imageNotAvailable)
    const [selectColor, setSelectColor] = useState<string>('')
    const [selectSize, setSelectSize] = useState<string>('')

    const product = productData?.data.product
    const productsSuggess = productData?.data.productsSuggess
    console.log(productsSuggess)
    useEffect(() => {
        if (product) {
            setSelectImg(product.images[0])
            setSelectColor(product.variants[0].name)
        }
    }, [product])

    if (error) return <p>Something went wrong. Please try again.</p>
    if (!productData) return (<div className="w-full flex justify-center items-center mt-2 min-h-[calc(100vh-64px-64px-272px-90px-32px-25px)]">
        <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600">LOADING PRODUCT</p>
            <ReactLoading type="bars" color="#6B7280" />
        </div>
    </div>)

    return (
        <main className="container py-4">
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
                    <p className="text-xl mt-2 font-semibold">{product.price}€</p>
                    <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                    <p className="text-sm mt-4 ">Color: <span className="font-bold">{selectColor}</span></p>
                    <div className="flex space-x-3 mt-2 ml-1">
                        {product.variants.map(variant => (
                            <div key={variant._id} style={{ width: '20px', height: '20px', backgroundColor: variant.colorHex, cursor: 'pointer' }} className={`${variant.name === selectColor ? 'ring-1 ring-offset-2 ring-gray-700' : ''}`} onClick={() => setSelectColor(variant.name)} />
                        ))}
                    </div>

                    <div className="mt-6 w-full">
                        <select name="sizes" id="sizes" className="form w-full uppercase" value={selectSize} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectSize(e.target.value)}>
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
            {/* PRODUCTS SUGGESSION */}
            <div className="mb-6">
                <p className="text-xl font-semibold tracking-wide mt-4">Similar items</p>
                <p className="text-base text-gray-500">How about these?</p>
                <div className="grid grid-cols-4 mt-4 ">
                    {productsSuggess && productsSuggess.map(product => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </main>
    )
}


// export const getStaticPaths = async () => {
//     console.log('detail path', process.env.NEXTAUTH_URL)
//     const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products`)
//     const products: IProduct[] = res.data.data
//     const paths = products.map(product => {
//         return {
//             params: { _id: product._id }
//         }
//     })
//     return {
//         paths,
//         fallback: true
//     }
// }

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
//     console.log('detail props')
//     const _id = context.params._id
//     const res = await axios.get(`${process.env.BASE_ENDPOINT_URL}/products/${_id}`)
//     const product: IProduct = res.data.data
//     if (!product) throw new Error('Can not find the product by provided ID')

//     return {
//         props: { product },
//         revalidate: 5
//     }
// }

export default ProductDetailPage