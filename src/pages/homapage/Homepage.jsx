import React, { useState } from 'react'
import './Homepage.scss'
import Category from '../../components/category/Category'
import Product from '../../components/Product'
import { useSelector } from 'react-redux'
import AppleIcon from '@mui/icons-material/Apple';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Snackbar } from '@mui/material'
import banner2 from '../../assets/banner2.png'

export default function Homepage() {

    const [snack, setSnack] = useState(false)

    const categories = useSelector(state => state.product.category)

    const handleSnack = (e) => {
        e.target.previousSibling.value = '';
        setSnack(true)
        setTimeout(() => {
            setSnack(false)
        }, 2000);
    }

    return (
        <div className='banner'>
            <section className='home'>

                <div>

                    <h1>STORE</h1>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed ea nostrum velit ab quia, laborum possimus pariatur voluptates facilis culpa!</p>

                    <a href='#category'>SHOP</a>

                </div>

                <div>
                    <img src={banner2} alt="" />
                </div>

                <div className="circle1"></div>
                <div className="circle2"></div>

            </section>

            <section id='category'>
                {(categories.length > 1) && <Category />}
            </section>

            <section><Product /></section>

            <section className='signUp'>
                <div>
                    <h2>Sign Up For News</h2>
                    <span>Get E-mail updates about our latest products and special offer</span>
                </div>
                <div>
                    <input type="email" name="" id="" />
                    <button onClick={handleSnack}>Sign Up</button>
                </div>
            </section>

            <section className='footer'>

                <div>
                    <h1>ARYA SHOP</h1>
                    <p>Contact</p>
                    <div><strong>Address :</strong>562 Wellington Road, Street 32, San Francisco</div>
                    <div><strong>Phone :</strong>+01 2222 365/(+91)01 2345 66789</div>
                    <div><strong>Hours :</strong> 10:00 - 18:00 , Mon - Sat</div>
                </div>

                <div>
                    <p>About</p>
                    <div>About Us</div>
                    <div>Delivery Options</div>
                    <div>Privacy Policy</div>
                    <div>Terms & Conditions</div>
                    <div>Contact Us</div>
                </div>

                <div>
                    <p>My Account</p>
                    <div>Sign In</div>
                    <div>View Cart</div>
                    <div>My Wishlist</div>
                    <div>Track MyOrder</div>
                    <div>Help</div>
                </div>

                <div>
                    <p>Install App</p>
                    <p>From App Store or Google Play</p>
                    <div className='apps'>
                        <div><Button href='https://www.apple.com/in/app-store/' startIcon={<AppleIcon />} >App Store</Button></div>
                        <div><Button href='https://play.google.com/store/games?hl=en&gl=US&pli=1' startIcon={<PlayArrowIcon />} >Google Play</Button></div>
                    </div>
                </div>

            </section>

            <section className='copyright'>
                @ All rights reserved to Owner : Mater Arya The Great
            </section>

            <Snackbar
                open={snack}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                className='snack'
            >
                <div>Sent</div>
            </Snackbar>

        </div>
    )
}
