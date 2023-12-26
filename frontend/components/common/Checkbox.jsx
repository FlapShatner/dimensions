import React from 'react'
import { cn } from '../utils'
import Icons from './Icons'

export default function Checkbox({ onClick, isChecked, id }) {
  return (
    <div onClick={onClick} className={cn('w-4 bg-white h-4 rounded-sm', isChecked && 'bg-accent')}>
      <div>{isChecked && <Icons name='check' color='black' size='16px' />}</div>
    </div>
  )
}
