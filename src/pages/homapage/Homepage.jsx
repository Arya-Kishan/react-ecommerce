import React, { useState } from 'react'
import './Homepage.scss'
import Category from '../../components/category/Category'
import Product from '../../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSearchItem } from '../../redux/searchSlice'
import { Drawer } from '@mui/material'

export default function Homepage() {

    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const categories = useSelector(state => state.product.category)

    const handleSearch = () => {
        dispatch(fetchSearchItem(input.toLowerCase()))
        navigate("/search")
        setInput("")
    }


    return (
        <div className='banner'>
            <section className='home'>

                <div>

                    <h1>SALES</h1>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed ea nostrum velit ab quia, laborum possimus pariatur voluptates facilis culpa!</p>

                    <button onClick={()=>{setOpen(true)}}>SEACRH</button>

                </div>

                <div>
                    <img src="main.svg" alt="" />
                </div>

            </section>

            <section>
                {(categories.length > 1) && <Category />}
            </section>
            <section><Product /></section>

            <Drawer
                anchor={'bottom'}
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <div className='searchDrawer'><input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" /><button onClick={handleSearch}>Search</button></div>
            </Drawer>

        </div>
    )
}
