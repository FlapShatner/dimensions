import React from 'react'
import { useFormContext } from 'react-hook-form'
import { checkABCErrors, cn } from '../utils'
import { minHeight } from '../App'

export default function WindowMeasure({ isStandard }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()
  return (
    <div className={cn('border border-t-0 border-border p-4', isStandard && 'opacity-40')}>
      <span className='text-accent my-4'>Window measurements:</span>
      <div className='flex gap-4 justify-between'>
        <div className='flex flex-col w-full'>
          <label htmlFor='a'>A:</label>
          <input style={minHeight} disabled={isStandard} className='w-full px-1' type='string' name='a' id='a' {...register('a')} />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='b'>B:</label>
          <input style={minHeight} disabled={isStandard} className='w-full px-1' type='string' name='b' id='b' {...register('b')} />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='c'>C:</label>
          <input style={minHeight} disabled={isStandard} className='w-full px-1' type='string' name='c' id='c' {...register('c')} />
        </div>
      </div>
      {checkABCErrors(errors) && <p className='text-red-500 text-center mt-2'> Please enter values for A B and C. </p>}
    </div>
  )
}
