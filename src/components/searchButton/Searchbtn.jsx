import React, { useEffect, useRef, useState } from 'react'
import './Searchbtn.scss'
import 'regenerator-runtime/runtime'
import SearchIcon from '@mui/icons-material/Search';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Drawer, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchItem } from '../../redux/searchSlice'
import mic from '../../assets/mic.png'


export default function Searchbtn() {

    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    const handleSearch = () => {
        dispatch(fetchSearchItem(input.toLowerCase()))
        navigate("/search")
        setInput("")
    }

    useEffect(() => {
        console.log(transcript);
        setInput(transcript)
    }, [transcript])

    return (
        <div>
            <IconButton onClick={() => { setOpen(true) }}><SearchIcon style={{ color: 'white' }} /></IconButton>

            <Drawer
                anchor={'top'}
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <div className='searchDrawer'>
                    <img onClick={SpeechRecognition.startListening} src={mic} alt="" srcSet="" />
                    <input ref={inputRef} value={input} onChange={(e) => { setInput(e.target.value) }} type="text" />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </Drawer>

        </div>
    )
}
