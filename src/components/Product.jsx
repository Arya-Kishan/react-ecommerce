import React, { useEffect } from 'react'
import './Product.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct } from '../redux/productSlice'
import Card from './card/Card'

export default function Product() {

    const dispatch = useDispatch()

    const { products } = useSelector(state => state.product.product)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    return (
        <>
            <h1>POPULAR</h1>
            <div className='product'>
                {
                    products && products?.slice(0, 15).map((e, i) => (
                        <Card products={e} key={i}/>
                    ))
                }
            </div>
        </>
    )
}
