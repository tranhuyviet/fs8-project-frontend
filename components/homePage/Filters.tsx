import { NextPage } from 'next'
import React, { useState } from 'react'
import { ICategory, ISize, IVariant, IProductFilter } from '../../pages'

const Filters: NextPage<{ categories: ICategory[], variants: IVariant[], sizes: ISize[], filter: IProductFilter, setFilter: React.Dispatch<IProductFilter> }> = ({ categories, variants, sizes, filter, setFilter }) => {
    const [category, setCategory] = useState<string>()
    const [variant, setVariant] = useState<string>()
    const [size, setSize] = useState<string>()
    const [name, setName] = useState<string>()

    // filter by category handler
    const filterCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        setFilter({ ...filter, category: e.target.value })
    }

    // filter by variant handler
    const filterVariantHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVariant(e.target.value)
        setFilter({ ...filter, variant: e.target.value })
    }

    // filter by size handler
    const filterSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(e.target.value)
        setFilter({ ...filter, size: e.target.value })
    }

    // search by product name
    const searchByNameHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setFilter({ ...filter, name })
    }

    return (
        <section className="mt-8">
            <h1 className="title">Our Product</h1>
            {/* <h2 className="text-base mt-2">Total: <span className="font-bold">{total}</span> products</h2> */}
            <form onSubmit={searchByNameHandler}>
                <div className="flex flex-col items-center mt-4 md:flex-row">
                    {/* INPUT SEARCH */}
                    <div className="relative h-[42px] flex-auto w-full md:flex-auto">
                        <input type="search" placeholder="search product" className="search-input w-full form" onChange={(e) => setName(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-[10px] left-2 inset-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-wrap w-full md:flex-nowrap md:w-auto md:ml-2">
                        {/* CATEGORY SELECT BOX */}
                        <div>
                            <select name="categories" id="categories" className="form uppercase text-xs mt-2 mr-2 md:text-sm md:mt-0" value={category} onChange={filterCategoryHandler} >
                                <option value="">Categories</option>
                                {categories && categories.map(category => (
                                    <option value={category._id} key={category._id}>{category.name}</option>
                                ))}

                            </select>
                        </div>
                        {/* VARIANT SELECT BOX */}
                        <div>
                            <select name="variants" id="variants" className="form uppercase text-xs mt-2 mr-2 md:text-sm md:mt-0" value={variant} onChange={filterVariantHandler}>
                                <option value="">Colors</option>
                                {variants && variants.map(variant => (
                                    <option value={variant._id} key={variant._id}>{variant.name}</option>
                                ))}

                            </select>
                        </div>
                        {/* SIZE SELECT BOX */}
                        <div>
                            <select name="sizes" id="sizes" className="form uppercase text-xs mt-2 md:text-sm md:mt-0" value={size} onChange={filterSizeHandler}>
                                <option value="">Sizes</option>
                                {sizes && sizes.map(size => (
                                    <option value={size._id} key={size._id}>{size.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Filters
