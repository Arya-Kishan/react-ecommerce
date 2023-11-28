import React, { useState } from 'react'
import { Drawer } from '@mui/material'
import './Filter.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Filter({ product, setProduct }) {

    const [drawer, setDrawer] = useState(false)
    const [range, setRange] = useState(1000)
    const [radio, setRadio] = useState(4)

    const handleApply = () => {
        let filter = product.filter((e) => (
            e.price < range && e.rating > radio
        ))
        console.log(filter);
        setDrawer(false)
        setProduct(filter)
    }


    return (
        <div className='filter'>
            <button><FilterAltIcon/><h3 onClick={() => setDrawer(true)}>Filter</h3></button>

            <Drawer open={drawer} onClose={() => setDrawer(false)} anchor='bottom'>
                <div className='filter'>
                    <div>
                        <span>Price : </span>
                        <input type="range" min="0" max="3000" value={range} onChange={(e) => setRange(e.target.value)} />
                        <span>{range}</span>
                    </div>
                    <div>
                        <span>Rating :</span>
                        <span><input type="radio" name="rating" value={5} onChange={() => setRadio(5)} />5</span>
                        <span><input type="radio" name="rating" value={4} onChange={() => setRadio(4)} />4</span>
                        <span><input type="radio" name="rating" value={3} onChange={() => setRadio(3)} />3</span>
                        <span><input type="radio" name="rating" value={2} onChange={() => setRadio(2)} />2</span>
                    </div>
                    <div>
                        <button onClick={handleApply}>Apply</button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
