import React from 'react'
import './Related.scss'
import { useSelector } from 'react-redux'
import Card from '../../components/card/Card';

export default function Related({ setQuantity, setAdd }) {

  const related = useSelector(state => state.categoryitems.relateditems)

  return (
    <div className='related'>
      <h1>RELATED PRODUCTS :-</h1>
      <div className='product'>
        {
          related && related.map((e, i) => (
            <div key={i} onClick={() => {
              setAdd(false)
              setQuantity(1)
            }}>
              <Card products={e} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
