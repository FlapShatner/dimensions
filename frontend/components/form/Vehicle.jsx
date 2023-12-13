import React, { useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { getYears, cn } from '../utils'
import Radio from './Radio'

export default function Vehicle({ isStandard, register, watch, setValue, errors }) {
  const years = getYears()

  return (
    <div className={cn('mt-4', isStandard && 'opacity-40')}>
      <h2 className=' text-txt-primary mb-3 text-3xl'>Vehicle Info:</h2>
      <div className='flex flex-col border border-border p-4'>
        <div className='flex gap-4 mb-4'>
          <div className='flex flex-col'>
            <label htmlFor='year'>Year:</label>
            <select {...register('year')} disabled={isStandard} className='px-2 py-[1px] bg-bg-secondary border border-border ' name='year' id='year'>
              {years.map((year) => (
                <option className='p-1' key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col flex-1 w-12'>
            <label htmlFor='make'>Make:</label>
            <input style={{ minHeight: '0' }} {...register('make')} disabled={isStandard} type='text' name='make' id='make' />
          </div>
          <div className='flex flex-col flex-1 w-12'>
            <label htmlFor='model'>Model:</label>
            <input style={{ minHeight: '0' }} {...register('model')} disabled={isStandard} className='flex flex-shrink' type='text' name='model' id='model' />
          </div>
        </div>
        {!isStandard && (
          <div className={cn('text-center')}>
            <ErrorMessage errors={errors} name='make' render={({ message }) => <p className='text-accent'>{message}</p>} />
            <ErrorMessage errors={errors} name='model' render={({ message }) => <p className='text-accent'>{message}</p>} />
          </div>
        )}
        <div className=' flex gap-6 justify-between mt-4'>
          <Radio value='2DOOR' isStandard={isStandard} setValue={setValue} register={register} watch={watch}>
            2 Door
          </Radio>
          <Radio value='4DOOR' isStandard={isStandard} setValue={setValue} register={register} watch={watch}>
            4 Door
          </Radio>
          <div className='flex gap-2'>
            <label htmlFor='class'>Truck Class:</label>
            <select {...register('class')} disabled={isStandard} className='bg-bg-secondary border border-border pl-1' name='class' id='class'>
              <option value='MIDSIZE'>Mid Size</option>
              <option value='HALF'>1/2 Ton</option>
              <option value='THREEQUARTER'>3/4 Ton</option>
              <option value='ONE'>1 Ton</option>
              <option value='OTHER'>Other</option>
            </select>
          </div>
        </div>
      </div>
      {!isStandard && (
        <style>
          {`
        input, select{
            color:#13FC00;
        }
        `}
        </style>
      )}
    </div>
  )
}
