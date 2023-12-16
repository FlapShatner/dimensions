import React from 'react'
import Icons from '../common/Icons'
import { cn } from '../utils'

export default function ATC() {
 const enabled = true
 return (
  <button className={cn('button text-accent bg-bg-primary gap-3 cursor-pointer', !enabled && '  border-icon opacity-30')}>
   Add to cart
   <div className='w-3'>
    <Icons
     name='right'
     size='20'
     color='white'
    />
   </div>
  </button>
 )
}
