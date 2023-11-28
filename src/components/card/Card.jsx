import React from 'react'
import './Card.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom'
import { getsingleproduct } from '../../redux/categorySlice'
import { useDispatch } from 'react-redux'
import { getRelatedItems } from '../../redux/categorySlice'
import StarIcon from '@mui/icons-material/Star';

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

                    <div> <LazyLoadImage effect="blur" src={products.thumbnail} />
                    </div>

                    <div id='title'>
                        {products.title.split(" ").slice(0, 3).join(" ")}
                    </div>

                    <div className='price'>
                        <div><strong>${products.price}</strong></div>
                        <div><StarIcon style={{ color: 'gold' }} />{products.rating}</div>
                    </div>

                </div>
            }
        </div>
    )
}
