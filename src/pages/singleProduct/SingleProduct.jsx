import React, { useState } from 'react'
import './SingleProduct.scss'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import Related from '../relatedProducts/Related';
import { addToCart } from '../../redux/cartSlice';

export default function SingleProduct() {

    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const items = useSelector(state => state.categoryitems.singleitem)

    const handleAddToCart = (items) => {
        dispatch(addToCart({ ...items, quantity: quantity }))
    }


    return (
        <>
            <h1>SINGLE PRODUCT</h1>

            <section className='single'>

                <div className='product'>
                    {items && <Card products={items} />}
                </div>

                <div className='handle'>
                    <div className='addQuantity'>
                        <span>Quanity</span>
                        <button disabled={quantity === 1} onClick={() => { setQuantity(quantity - 1) }}>-</button>
                        <strong>{quantity}</strong>
                        <button onClick={() => { setQuantity(quantity + 1) }}>+</button>
                    </div>

                    <div>
                        <button onClick={() => { handleAddToCart(items) }}>ADD TO CART</button>
                    </div>
                </div>

            </section>

            <section>
                <Related />
            </section>
        </>
    )
}
