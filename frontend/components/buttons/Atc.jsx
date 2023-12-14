import React from 'react'
import Icons from '../form/Icons'

export default function ATC() {
  return (
    <button className='button  bg-bg-primary gap-3'>
      Add to cart
      <div className='w-3'>
        <Icons name='right' size='20' color='white' />
      </div>
    </button>
  )
}
