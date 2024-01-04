import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card'
import Filter from '../../components/filter/Filter'
import { useParams } from 'react-router-dom'
import './Search.scss'
import axios from 'axios'

export default function Search() {

    // const search = useSelector(state => state.search.value)
    const [item, setItem] = useState(null)
    const param = useParams()

    const fetchItem = async () => {
        let res = await fetch(`https://dummyjson.com/products/search?q=${param.item}`)
        res = await res.json()
        console.log(res.products);
        setItem(res.products);
    }

    useEffect(() => {
        fetchItem();
    }, [])

    return (
        <div className='mainSearch'>

            <div>
                <h1>{param.item.toUpperCase()}</h1>
                <Filter product={item} setProduct={setItem} />
            </div>

            {
                (item?.length >= 1) ? (
                    <>
                        <div>
                            {
                                item && item?.map((e, i) => (
                                    <Card products={e} key={i} />
                                ))
                            }
                        </div></>
                ) : (<h2>NO SEARCH RESULT FOR {param.item.toUpperCase()}</h2>)
            }

        </div>
    )
}