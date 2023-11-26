import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getsingleproduct } from '../../redux/categorySlice'
import { useDispatch } from 'react-redux'
import { getRelatedItems } from '../../redux/categorySlice'

export default function Card({ products }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleClick = (item) => {
        dispatch(getsingleproduct(item))
        dispatch(getRelatedItems({ category: item.category, product: item }))
        navigate("/singleProduct")
    }

    return (
        <div>
            {products &&
                <div className='card' onClick={() => { handleClick(products) }}>
                    <div><img src={products.thumbnail} alt="" /></div>
                    <div>{products.title}</div>
                    <div><strong>${products.price}</strong></div>
                    <div>{products.rating}</div>
                </div>
            }
        </div>
    )
}
