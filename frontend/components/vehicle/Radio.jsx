import React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { doorsAtom } from '../lib/atoms'
import Icons from '../common/Icons'

export default function Radio({ children, value }) {
  const [doors, setDoors] = useAtom(doorsAtom)
  const { register, watch, setValue } = useFormContext()
  const isStandard = watch('standard')
  const isSelected = watch('doors') === value
  const handleClick = () => {
    setValue('doors', value)
    setDoors(value)
  }

  return (
    <div onClick={handleClick} className={cn('p-2 flex gap-2 items-center', isSelected && 'bg-input-bg')}>
      <label className={cn('cursor-pointer', isSelected && !isStandard && 'text-accent border-b border-accent ')} htmlFor={value}>
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
