import React, { useEffect } from 'react'
import { DevTools } from 'jotai-devtools'
import { useLockedBody } from 'usehooks-ts'
import { cn, makeVehicle } from '../utils'
import { saveVehicle } from '../services'
import VehicleForm from './VehicleForm'
import Spinner from '../common/Spinner'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  chosenWindowSizeAtom,
  windowSizeAtom,
  isAddVehicleAtom,
  addedWindowAtom,
  addedDoorsAtom,
  addedMakeAtom,
  addedModelAtom,
  addedYearAtom,
  didAddVehicleAtom,
  newVehicleIdAtom,
} from '../lib/atoms'
import AddVehicle from './AddVehicle'

export default function Vehicle({ setIsOpen }) {
  const [isAddVehicle, setIsAddVehicle] = useAtom(isAddVehicleAtom)

  const [locked, setLocked] = useLockedBody(false, 'root')

  useEffect(() => {
    setLocked(true)
    return () => setLocked(false)
  }, [])

  return (
    <div className={cn('flex flex-col gap-4 w-[60vw] max-w-xs sm:max-w-full')}>
      <h2 className='text-txt-primary mb-3 text-3xl'>Vehicle Info:</h2>
      <div>
        {isAddVehicle ? (
          <div className='w-max m-auto'>
            <div onClick={() => setIsAddVehicle(false)} className='cursor-pointer text-lg underline'>
              Back to vehicle search
            </div>
            <AddVehicle />
          </div>
        ) : (
          <VehicleForm />
        )}
      </div>
      <SubmitButton />
    </div>
  )
}

function SubmitButton({ isLoading }) {
  const [chosenWindowSize, setChosenWindowSize] = useAtom(chosenWindowSizeAtom)
  const isAddVehicle = useAtomValue(isAddVehicleAtom)
  const addedWindow = useAtomValue(addedWindowAtom)
  const addedDoors = useAtomValue(addedDoorsAtom)
  const addedMake = useAtomValue(addedMakeAtom)
  const addedModel = useAtomValue(addedModelAtom)
  const addedYear = useAtomValue(addedYearAtom)
  const windowSize = useAtomValue(windowSizeAtom)
  const setNewVehicleId = useSetAtom(newVehicleIdAtom)
  const setDidAddVehicle = useSetAtom(didAddVehicleAtom)

  const handleSubmit = async () => {
    if (isAddVehicle) {
      setChosenWindowSize(addedWindow)
      const data = makeVehicle(addedMake, addedModel, addedYear, addedDoors, addedWindow)
      const response = await saveVehicle(data)
      setDidAddVehicle(true)
      setNewVehicleId(response.id)
      console.log(response)
    } else {
      setChosenWindowSize(windowSize)
      setIsOpen(false)
    }
  }

  return (
    <div
      onClick={handleSubmit}
      className={cn(
        'w-full md:w-max  m-auto border border-border text-accent text-xl flex items-center justify-center cursor-pointer hover:border-accent  hover:bg-bg-secondary transition-all px-4 py-2',
        isLoading && 'border-accent'
      )}>
      {isLoading ? <Spinner /> : 'Use These Measurements'}
    </div>
  )
}
