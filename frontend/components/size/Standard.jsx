import React from 'react'
import { cn } from '../utils'
import { getCurrentProduct, getSelectedVariant } from '../ajax'
import { useAtom, useSetAtom } from 'jotai'
import { isStandardAtom, isCustomAtom } from '../lib/atoms'
import Checkbox from '../common/Checkbox'

export default function Standard() {
  const [isStandard, setIsStandard] = useAtom(isStandardAtom)
  const setIsCustom = useSetAtom(isCustomAtom)

  const handleClick = (e) => {
    e.stopPropagation()
    if (isStandard) {
      setIsStandard(false)
    } else {
      setIsStandard(true)
      setIsCustom(false)
    }
  }

  return (
    <div className={cn('border border-border p-4 w-full bg-bg-primary', isStandard && 'text-accent ')}>
      <div className='flex items-center gap-2'>
        <Checkbox onClick={handleClick} isChecked={isStandard} />
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
