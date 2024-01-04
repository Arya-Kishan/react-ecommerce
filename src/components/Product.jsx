import React, { useEffect, useRef, useState } from 'react'
import './Product.scss'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct } from '../redux/productSlice'
import Card from './card/Card'
import Filter from './filter/Filter'
import { Pagination } from '@mui/material'

export default function Product() {

    const { products: getProducts } = useSelector(state => state.product.product)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()
    const boxRef = useRef(null)
    const otherBoxRef = useRef(null)

    const handlePage = async (event, value) => {
        console.log(boxRef.current.clientHeight);
        setProduct(null)
        let { data } = await axios.get(`https://dummyjson.com/products?limit=14&skip=${(value - 1) * 14}`);
        setProduct(data?.products);
    }

    useEffect(() => {
        setProduct(getProducts)
    }, [getProducts])

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    return (
        <div className='mainProducts'>

            <div className='productHeading'>
                <h1>POPULAR</h1>
                <Filter product={product} setProduct={setProduct} />
            </div>

            <div className='product' ref={boxRef}>
                {
                    product ? product?.map((e, i) => (
                        <Card products={e} key={i} />
                    )) : (<div className='otherProduct' style={{height:boxRef.current?.clientHeight}}></div>)
                }
            </div>

            <div className='pagination'>
                <Pagination count={7} variant="outlined" color="primary" onChange={handlePage} />
            </div>

        </div>
    )
}
