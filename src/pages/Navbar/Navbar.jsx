import React, { useState } from 'react'
import './Navbar.scss'
import { Drawer, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryItems } from '../../redux/categorySlice';
import Searchbtn from '../../components/searchButton/Searchbtn';

export default function Navbar() {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const categories = useSelector(state => state.product.category)
  const cart = useSelector(state => state.cart.cart)

  const handleClick = (item) => {
    setOpen(!open)
    dispatch(getCategoryItems(item))
    navigate(`/categories/${item}`)
  }

  return (
    <div className='navbar'>

      <h2 onClick={() => navigate("/")}>SHOP</h2>

      <div className='cartbtn'>

        <Searchbtn />

        <IconButton onClick={() => { navigate("/cart") }}><ShoppingCartOutlinedIcon style={{ color: "white" }} />{cart.length > 0 ? <span id='quantity'>{cart.length}</span> : ""}</IconButton>

      </div>

      {pathname == '/cart' ? null : <div className='menu'><IconButton onClick={() => setOpen(true)}><MenuIcon style={{ color: "black" }} /></IconButton></div>}

      <Drawer
        anchor={'left'}
        open={open}
        onClose={() => { setOpen(!open) }}
      >
        <section className='drawer'>
          <h2>SHOP</h2>
          {categories.length >= 1 &&
            categories?.map((e, i) => (
              <div key={i} className='drawerDiv' onClick={() => {
                handleClick(e)
              }}>{e}</div>
            ))
          }
          <img src="main.svg" alt="" srcSet="" />
        </section>
      </Drawer>
      
    </div>
  )
}
