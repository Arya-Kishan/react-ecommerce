import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card'
import Filter from '../../components/filter/Filter'

export default function Search() {

    const search = useSelector(state => state.search.value)
    const [item, setItem] = useState(null)

    useEffect(() => {
        setItem(search)
    }, [search])

    return (
        <>
            <Filter product={item} setProduct={setItem} />
            {
                (search?.length >= 1) ? (
                    <>
                        <div className='product'>
                            {
                                item && item?.map((e, i) => (
                                    <Card products={e} key={i} />
                                ))
                            }
                        </div></>
                ) : (<h2>NO SEARCH</h2>)
            }
        </>
    )
}