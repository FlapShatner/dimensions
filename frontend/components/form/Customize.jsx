import React from 'react'
import Logo from './Logo'

import { ErrorMessage } from '@hookform/error-message'
import { cn, formatPhoneNumber } from '../utils'
import { states } from '../states'

export default function Customize({ register, watch, setValue, errors, setImageFile }) {
  const isCustomText = watch('customText')
  const isBusiness = watch('business')
  const isLogo = watch('logo')

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setValue('phone', formattedPhone)
  }

  return (
    <div className={cn('mt-4 w-[423px]')}>
      <span className='text-3xl text-txt-primary'>Customize My Back Window Graphics:</span>
      <div className='flex flex-col'>
        <div className='flex flex-col border-b p-4 border border-border my-2'>
          <div className='flex'>
            <input className='accent-accent' {...register('customText')} type='checkbox' name='customText' id='customText' />
            <label htmlFor='customText'>Personalize with Text</label>
          </div>
          <div className={cn('flex flex-col', !isCustomText && 'hidden')}>
            <label htmlFor='customTextField'>Your custom text:</label>
            <input {...register('customTextField')} type='text' name='customTextField' id='customTextField' disabled={!isCustomText} />
            {isCustomText && <ErrorMessage errors={errors} name='customTextField' render={({ message }) => <p className='text-accent'>{message}</p>} />}
          </div>
        </div>
        <div className=' border border-border mt-2'>
          <div className='flex p-4 '>
            <input className='accent-accent' {...register('business')} type='checkbox' name='business' id='business' />
            <label htmlFor='business'>Personalize with Business Info</label>
          </div>
          <div className={cn('flex flex-col p-4', !isBusiness && 'hidden')}>
            <div className={cn('flex')}>
              <input className='accent-accent' {...register('logo')} type='checkbox' name='logo' id='logo' disabled={!isBusiness} />
              <label htmlFor='logo'>Use your logo*</label>
            </div>
            <Logo setImageFile={setImageFile} isLogo={isLogo} isBusiness={isBusiness} register={register} errors={errors} />
          </div>
          <div className={cn('flex flex-col gap-4 p-4 ', !isBusiness && 'hidden')}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col '>
                <label htmlFor='businessName'>Business Name</label>
                <input {...register('businessName')} type='text' name='businessName' id='businessName' disabled={!isBusiness} />
                {isBusiness && <ErrorMessage errors={errors} name='businessName' render={({ message }) => <p className='text-accent'>{message}</p>} />}
              </div>
              <div className='flex flex-col '>
                <label htmlFor='slogan'>
                  Slogan
                  <span className='text-xs ml-3'>Example: "Your 1 stop shop for custom graphics"</span>
                </label>
                <input disabled={!isBusiness} {...register('slogan')} type='text' name='slogan' id='slogan' />
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='city'>City</label>
                <input disabled={!isBusiness} {...register('city')} type='text' name='city' id='city' />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='state'>State</label>
                <select {...register('state')} disabled={!isBusiness} className='px-2 py-[1px] bg-bg-secondary border border-border ' name='year' id='year'>
                  {states.map((state) => (
                    <option className='p-1' key={state.abbreviation} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='phone'>Phone</label>
                <input
                  {...register('phone', {
                    onChange: (e) => handlePhoneChange(e),
                  })}
                  type='tel'
                  name='phone'
                  id='phone'
                  value={watch('phone')}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='website'>Website</label>
                <input {...register('website')} type='url' name='website' id='website' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
