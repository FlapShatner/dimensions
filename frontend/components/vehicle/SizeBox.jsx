import React from 'react'
import { cn } from '../utils'

function SizeBox({ size, className, children }) {
  return (
    <div className={cn(className, 'flex flex-col gap-1 items-center')}>
      <span className='text-sm text-center'>{children}</span>
      <input type='text' className={cn('border border-border px-2 w-16 h-6')} value={size} readOnly />
    </div>
  )
}

export default SizeBox
