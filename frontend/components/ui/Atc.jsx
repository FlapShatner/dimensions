import React from 'react'
import Icons from '../common/Icons'
import { cn } from '../utils'

export default function ATC({ enabled, onSubmit }) {
  return (
    <div className='flex flex-col'>
      {!enabled && <span className='text-accent text-sm text-center'>Please choose a size</span>}
      <button
        onClick={onSubmit}
        className={cn('button text-accent bg-bg-primary gap-3 cursor-pointer', !enabled && ' pointer-events-none  border-icon opacity-30')}>
        Add to cart
        <div className='w-3'>
          <Icons name='right' size='20' color='white' />
        </div>
      </button>
    </div>
  )
}
