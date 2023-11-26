import React, { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { fetchCategory } from './redux/productSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homapage/Homepage'
import Categories from './pages/categories/Categories'
import SingleProduct from './pages/singleProduct/singleProduct'
import Cart from './pages/cart/Cart'
import Navbar from './pages/Navbar/Navbar'

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])


  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/singleProduct' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
