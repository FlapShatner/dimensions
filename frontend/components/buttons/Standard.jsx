import React, { useEffect, useState } from 'react'
import { minHeight } from '../App'
import { cn } from '../utils'
import { getCurrentProduct, getSelectedVariant } from '../ajax'
import { get } from 'react-hook-form'

let buyEnabled = false

export default function Standard({ isStandard, register }) {
  const [variants, setVariants] = useState([])

  const printVariant = () => {
    let currentVariant = getSelectedVariant()
    console.log('currentVariant', currentVariant)
  }

  useEffect(() => {
    getCurrentProduct().then((data) => {
      setVariants(data.variants)
    })
  }, [])

  return (
    <div className={cn('border border-border p-4 w-full mb-4 bg-bg-primary', isStandard && 'text-accent ')}>
      <span onClick={printVariant}>print variant</span>
      <div className='flex gap-2'>
        <input style={minHeight} className='accent-accent w-4 ' type='checkbox' name='standard' id='standard' {...register('standard')} />
        <label htmlFor='standard'>Order standard 18" x 68" size*</label>
      </div>
      <div className='text-sm flex flex-col mt-2 ml-8 text-txt-secondary'>
        <span className='text-xs'>
          *The standard 18" x 68" size will be too large for a mid size truck and you will need to trim off part of your design. We recommend entering correct
          measurements for the best results.
        </span>
      </div>
    </div>
  )
}
