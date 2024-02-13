import React from 'react'
import { DevTools } from 'jotai-devtools'
import { cn } from '../utils'
import VehicleForm from './VehicleForm'
import Spinner from '../common/Spinner'
import { useAtom, useAtomValue } from 'jotai'
import { chosenWindowSizeAtom, windowSizeAtom } from '../lib/atoms'

export default function Vehicle({ setIsOpen }) {
  const [chosenWindowSize, setChosenWindowSize] = useAtom(chosenWindowSizeAtom)
  const windowSize = useAtomValue(windowSizeAtom)
  const handleSubmit = () => {
    setChosenWindowSize(windowSize)
    setIsOpen(false)
  }

  return (
    <div className={cn('flex flex-col gap-4 w-[60vw] max-w-xs sm:max-w-full')}>
      <h2 className='text-txt-primary mb-3 text-3xl'>Vehicle Info:</h2>
      <div>
        <VehicleForm />
      </div>
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  )
}

function SubmitButton({ isLoading, onSubmit }) {
  return (
    <div
      onClick={onSubmit}
      className={cn(
        'w-full md:w-max  m-auto border border-border text-accent text-xl flex items-center justify-center cursor-pointer hover:border-accent  hover:bg-bg-secondary transition-all px-4 py-2',
        isLoading && 'border-accent'
      )}>
      {isLoading ? <Spinner /> : 'Use These Measurements'}
    </div>
  )
}
