import { NextPage } from 'next'
import React, { useState } from 'react'
import { ICategory, ISize, IVariant, IProductFilter } from '../../pages'

const Filters: NextPage<{ categories: ICategory[], variants: IVariant[], sizes: ISize[], filter: IProductFilter, setFilter: React.Dispatch<IProductFilter> }> = ({ categories, variants, sizes, filter, setFilter }) => {
    const [category, setCategory] = useState<string>()

    const filterCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        setFilter({ ...filter, category: e.target.value })
        //     const newUrl = url + '&category=' + e.target.value
        //    setUrl(newUrl)
    }


    console.log(category)
    return (
        <section className="mt-8">
            <h1 className="title">Our Product</h1>
            {/* <h2 className="text-base mt-2">Total: <span className="font-bold">{total}</span> products</h2> */}
            <form>
                <div className="flex items-center space-x-4 mt-4">
                    <div className="relative  h-[42px] flex-auto ">
                        <input type="search" placeholder="search product" className="search-input w-full form" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-[10px] left-2 inset-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <select name="categories" id="categories" className="form" value={category} onChange={filterCategoryHandler}>
                            <option value="">All Categories</option>
                            {categories && categories.map(category => (
                                <option value={category._id} key={category._id} >{category.name}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <select name="variants" id="variants" className="form">
                            <option value="">All Colors</option>
                            {variants && variants.map(variant => (
                                <option value={variant._id} key={variant._id} >{variant.name}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <select name="sizes" id="sizes" className="form">
                            <option value="">All Sizes</option>
                            {sizes && sizes.map(size => (
                                <option value={size._id} key={size._id} >{size.name}</option>
                            ))}

                        </select>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Filters
