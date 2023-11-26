import React from 'react'
import Category from '../../components/category/Category'
import Product from '../../components/Product'
import { useSelector } from 'react-redux'

export default function Homepage() {

    const categories = useSelector(state => state.product.category)

    return (
        <div>
            {(categories.length > 1) && <Category />}
            <Product />
        </div>
    )
}
