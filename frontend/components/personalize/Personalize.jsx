import React, { useState } from 'react'
import Logo from '../form/Logo'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { cn, formatPhoneNumber } from '../utils'
import { states } from '../lib/states'
import { minHeight } from '../App'
import Checkbox from '../common/Checkbox'
import Text from './Text'
import Business from './Business'

export default function Personalize({ setImageFile }) {
  const {
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext()
  const [personalizeIsOpen, setPersonalizeIsOpen] = useState(false)

  const isBusiness = watch('business')
  const isLogo = watch('logo')

  const handleClick = (e) => {
    e.stopPropagation()
    console.log('clicked')
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setValue('phone', formattedPhone)
  }

  return (
    <>
      {!personalizeIsOpen ? (
        <div className='flex flex-col py-4 '>
          <h2 className='text-2xl text-txt-primary font-sans'> Personalize Your Graphics:</h2>

          <Text />
          <Business setImageFile={setImageFile} />
        </div>
      ) : (
        <div className={cn('mt-4 w-[423px]')}>
          <h2 className='text-3xl text-txt-primary'>Personalize Your Back Window Graphics:</h2>
          <div className='flex flex-col'>
            <div className=' border border-border mt-2'>
              <div className='flex items-center py-2 px-4 gap-2'>
                <input style={minHeight} className='accent-accent w-4' {...register('business')} type='checkbox' name='business' id='business' />
                <label htmlFor='business'>Personalize with Business Info</label>
              </div>
              <div className={cn('flex flex-col p-4', !isBusiness && 'hidden')}>
                <div className={cn('flex gap-2 items-center mb-2')}>
                  <input style={minHeight} className='accent-accent w-4' {...register('logo')} type='checkbox' name='logo' id='logo' disabled={!isBusiness} />
                  <label className='mt-0' htmlFor='logo'>
                    Use your logo*
                  </label>
                </div>
                <Logo setImageFile={setImageFile} isLogo={isLogo} isBusiness={isBusiness} register={register} errors={errors} />
              </div>
              <div className={cn('flex flex-col gap-4 p-4 ', !isBusiness && 'hidden')}>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col '>
                    <label htmlFor='businessName'>Business Name</label>
                    <input style={minHeight} {...register('businessName')} type='text' name='businessName' id='businessName' disabled={!isBusiness} />
                    {isBusiness && <ErrorMessage errors={errors} name='businessName' render={({ message }) => <p className='text-accent'>{message}</p>} />}
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor='slogan'>
                      Slogan
                      <span className='text-xs ml-3'>Example: "Your 1 stop shop for custom graphics"</span>
                    </label>
                    <input style={minHeight} disabled={!isBusiness} {...register('slogan')} type='text' name='slogan' id='slogan' />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='city'>City</label>
                    <input style={minHeight} disabled={!isBusiness} {...register('city')} type='text' name='city' id='city' />
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
                      style={minHeight}
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
                    <input style={minHeight} {...register('website')} type='url' name='website' id='website' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
