import React, { useState } from 'react'
import './Searchbtn.scss'
import SearchIcon from '@mui/icons-material/Search';
import { Drawer, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchItem } from '../../redux/searchSlice'


export default function Searchbtn() {

    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(fetchSearchItem(input.toLowerCase()))
        navigate("/search")
        setInput("")
    }

    return (
        <div>
            <IconButton onClick={() => { setOpen(true) }}><SearchIcon style={{ color: 'white' }} /></IconButton>

            <Drawer
                anchor={'top'}
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <div className='searchDrawer'><input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" /><button onClick={handleSearch}>Search</button></div>
            </Drawer>

        </div>
    )
}
