import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { removeFromCart } from '../../redux/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Drawer } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import {loadStripe} from '@stripe/stripe-js';

export default function Cart() {

    const [total, setTotal] = useState(0)
    const [expand, setExpand] = useState(false)

    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();

    const removeProduct = (item) => {
        dispatch(removeFromCart(item))
    }

    const handlePayment = async () => {
        const stripe = await loadStripe("pk_test_51OTSOaSCLk89VVV2y65ICM1KafKVLbOIhdp06xHCYFST0x3lQGymFiCjyl2Ji6qOcmmugvwPipgsLxtF6bDOhcNM00Msw33mYG")
        console.log(cart);

        let res = await fetch("https://aryabackend.onrender.com/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(cart)
        })

        const session = await res.json();
        console.log(session);

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });

    }

    useEffect(() => {

        let sum = 0;
        cart.forEach(e => {
            sum += e.price * e.quantity
        });
        setTotal(sum)

    }, [cart])

    return (
        <div className='cartMain'>
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

                                            <button onClick={() => { removeProduct(e) }}><DeleteIcon style={{ color: "white", width: "18px" }} /></button>

                                        </div>
                                    ))
                                }
                            </div>

                            <div className='total' onClick={() => setExpand(true)}>
                                <strong>Total : ${total}</strong>
                                <strong><ExpandLessIcon /></strong>
                                <strong>Items : {cart.length}</strong>
                            </div>
                        </section>

                        <Drawer open={expand} onClose={() => setExpand(false)} anchor='bottom'>
                            <section className='tableDraw'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Sum</th>
                                        </tr>
                                        {
                                            cart && cart.map((e, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.title}</td>
                                                    <td>${e.price}</td>
                                                    <td>{e.quantity}</td>
                                                    <td>${e.quantity * e.price}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                            <div id='tableTotal'><strong>Total : ${total}</strong></div>
                        </Drawer>
                    </>
                ) : (<h2>NO ITEMS IN CART</h2>)
            }

            <div className="pay">
                <button onClick={handlePayment}><PaidIcon />CHECKOUT</button>
            </div>
        </div>
    )
}
