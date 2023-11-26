import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { removeFromCart } from '../../redux/cartSlice';

export default function Cart() {

    const [total, setTotal] = useState(0)

    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    console.log(cart);

    const removeProduct = (item) => {
        dispatch(removeFromCart(item))
    }

    useEffect(() => {

        let sum = 0;
        cart.forEach(e => {
            console.log(e.price);
            console.log(e.quantity);
            sum += e.price * e.quantity
        });
        setTotal(sum)

    }, [])

    return (
        <>
            {
                (cart.length >= 1) ? (
                    <>
                        <section>
                            <h1>CART</h1>
                            <div className='product'>
                                {
                                    cart && cart.map((e, i) => (
                                        <div key={i} className='cartCard'>
                                            <Card products={e} />
                                            <span>{e.quantity}</span>
                                            <button onClick={() => { removeProduct(e) }}>X</button>
                                        </div>
                                    ))
                                }
                            </div>
                            <div><strong>Total : {total}</strong></div>
                        </section></>
                ) : (<h2>NO ITEMS IN CART</h2>)
            }
        </>
    )
}
