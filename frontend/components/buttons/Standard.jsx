import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { minHeight } from '../App'
import { cn } from '../utils'
import { getCurrentProduct, getSelectedVariant } from '../ajax'

export default function Standard() {
  const [variants, setVariants] = useState([])
  const { watch, register } = useFormContext()

  const isStandard = watch('standard')
  useEffect(() => {
    getCurrentProduct().then((data) => {
      setVariants(data.variants)
    })
  }, [])

  return (
    <div className={cn('border border-border p-4 w-full bg-bg-primary', isStandard && 'text-accent ')}>
      <div className='flex gap-2'>
        <input style={minHeight} className='accent-accent w-4 ' type='checkbox' name='standard' id='standard' {...register('standard')} />
        <label htmlFor='standard'>Order standard 18" x 68" size*</label>
      </div>
      <div className='text-sm flex flex-col mt-1 ml-8 text-txt-secondary'>
        <span className='text-xs'>
          *The standard 18" x 68" size will be too large for a mid size truck and you will need to trim off part of your design. We recommend entering correct
          measurements for the best results.
        </span>
      </div>
    </div>
  )
}
