import React from 'react'
import './Related.scss'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card';

export default function Related() {

  const related = useSelector(state => state.categoryitems.relateditems)

  return (
    <>
    <h1>RELATED PRODUCTS</h1>
    <div className='product'>
        {
            related && related.map((e, i) => (
                <Card products={e} key={i}/>
            ))
        }
    </div>
</>
  )
}
