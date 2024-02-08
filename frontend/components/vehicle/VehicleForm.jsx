import React, { useEffect, useState } from 'react'
import { cn, getYears } from '../utils'
// import { getVehicle } from '../services'
import { useFormContext } from 'react-hook-form'
import Icons from '../common/Icons'
import Radio from './Radio'
import Makes from './Makes'
import Measurements from './Measurements'
import Class from './Class'
import Search from './Search'
import { ErrorMessage } from '@hookform/error-message'
import Models from './Models'
import { useAtom } from 'jotai'
import { disableModelAtom, yearAtom } from '../lib/atoms'

export default function VehicleForm({ setIsMatch, setHasSearched }) {
  const [modelDisable] = useAtom(disableModelAtom)
  const [year, setYear] = useAtom(yearAtom)
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext()
  const isStandard = watch('standard')
  const years = getYears()
  return (
    <div className='flex flex-col border border-border p-4 max-w-sm m-auto'>
      <span className='text-center text-accent'>Search our database for your truck. If we don't have it, add it!</span>
      <div className='flex flex-col gap-4 my-4'>
        <div className='flex flex-col'>
          <p htmlFor='year'>Year:</p>
          <div className=' relative flex items-center border border-border isolate w-max'>
            <div className='absolute right-1 -z-10'>
              <Icons name='chevron-down' size='20' color='#D2D2D2' />
            </div>
            <select
              {...register('year')}
              disabled={isStandard}
              className='px-2 py-[1px] bg-transparent '
              name='year'
              id='year'
              onChange={(e) => setYear(e.target.value)}>
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
          {!modelDisable && (
            <>
              <label htmlFor='model'>Model:</label>
              <Models register={register} isStandard={isStandard} />
            </>
          )}
        </div>
      </div>

      <div className={cn('text-center')}>
        <ErrorMessage errors={errors} name='make' render={({ message }) => <p className='text-red-500'>{message}</p>} />
        <ErrorMessage errors={errors} name='model' render={({ message }) => <p className='text-red-500'>{message}</p>} />
      </div>

      <div className=' flex flex-col gap-6 justify-start mt-4'>
        <div className='flex gap-8 justify-start'>
          <div className='flex border border-border'>
            <Radio value='2DOOR'>2 Door</Radio>
            <Radio value='4DOOR'>4 Door</Radio>
          </div>
          {/* <Class register={register} isStandard={isStandard} /> */}
        </div>
      </div>
      <Measurements />
    </div>
  )
}
