import React, { useRef, useState } from 'react'
import './Message.scss'
import PersonIcon from '@mui/icons-material/Person';
import ThreePIcon from '@mui/icons-material/ThreeP';
import AddIcon from '@mui/icons-material/Add';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import StarIcon from '@mui/icons-material/Star';
import { Drawer, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFirebaseData, getFirebaseData } from '../../redux/firebase/firebaseSlice';
import dayjs from 'dayjs'

export default function Message({ title }) {

    const [drawer, setDrawer] = useState(false)
    const [input, setInput] = useState("")
    const [review, setReview] = useState(false)
    const [rating, setRating] = useState(1)
    const check = useRef()
    const Date1 = new Date();
    const date = dayjs(Date1).format("DD MMM");
    console.log(date);


    const dispatch = useDispatch()

    const message = useSelector(state => state.firebase.getMessage)
    console.log(message);

    const handleAddFirebase = () => {
        dispatch(addFirebaseData({ title, rating, date, message: input }))
        dispatch(getFirebaseData(title))
        setDrawer(false)
        setInput('')
    }

    const handleGetData = () => {
        dispatch(getFirebaseData(title))
        setReview(true)
        check.current.style.display = "none";
    }

    const convertNumArr = (num)=>{
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(<StarIcon key={i} style={{ color: 'gold',width:'12px' }} />)
        }
        return arr;
    }

    return (
        <div className='reviewMain'>

            <button onClick={handleGetData} className='checkBtn' ref={check}>CHECK REVIEWS <ThreePIcon /></button>

            {
                review &&
                <>
                    <h1>REVIEWS</h1>

                    <div className='messageMain'>
                        {
                            message?.length >= 1 ? (<>

                                {
                                    message?.map((e, i) => (
                                        <section className='review' key={i}>
                                            <div><PersonIcon />User</div>
                                            <div>{convertNumArr(e?.rating)}</div>
                                            <div>{e.message}</div>

                                            <div>{e?.date}</div>
                                        </section>
                                    ))
                                }

                            </>) : (<div className='sad'>NO REVIEW<SentimentVeryDissatisfiedIcon /></div>)
                        }


                        <p onClick={() => setDrawer(true)} className='addReviewBtn'>
                            ADD
                        </p>

                    </div>

                    <Drawer
                        anchor='bottom'
                        open={drawer}
                        onClose={() => setDrawer(false)}
                    >

                        <div className='addDrawer'>

                            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Write...'/>

                            <Rating value={rating} onChange={(e, value) => setRating(value)} />

                            <button onClick={handleAddFirebase}>
                                ADD
                            </button>
                        </div>

                    </Drawer>
                </>
            }
        </div>
    )
}
