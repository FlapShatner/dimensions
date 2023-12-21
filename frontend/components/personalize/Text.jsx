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

  const isCustomText = watch('customText')

  const handleClick = (e) => {
    e.stopPropagation()
    setValue('customText', !isCustomText)
    setValue('business', false)
  }

  return (
    <div className='flex flex-col border-b p-4  border border-border my-2'>
      <div className='flex gap-2 items-center'>
        <Checkbox onClick={handleClick} isChecked={isCustomText} />
        <label htmlFor='customText'>Personalize with Name / Text</label>
      </div>
      <div className={cn('flex flex-col', !isCustomText && 'opacity-30')}>
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
        <label htmlFor='notesField'>Special instructions:</label>
        <span>Text style, color, placement, etc.</span>
        <input className='px-2 py-1' style={minHeight} {...register('notesField')} type='text' name='notesField' id='notesField' disabled={!isCustomText} />
        {isCustomText && <ErrorMessage errors={errors} name='customTextField' render={({ message }) => <p className='text-accent'>{message}</p>} />}
      </div>
    </div>
  )
}
