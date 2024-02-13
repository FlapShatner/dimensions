import React from 'react'
import WindowImage from './WindowImage'
import { cn } from '../utils'
import { useAtomValue } from 'jotai'
import { chosenWindowSizeAtom } from '../lib/atoms'

function MiniMeasure() {
 const chosenWindowSize = useAtomValue(chosenWindowSizeAtom)

 const isEmpty = Object.keys(chosenWindowSize).length == 0 && Object.values(chosenWindowSize).every((val) => val === 0)
 if (isEmpty) {
  return null
 }

 const pClassName = 'text-accent-bright text-sm border border-border px-2 pt-1'

 return (
  <div className='flex flex-col items-center mt-2 -ml-8 gap-2 text-accent'>
   <p className={cn(pClassName, 'ml-10')}>{chosenWindowSize.a}"</p>
   <div className='flex justify-center items-center gap-2'>
    <p className={cn(pClassName)}>{chosenWindowSize.b}"</p>
    <WindowImage className='w-1/2 p-0 mt-0' />
   </div>
   <p className={cn(pClassName, 'ml-10')}>{chosenWindowSize.c}"</p>
  </div>
 )
}

export default MiniMeasure
