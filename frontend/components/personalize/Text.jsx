import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { minHeight } from '../App'
import { cn } from '../utils'
import Checkbox from '../common/Checkbox'

export default function Text() {
  const {
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext()

  const handleClick = (e) => {
    e.stopPropagation()
    setValue('customText', !watch('customText'))
  }

  const isCustomText = watch('customText')

  return (
    <div className='flex flex-col border-b p-4  border border-border my-2'>
      <div className='flex gap-2 items-center'>
        <Checkbox onClick={handleClick} isChecked={isCustomText} />
        <label htmlFor='customText'>Personalize with Text</label>
      </div>
      <div className={cn('flex flex-col', !isCustomText && 'hidden')}>
        <label htmlFor='customTextField'>Your custom text:</label>
        <input
          className='px-2 py-1'
          style={minHeight}
          {...register('customTextField')}
          type='text'
          name='customTextField'
          id='customTextField'
          disabled={!isCustomText}
        />
        {isCustomText && <ErrorMessage errors={errors} name='customTextField' render={({ message }) => <p className='text-accent'>{message}</p>} />}
      </div>
    </div>
  )
}
