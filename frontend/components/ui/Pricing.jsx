import React, { useState } from 'react'

import { formatPrice } from '../utils'
import { prices } from '../lib/data'
import Icons from '../common/Icons'

function Pricing() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className='max-w-[280px] relative'>
      <span onClick={() => setExpanded(!expanded)} className='flex items-center gap-1 w-full justify-end'>
        Pricing Details
        {!expanded ? <Icons name='chevron-down' size='24' color='#fff' /> : <Icons name='close' size='24' color='red' />}
      </span>

      {expanded && (
        <div className='flex flex-col gap-2 absolute bg-bg-secondary w-[300px] sm:-right-12 right-0 p-2'>
          {prices.map((item) => {
            return (
              <div className='text-xs border border-border grid grid-cols-5' key={item.price}>
                <span className='col-span-4 p-1 '>{item.description}</span>
                <span className='col-span-1 p-1 flex items-center justify-center bg-bg-primary'>{formatPrice(item.price, 1)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Pricing
