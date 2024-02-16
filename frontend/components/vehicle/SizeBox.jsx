import React from 'react'
import Spinner from '../common/Spinner'
import Icons from '../common/Icons'
import { useAtomValue } from 'jotai'
import { loadingWindowAtom } from '../lib/atoms'
import { cn } from '../utils'

function SizeBox({ size, className, children }) {
  const loadingWindow = useAtomValue(loadingWindowAtom)
  return (
    <div className={cn(className, 'flex flex-col gap-1 items-center')}>
      <span className='text-sm text-center'>{children}</span>
      {loadingWindow ? (
        <Spinner style={{ height: '12px', width: '12px' }} />
      ) : (
        <input type='text' className={cn('border border-border px-2 w-16 h-6')} value={`${size}"`} readOnly />
      )}
    </div>
  )
}

export default SizeBox
