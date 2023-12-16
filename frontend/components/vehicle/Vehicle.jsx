import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { getYears, cn } from '../utils'
import Icons from '../common/Icons'
import WindowText from './WindowText'
import Radio from './Radio'
import WindowMeasure from './WindowMeasure'
import { saveWindow } from '../services'
import Spinner from '../common/Spinner'

export default function Vehicle({ setIsChecked, setMeasurements, setIsOpen }) {
 const [submitError, setSubmitError] = useState(false)
 const [isSuccess, setIsSuccess] = useState(false)
 const [isLoading, setIsLoading] = useState(false)

 const {
  register,
  watch,
  formState: { errors },
  setValue,
  handleSubmit,
 } = useFormContext()

 const onSubmit = async (data, e) => {
  setIsLoading(true)
  e.preventDefault()
  try {
   const response = await saveWindow(data)
   console.log(response.message)
   setValue('standard', false)
   setIsChecked(true)
   setMeasurements({ c: data.c, a: data.a, b: data.b })
   setIsLoading(false)
   setIsSuccess(true)
   setTimeout(() => {
    setIsSuccess(false)
    setIsOpen(false)
   }, 1000)
  } catch (error) {
   console.log('Error saving window', error)
   setSubmitError(true)
   setTimeout(() => setSubmitError(false), 3000)
   setIsLoading(false)
  }
 }

 const onError = (errors, e) => console.log('errors', errors)

 const years = getYears()
 const isStandard = watch('standard')

 return (
  <div className={cn('flex flex-col gap-4', isStandard && 'opacity-40')}>
   <h2 className='text-txt-primary mb-3 text-3xl'>Vehicle Info:</h2>
   <div>
    <VehicleForm
     years={years}
     isStandard={isStandard}
     errors={errors}
     register={register}
    />
    <WindowMeasure isStandard={isStandard} />
   </div>
   <SubmissionMessages
    submitError={submitError}
    isSuccess={isSuccess}
   />
   <SubmitButton
    onSubmit={onSubmit}
    onError={onError}
    isLoading={isLoading}
    onClick={handleSubmit(onSubmit, onError)}
   />
   <GuideInstructions />
   <BackWindowGuide />

   <WindowText />
   {!isStandard && <HighlightInputColor />}
  </div>
 )
}

function VehicleForm({ years, isStandard, errors, register }) {
 return (
  <div className='flex flex-col border border-border p-4'>
   <div className='flex gap-4 mb-4'>
    <div className='flex flex-col'>
     <label htmlFor='year'>Year:</label>
     <select
      {...register('year')}
      disabled={isStandard}
      className='px-2 py-[1px] bg-bg-secondary border border-border '
      name='year'
      id='year'>
      {years.map((year) => (
       <option
        className='p-1'
        key={year}
        value={year}>
        {year}
       </option>
      ))}
     </select>
    </div>
    <div className='flex flex-col flex-1 w-12'>
     <label htmlFor='make'>Make:</label>
     <input
      className='px-1'
      style={{ minHeight: '0' }}
      {...register('make')}
      disabled={isStandard}
      type='text'
      name='make'
      id='make'
     />
    </div>
    <div className='flex flex-col flex-1 w-12'>
     <label htmlFor='model'>Model:</label>
     <input
      style={{ minHeight: '0' }}
      {...register('model')}
      disabled={isStandard}
      className='flex flex-shrink px-1'
      type='text'
      name='model'
      id='model'
     />
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

   <div className=' flex gap-6 justify-between mt-4'>
    <Radio value='2DOOR'>2 Door</Radio>
    <Radio value='4DOOR'>4 Door</Radio>
    <div className='flex gap-2'>
     <label htmlFor='class'>Truck Class:</label>
     <select
      {...register('class')}
      disabled={isStandard}
      className='bg-bg-secondary border border-border pl-1'
      name='class'
      id='class'>
      <option value='MIDSIZE'>Mid Size</option>
      <option value='HALF'>1/2 Ton</option>
      <option value='THREEQUARTER'>3/4 Ton</option>
      <option value='ONE'>1 Ton</option>
      <option value='OTHER'>Other</option>
     </select>
    </div>
   </div>
  </div>
 )
}

function SubmissionMessages({ submitError, isSuccess }) {
 return (
  <>
   {submitError && <p className='text-center text-red-500'>Did not submit successfully, please try again</p>}
   {isSuccess && <p className='text-center text-accent'>Submitted successfully!</p>}
  </>
 )
}

function SubmitButton({ isLoading, onSubmit, onError }) {
 const { handleSubmit } = useFormContext()
 return (
  <div
   onClick={handleSubmit(onSubmit, onError)}
   className={cn(
    'w-1/2  m-auto border border-border text-accent text-xl flex items-center justify-center cursor-pointer hover:border-accent  hover:bg-bg-secondary transition-all mt-2 h-12',
    isLoading && 'border-accent'
   )}>
   {isLoading ? <Spinner /> : 'Submit'}
  </div>
 )
}

function GuideInstructions() {
 return (
  <p className='mt-1 text-center text-accent flex items-center justify-center gap-2'>
   <Icons
    name='down'
    size='16'
    color='#13FC00'
   />
   Follow the guide below and get your truck window measurements
   <Icons
    name='down'
    size='16'
    color='#13FC00'
   />
  </p>
 )
}

function BackWindowGuide() {
 return (
  <img
   src='https://res.cloudinary.com/dkxssdk96/image/upload/f_auto,q_auto/v1/assets/maplwkrdmcmjgd3nw2r4'
   alt='Back window measurement guide'
  />
 )
}

function HighlightInputColor() {
 return (
  <style>
   {`
        input, select{
            color:#13FC00;
        }
        `}
  </style>
 )
}
