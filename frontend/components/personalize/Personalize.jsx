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

  return (
    <>
      <div className='flex flex-col py-4 '>
        <h2 className='text-2xl text-txt-primary font-sans'> Personalize Your Graphics:</h2>
        <Text />
        <Business setImageFile={setImageFile} />
      </div>
    </>
  )
}
