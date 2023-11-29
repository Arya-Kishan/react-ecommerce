import React, { useEffect, lazy, Suspense } from 'react'
import './App.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getCategory, getCategoryImages } from './redux/productSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// const Details = lazy(() => (import('./pages/Details/Details')))
const Homepage = lazy(() => (import('./pages/homapage/Homepage')))
const Categories = lazy(() => (import('./pages/categories/Categories')))
const SingleProduct = lazy(() => (import('./pages/singleProduct/SingleProduct')))
const Cart = lazy(() => (import('./pages/cart/Cart')))
const Navbar = lazy(() => (import('./pages/Navbar/Navbar')))
const Search = lazy(() => (import('./pages/search/Search')))


export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategory1 = async () => {

      const { data } = await axios.get(`https://dummyjson.com/products/categories`)

      dispatch(getCategory(data))
      let arr1 = [];

      data.slice(0, 4).forEach(async (e, i) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${e}`)
        arr1.push(...data?.products?.slice(1, 2));
        if (i == 3) {
          dispatch(getCategoryImages(arr1))
        }
      });

    }
    fetchCategory1()
  }, [])


  return (
    <div className='app'>
      <BrowserRouter>
        <Suspense fallback={<span><img className='loader' src="loading1.svg" alt="" srcSet="" /></span>} >
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/categories/:categoryName' element={<Categories />} />
            <Route path='/singleProduct' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
