import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { getYears, cn } from '../utils'
import Icons from '../common/Icons'
import WindowText from './WindowText'
import VehicleForm from './VehicleForm'

import WindowMeasure from './WindowMeasure'
import { saveWindow } from '../services'
import Spinner from '../common/Spinner'

export default function Vehicle({ setIsChecked, setMeasurements, setIsOpen }) {
  const [submitError, setSubmitError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMatch, setIsMatch] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

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
      console.log('no error', response)
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
        <VehicleForm setHasSearched={setHasSearched} setIsMatch={setIsMatch} />
        {hasSearched && (
          <>
            {isMatch ? (
              <p className='p-4 border-x-border border-x'>
                We have back window measurements for a vehicle that matches your information in our database. You may use them, or verify your measurements and
                enter them below
              </p>
            ) : (
              <p className='p-4 border-x-border border-x'>
                We don't have window measurements for your vehicle in our database yet. Please measure your window and enter them below.
              </p>
            )}
            <WindowMeasure isStandard={isStandard} />
          </>
        )}
      </div>
      <SubmissionMessages submitError={submitError} isSuccess={isSuccess} />
      <SubmitButton onSubmit={onSubmit} onError={onError} isLoading={isLoading} onClick={handleSubmit(onSubmit, onError)} />
      <GuideInstructions />
      <BackWindowGuide />

      <WindowText />
      {!isStandard && <HighlightInputColor />}
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
      <Icons name='down' size='16' color='#13FC00' />
      Follow the guide below and get your truck window measurements
      <Icons name='down' size='16' color='#13FC00' />
    </p>
  )
}

function BackWindowGuide() {
  return <img src='https://res.cloudinary.com/dkxssdk96/image/upload/f_auto,q_auto/v1/assets/maplwkrdmcmjgd3nw2r4' alt='Back window measurement guide' />
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
