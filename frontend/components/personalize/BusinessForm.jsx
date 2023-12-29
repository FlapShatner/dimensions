import React, { useState } from 'react'
import Logo from './Logo'
import Checkbox from '../common/Checkbox'
import { set, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { states } from '../lib/states'
import { cn, formatPhoneNumber } from '../utils'
import { minHeight } from '../App'

export default function BusinessForm({ setImageFile, imageFile, setIsOpen }) {
  const [isNameError, setisNameError] = useState(false)
  const [isLogoError, setisLogoError] = useState(false)
  const [logoError, setLogoError] = useState('')
  const {
    formState: { errors },
    watch,
    register,
    setValue,
    getValues,
  } = useFormContext()
  const name = watch('businessName')
  const isBusiness = watch('business')
  const isLogo = watch('logo')
  const isVector = watch('vector')
  const isNonVector = watch('nonVector')
  const isDesignLogo = watch('designLogo')
  const logoNote = watch('logoNote')

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value)
  }

  const handleLogoClick = () => {
    setValue('logo', !isLogo)
    setValue('vector', false)
    setValue('nonVector', false)
    setValue('designLogo', false)
  }

  const handleDesignLogoClick = () => {
    setValue('logo', true)
    setValue('vector', false)
    setValue('nonVector', false)
    setValue('designLogo', !isDesignLogo)
  }

  const handleVectorClick = () => {
    setValue('logo', true)
    setValue('designLogo', false)
    setValue('vector', !isVector)
    setValue('nonVector', false)
  }

  const handleNonVectorClick = () => {
    setValue('logo', true)
    setValue('designLogo', false)
    setValue('vector', false)
    setValue('nonVector', !isNonVector)
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setValue('phone', formattedPhone)
  }

  const onSubmit = () => {
    if (!name) {
      setisNameError(true)
      return
    }
    if (isLogo && !isDesignLogo && !isVector && !isNonVector) {
      setisLogoError(true)
      setLogoError('Please make a selection')
      return
    }
    if (isDesignLogo && !logoNote) {
      setisLogoError(true)
      setLogoError('Please describe your custom logo')
      return
    }
    if (isNonVector && !imageFile) {
      setisLogoError(true)
      setLogoError('Please upload a file')
      return
    }
    if (isVector && !imageFile) {
      setisLogoError(true)
      setLogoError('Please upload a file')
      return
    }
    setValue('business', true)
    setIsOpen(false)
  }

  return (
    <div>
      <h2 className='text-txt-primary text-3xl'>Business Info:</h2>
      <div className='flex justify-between gap-4'>
        <div className={cn('flex flex-col gap-4 py-4 ')}>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col '>
              <label htmlFor='businessName'>Business Name</label>
              <input
                style={minHeight}
                {...register('businessName')}
                type='text'
                name='businessName'
                id='businessName'
                disabled={!isBusiness}
                onChange={handleChange}
              />
              {isBusiness && <ErrorMessage errors={errors} name='businessName' render={({ message }) => <p className='text-accent'>{message}</p>} />}
            </div>
            <div className='flex flex-col '>
              <label htmlFor='slogan'>
                Slogan
                <span className='text-xs ml-3'>Example: "Your 1 stop shop for custom graphics"</span>
              </label>
              <input style={minHeight} disabled={!isBusiness} {...register('slogan')} type='text' name='slogan' id='slogan' onChange={handleChange} />
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='city'>City</label>
              <input style={minHeight} disabled={!isBusiness} {...register('city')} type='text' name='city' id='city' onChange={handleChange} />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='state'>State</label>
              <select
                {...register('state')}
                onChange={handleChange}
                disabled={!isBusiness}
                className='px-2 py-[1px] bg-bg-secondary border border-border '
                name='state'
                id='state'>
                {states.map((state) => (
                  <option className='p-1' key={state.abbreviation} value={state.abbreviation}>
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
              <input style={minHeight} {...register('website')} type='url' name='website' id='website' onChange={handleChange} />
            </div>
          </div>
          {isNameError && <p className='text-accent'>Please enter a business name</p>}
          <div onClick={onSubmit} className='flex border border-border p-2 text-accent justify-center hover:border-accent'>
            Done
          </div>
        </div>
        <div className='w-1/2'>
          <div className='flex flex-col'>
            <span className='text-txt-primary text-xl'>Logo:</span>
            {isLogoError && <span className='text-accent'>{logoError}</span>}
          </div>
          <div className={cn('flex gap-2 items-center mt-2 mb-1 text-sm')}>
            <Checkbox isChecked={!isLogo} onClick={handleLogoClick} />
            <label className='mt-0' htmlFor='logo'>
              No logo
            </label>
          </div>
          <div className='mb-2'>
            <div className={cn('flex gap-2 items-center text-sm ')}>
              <Checkbox isChecked={isDesignLogo} onClick={handleDesignLogoClick} />
              <label className='mt-0' htmlFor='designLogo'>
                I need a custom logo designed
              </label>
            </div>
            {isDesignLogo && (
              <div className='mx-6'>
                <label className='text-xs' htmlFor='logoNote'>
                  Description / Notes
                </label>
                <textarea onChange={handleChange} {...register('logoNote')} name='logoNote' rows='2' id='logoNote' />
              </div>
            )}
          </div>

          <div className={cn('flex gap-2 items-center  my-1 text-sm ')}>
            <Checkbox isChecked={isVector} onClick={handleVectorClick} />
            <label className='mt-0' htmlFor='vector'>
              I have a vector or .PNG image file*
            </label>
          </div>
          <div className={cn('flex gap-2 items-center mb-1 text-sm')}>
            <Checkbox isChecked={isNonVector} onClick={handleNonVectorClick} />
            <label className='mt-0' htmlFor='nonVector'>
              I have a non-vector image file*
            </label>
          </div>

          <Logo imageFile={imageFile} setImageFile={setImageFile} />
        </div>
      </div>
    </div>
  )
}
