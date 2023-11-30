import React, { useEffect, useState } from 'react'
import './SingleProduct.scss'
import { useDispatch, useSelector } from 'react-redux';
import Related from '../relatedProducts/Related';
import { addToCart } from '../../redux/cartSlice';
import { Snackbar } from '@mui/material';
import Message from '../message/Message';
import { fetchSingleProduct } from '../../redux/categorySlice';
import { useParams } from 'react-router-dom';

export default function SingleProduct() {

    const [quantity, setQuantity] = useState(1)
    const [snack, setSnack] = useState(false)
    const [add, setAdd] = useState(false)
    const [largeImg, setLargeImg] = useState(false)
    const [largeImgSrc, setLargeImgSrc] = useState(null)
    const { category, title } = useParams()
    const dispatch = useDispatch()

    const items = useSelector(state => state.categoryitems.singleProduct)
    
    const handleAddToCart = (items) => {
        dispatch(addToCart({ ...items, quantity: quantity }))
        setSnack(true)
        setTimeout(() => {
            setSnack(false)
        }, 2000);
    }

    const handleImage = (link) => {
        setLargeImg(true)
        setLargeImgSrc(link)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchSingleProduct({ category, title }))
    }, [title])


    return (
        <>
            {
                items &&
                <>
                    <h1>{items?.title?.toUpperCase()}</h1>

                    <section className='single'>

                        <div className='product'>
                            {items && <img className='productImg' src={items.thumbnail} />}
                            <div className='handle'>

                                <div className='addQuantity'>
                                    <button disabled={quantity === 1} onClick={() => { setQuantity(quantity - 1) }}>-</button>
                                    <strong>{quantity}</strong>
                                    <button onClick={() => { setQuantity(quantity + 1) }}>+</button>
                                </div>

                                <div className='addbtn'>
                                    {!add ? <button onClick={() => {
                                        handleAddToCart(items)
                                        setAdd(true)
                                    }}>ADD TO CART</button> : <button>ADDED</button>}
                                </div>

                            </div>
                        </div>

                        <section>
                            {
                                items &&
                                <div className='extraFeatures'>

                                    <div><span>Brand : </span>{items.brand}</div>

                                    <div><span>Category :</span> {items.category}</div>

                                    <div><span>Description :</span> {items.description}</div>

                                    <div><span>Price : </span>${items.price}</div>

                                    <div><span>Stock : </span>{items.stock}</div>

                                    <div className='extraImages'>{items?.images.map((e, i) => (
                                        <div key={i} onClick={() => handleImage(e)}><img src={e} alt="" srcSet="" /></div>
                                    ))}</div>

                                </div>
                            }

                        </section>
                    </section>

                    <section>
                        <Message title={items?.title} />
                    </section>

                    <section>
                        <Related setAdd={setAdd} setQuantity={setQuantity} />
                    </section>

                    <Snackbar
                        open={snack}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <strong className='snack'>Added</strong>
                    </Snackbar>

                    {
                        largeImg &&
                        <>
                            <section className='largeImg' onClick={() => setLargeImg(false)}>
                                <div><img src={largeImgSrc} alt="" srcSet="" /></div>
                            </section>
                        </>
                    }
                </>
            }
        </>
    )
}
