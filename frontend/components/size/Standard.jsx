import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { minHeight } from '../App'
import { cn } from '../utils'
import { getCurrentProduct, getSelectedVariant } from '../ajax'
import Checkbox from '../common/Checkbox'

export default function Standard({ setIsCustom }) {
  const { watch, register, setValue } = useFormContext()

  const isStandard = watch('standard')

  const handleClick = (e) => {
    e.stopPropagation()
    if (isChecked) {
      setValue('standard', false)
    } else {
      setValue('standard', true)
      setIsCustom(false)
    }
  }

  const isChecked = watch('standard')

  return (
    <div className={cn('border border-border p-4 w-full bg-bg-primary', isStandard && 'text-accent ')}>
      <div className='flex items-center gap-2'>
        <Checkbox onClick={handleClick} isChecked={isChecked} />
        <span>Order standard 18" x 68" size*</span>
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
