import React, { useEffect, useState } from 'react'
import './Product.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct } from '../redux/productSlice'
import Card from './card/Card'
import Filter from './filter/Filter'

export default function Product() {

    const { products: getProducts } = useSelector(state => state.product.product)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setProduct(getProducts)
    }, [getProducts])

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    return (
        <>
            <div className='productHeading'>
                <h1>POPULAR</h1>
                <Filter product={product} setProduct={setProduct} />
            </div>
            <div className='product'>
                {
                    product && product?.slice(0, 15).map((e, i) => (
                        <Card products={e} key={i} />
                    ))
                }
            </div>
        </>
    )
}
