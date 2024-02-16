import React, { useEffect } from 'react'
import { DevTools } from 'jotai-devtools'
import { useLockedBody } from 'usehooks-ts'
import { cn } from '../utils'
import VehicleForm from './VehicleForm'
import { useAtom } from 'jotai'
import { isAddVehicleAtom } from '../lib/atoms'
import AddVehicle from './AddVehicle'

export default function Vehicle() {
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
      {/* <DevTools /> */}
    </div>
  )
}
