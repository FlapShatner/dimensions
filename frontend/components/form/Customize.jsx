import React from 'react'
import Logo from './Logo'

import { ErrorMessage } from '@hookform/error-message'
import { cn, formatPhoneNumber } from '../utils'
import { states } from '../lib/states'
import { minHeight } from '../App'

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
   <h2 className='text-3xl text-txt-primary'>Customize My Back Window Graphics:</h2>
   <div className='flex flex-col'>
    <div className='flex flex-col border-b px-4 border border-border my-2'>
     <div className='flex gap-2 items-center py-2'>
      <input
       style={minHeight}
       className='accent-accent w-4'
       {...register('customText')}
       type='checkbox'
       name='customText'
       id='customText'
      />
      <label htmlFor='customText'>Personalize with Text</label>
     </div>
     <div className={cn('flex flex-col pb-4', !isCustomText && 'hidden')}>
      <label htmlFor='customTextField'>Your custom text:</label>
      <input
       style={minHeight}
       {...register('customTextField')}
       type='text'
       name='customTextField'
       id='customTextField'
       disabled={!isCustomText}
      />
      {isCustomText && (
       <ErrorMessage
        errors={errors}
        name='customTextField'
        render={({ message }) => <p className='text-accent'>{message}</p>}
       />
      )}
     </div>
    </div>
    <div className=' border border-border mt-2'>
     <div className='flex items-center py-2 px-4 gap-2'>
      <input
       style={minHeight}
       className='accent-accent w-4'
       {...register('business')}
       type='checkbox'
       name='business'
       id='business'
      />
      <label htmlFor='business'>Personalize with Business Info</label>
     </div>
     <div className={cn('flex flex-col p-4', !isBusiness && 'hidden')}>
      <div className={cn('flex gap-2 items-center mb-2')}>
       <input
        style={minHeight}
        className='accent-accent w-4'
        {...register('logo')}
        type='checkbox'
        name='logo'
        id='logo'
        disabled={!isBusiness}
       />
       <label
        className='mt-0'
        htmlFor='logo'>
        Use your logo*
       </label>
      </div>
      <Logo
       setImageFile={setImageFile}
       isLogo={isLogo}
       isBusiness={isBusiness}
       register={register}
       errors={errors}
      />
     </div>
     <div className={cn('flex flex-col gap-4 p-4 ', !isBusiness && 'hidden')}>
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
        />
        {isBusiness && (
         <ErrorMessage
          errors={errors}
          name='businessName'
          render={({ message }) => <p className='text-accent'>{message}</p>}
         />
        )}
       </div>
       <div className='flex flex-col '>
        <label htmlFor='slogan'>
         Slogan
         <span className='text-xs ml-3'>Example: "Your 1 stop shop for custom graphics"</span>
        </label>
        <input
         style={minHeight}
         disabled={!isBusiness}
         {...register('slogan')}
         type='text'
         name='slogan'
         id='slogan'
        />
       </div>
      </div>
      <div className='flex gap-4'>
       <div className='flex flex-col w-full'>
        <label htmlFor='city'>City</label>
        <input
         style={minHeight}
         disabled={!isBusiness}
         {...register('city')}
         type='text'
         name='city'
         id='city'
        />
       </div>
       <div className='flex flex-col w-full'>
        <label htmlFor='state'>State</label>
        <select
         {...register('state')}
         disabled={!isBusiness}
         className='px-2 py-[1px] bg-bg-secondary border border-border '
         name='year'
         id='year'>
         {states.map((state) => (
          <option
           className='p-1'
           key={state.abbreviation}
           value={state.name}>
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
        <input
         style={minHeight}
         {...register('website')}
         type='url'
         name='website'
         id='website'
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}
