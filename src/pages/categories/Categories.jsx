import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import { useParams } from 'react-router-dom';


export default function items() {

    const items = useSelector(state => state.categoryitems.categoryitems)
    const { categoryName } = useParams()
    const [item, setItem] = useState(null)

    useEffect
        (() => {
            setItem(items)
        }, [items])


    return (
        <>
            <div className='productHeading'>
                <h1>{categoryName?.toUpperCase()}</h1>
                <Filter product={item} setProduct={setItem} />
            </div>
            <div className='product'>
                {
                    item && item.map((e, i) => (
                        <Card products={e} key={i} />
                    ))
                }
            </div>
        </>
    )
}
