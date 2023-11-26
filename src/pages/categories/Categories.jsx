import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card';


export default function items() {

    const items = useSelector(state => state.categoryitems.categoryitems)

    return (
        <>
            <h1>ITEMS</h1>
            <div className='product'>
                {
                    items && items.map((e, i) => (
                        <Card products={e} key={i}/>
                    ))
                }
            </div>
        </>
    )
}
