import React, { useEffect, useState } from 'react'
import { cn, getYears } from '../utils'
import { getVehicle } from '../services'
import { useFormContext } from 'react-hook-form'
import Icons from '../common/Icons'
import Radio from './Radio'
import Makes from './Makes'
import Search from './Search'
import { ErrorMessage } from '@hookform/error-message'

export default function VehicleForm({ setIsMatch, setHasSearched }) {
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext()
  const isStandard = watch('standard')
  const years = getYears()
  return (
    <div className='flex flex-col border border-border p-4'>
      <div className='flex gap-4 mb-4'>
        <div className='flex flex-col'>
          <label htmlFor='year'>Year:</label>
          <div className=' relative flex items-center border border-border isolate'>
            <div className='absolute right-1 -z-10'>
              <Icons name='chevron-down' size='20' color='#D2D2D2' />
            </div>
            <select {...register('year')} disabled={isStandard} className='px-2 py-[1px] bg-transparent ' name='year' id='year'>
              {years.map((year) => (
                <option className='p-1 w-48 bg-bg-secondary' key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='make'>Make:</label>
          <Makes register={register} isStandard={isStandard} />
        </div>
        <div className='flex flex-col w-full  '>
          <label htmlFor='model'>Model:</label>
          <input
            style={{ minHeight: '0' }}
            {...register('model')}
            disabled={isStandard}
            className='flex flex-shrink px-1 border border-border h-7'
            type='text'
            name='model'
            id='model'
          />
        </div>
      </div>

      <div className={cn('text-center')}>
        <ErrorMessage errors={errors} name='make' render={({ message }) => <p className='text-red-500'>{message}</p>} />
        <ErrorMessage errors={errors} name='model' render={({ message }) => <p className='text-red-500'>{message}</p>} />
      </div>

      <div className=' flex gap-6 justify-start mt-4'>
        <div className='flex border boder-border'>
          <Radio value='2DOOR'>2 Door</Radio>
          <Radio value='4DOOR'>4 Door</Radio>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='class'>Truck Class:</label>
          <div className=' relative flex items-center border border-border isolate'>
            <div className='absolute right-1 -z-10'>
              <Icons name='chevron-down' size='20' color='#D2D2D2' />
            </div>
            <select {...register('class')} disabled={isStandard} className='bg-transparent  pl-1' name='class' id='class'>
              <option className='bg-bg-secondary' value='MIDSIZE'>
                Mid Size
              </option>
              <option className='bg-bg-secondary' value='HALF'>
                1/2 Ton
              </option>
              <option className='bg-bg-secondary' option value='THREEQUARTER'>
                3/4 Ton
              </option>
              <option className='bg-bg-secondary' value='ONE'>
                1 Ton
              </option>
              <option className='bg-bg-secondary' value='OTHER'>
                Other
              </option>
            </select>
          </div>
        </div>
        <Search setIsMatch={setIsMatch} setHasSearched={setHasSearched} />
      </div>
    </div>
  )
}
