import React, { useEffect } from 'react'
import './Category.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryItems } from '../../redux/categorySlice'
import { useNavigate } from 'react-router-dom'

export default function Category() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector(state => state.product.category)
    const images = useSelector(state => state.product.categoryimage)
    // console.log(images);

    const handleClick = (item) => {
        dispatch(getCategoryItems(item))
        navigate("/categories")
    }

    return (
        <>
            <div className='category'>
                {
                    categories && images && categories.slice(0,4).map((e, i) => (
                        <div className='category-list' key={i} onClick={()=>{handleClick(e)}}>
                            <div><img src={images[i]?.thumbnail} alt="" /></div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
