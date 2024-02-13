import React, { useEffect, useState } from 'react'
import { cn, getYears } from '../utils'
// import { getVehicle } from '../services'
import { useFormContext } from 'react-hook-form'
import Icons from '../common/Icons'
import Radio from './Radio'
import Makes from './Makes'
import Measurements from './Measurements'
import Doors from './Doors'
import Class from './Class'
import Search from './Search'
import { ErrorMessage } from '@hookform/error-message'
import Models from './Models'

import Year from './Year'

export default function VehicleForm() {
 const {
  formState: { errors },
 } = useFormContext()

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
   <div className={cn('text-center')}>
    <ErrorMessage
     errors={errors}
     name='make'
     render={({ message }) => <p className='text-red-500'>{message}</p>}
    />
    <ErrorMessage
     errors={errors}
     name='model'
     render={({ message }) => <p className='text-red-500'>{message}</p>}
    />
   </div>

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
