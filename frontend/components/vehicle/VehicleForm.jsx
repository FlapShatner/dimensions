import React from 'react'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import Makes from './Makes'
import Measurements from './Measurements'
import Doors from './Doors'
import Models from './Models'
import Year from './Year'
import { isAddVehicleAtom } from '../lib/atoms'

export default function VehicleForm() {
  const [isAddVehicle, setIsAddVehicle] = useAtom(isAddVehicleAtom)

  return (
    <div className='flex flex-col border border-border p-4 max-w-sm m-auto'>
      <span className='text-center text-accent'>Search our database for your truck to find your window measurements </span>
      <span className='text-center mt-3 text-sm flex gap-2 m-auto'>
        Don't see your vehicle?
        <div onClick={() => setIsAddVehicle(true)} className='cursor-pointer text-accent underline'>
          Add it here!
        </div>
      </span>
      <div className='flex flex-col gap-4 my-4'>
        <Year />
        <div className='flex flex-col w-full'>
          <label htmlFor='make'>Make:</label>
          <Makes />
        </div>
        <div className='flex flex-col w-full  '>
          <label htmlFor='model'>Model:</label>
          <Models />
        </div>
      </div>
      <div className={cn('text-center')}></div>

      <div className=' flex flex-col gap-6 justify-start'>
        <div className='flex gap-8 justify-start'>
          <div>
            <span>Doors:</span>
            <Doors />
          </div>
          <span className='text-sm mt-4 text-center '>
            If your vehicle isn't in our database,
            <div onClick={() => setIsAddVehicle(true)} className='underline text-accent cursor-pointer text-base'>
              {' '}
              enter it here
            </div>{' '}
          </span>
        </div>
      </div>
      <Measurements />
    </div>
  )
}
