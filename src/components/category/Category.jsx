import React, { useEffect } from 'react'
import './Category.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryImage } from '../../redux/productSlice'
import { getCategoryItems } from '../../redux/categorySlice'
import { useNavigate } from 'react-router-dom'

export default function Category() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector(state => state.product.category)
    const images = useSelector(state => state.product.categoryimage)

    const handleClick = (item) => {
        dispatch(getCategoryItems(item))
        navigate("/categories")
    }

    useEffect(() => {
        categories.map((e) => {
            dispatch(fetchCategoryImage(e))
        })
    }, [])

    return (
        <>
            <h1>CATEGORY</h1>
            <div className='category'>
                {
                    categories && images && categories.map((e, i) => (
                        <div className='category-list' key={i} onClick={()=>{handleClick(e)}}>
                            <div><img src={images[i]?.thumbnail} alt="" /></div>
                            <p>{e}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
