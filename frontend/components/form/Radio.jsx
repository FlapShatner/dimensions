import React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '../utils'

export default function Radio({ children, value }) {
  const { register, watch, setValue } = useFormContext()
  const isStandard = watch('standard')
  const isSelected = watch('doors') === value
  const handleClick = () => {
    setValue('doors', value)
  }

  return (
    <div onClick={handleClick} className='flex gap-2 items-center'>
      <label className={cn('cursor-pointer', isSelected && !isStandard && 'text-accent border-b border-accent')} htmlFor={value}>
        {children}
      </label>
      <input
        {...register('doors', {
          onChange: () => {
            handleClick()
          },
        })}
        disabled={isStandard}
        type='radio'
        name='doors'
        value={value}
        id={value}
        className='hidden'
      />
    </div>
  )
}
