import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { removeFromCart } from '../../redux/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Expand } from '@mui/icons-material';
import { Drawer } from '@mui/material';

export default function Cart() {

    const [total, setTotal] = useState(0)
    const [expand, setExpand] = useState(false)

    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    const removeProduct = (item) => {
        dispatch(removeFromCart(item))
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
                                            {/* <span>{e.quantity}</span> */}
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
        </div>
    )
}
