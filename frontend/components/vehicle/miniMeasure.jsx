import React from 'react'
import WindowImage from './WindowImage'
import Icons from '../common/Icons'
import { cn } from '../utils'
import { useAtomValue } from 'jotai'
import { chosenWindowSizeAtom } from '../lib/atoms'

function MiniMeasure() {
  const chosenWindowSize = useAtomValue(chosenWindowSizeAtom)

  const isEmpty = Object.keys(chosenWindowSize).length == 0 && Object.values(chosenWindowSize).every((val) => val === 0)
  if (isEmpty) {
    return null
  }

  const pClassName = 'text-accent-bright text-sm border border-border px-2 pt-1 w-10'

  return (
    <div className='flex flex-col items-center mt-2 -ml-8 gap-2 text-accent'>
      <div className='ml-14 flex flex-col items-center justify-center gap-2'>
        <p className={cn(pClassName)}>{chosenWindowSize.a}"</p>
        <Icons name='width' width='40' height='40' color='currentColor' />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <p className={cn(pClassName)}>{chosenWindowSize.b}"</p>
        <Icons name='height' width='40' height='40' color='currentColor' />
        <WindowImage className='w-1/2 p-0 mt-0' />
      </div>
      <div className='ml-14 flex flex-col items-center gap-2'>
        <Icons name='width' width='40' height='40' color='currentColor' />
        <p className={cn(pClassName)}>{chosenWindowSize.c}"</p>
      </div>
    </div>
  )
}

export default MiniMeasure
