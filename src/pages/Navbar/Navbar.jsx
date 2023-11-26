import React from 'react'
import './Navbar.scss'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

export default function Navbar() {

    const navigate = useNavigate()

  return (
    <div className='navbar'>
      <h2>SHOP</h2>
      <IconButton onClick={()=>{navigate("/cart")}}><ShoppingCartOutlinedIcon style={{color:"white"}}/></IconButton>
    </div>
  )
}
