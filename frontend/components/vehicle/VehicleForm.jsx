import React from 'react'
import { cn } from '../utils'
import Makes from './Makes'
import Measurements from './Measurements'
import Doors from './Doors'
import Models from './Models'
import Year from './Year'

export default function VehicleForm() {
  return (
    <div className='flex flex-col border border-border p-4 max-w-sm m-auto'>
      <span className='text-center text-accent'>Search our database for your truck. If we don't have it, add it!</span>
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
            {/* <Class register={register} isStandard={isStandard} /> */}
          </div>
        </div>
      </div>
      <Measurements />
    </div>
  )
}
