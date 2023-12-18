import React, { useState } from 'react'
import Logo from '../form/Logo'
import Checkbox from '../common/Checkbox'
import { set, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { states } from '../lib/states'
import { cn, formatPhoneNumber } from '../utils'
import { minHeight } from '../App'

export default function BusinessForm({ setImageFile, currentImage, setIsOpen }) {
  const [isError, setIsError] = useState(false)
  const {
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext()
  const name = watch('businessName')
  const isBusiness = watch('business')
  const isLogo = watch('logo')

  const handleClick = (e) => {
    e.stopPropagation()
    setValue('logo', !isLogo)
  }

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value)
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setValue('phone', formattedPhone)
  }

  const onSubmit = () => {
    if (!name) {
      setIsError(true)
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
          {isError && <p className='text-accent'>Please enter a business name</p>}
          <div onClick={onSubmit} className='flex border border-border p-2 text-accent justify-center hover:border-accent'>
            Done
          </div>
        </div>
        <div className='w-1/2'>
          <div className={cn('flex gap-2 items-center mb-2 ')}>
            <Checkbox isChecked={isLogo} onClick={handleClick} />
            <label className='mt-0' htmlFor='logo'>
              Use your logo*
            </label>
          </div>
          <Logo currentImage={currentImage} setImageFile={setImageFile} />
        </div>
      </div>
    </div>
  )
}
