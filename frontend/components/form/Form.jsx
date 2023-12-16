import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn, checkABCErrors, uploadImage } from '../utils'
import { saveWindow } from '../services'
import { yupSchema } from '../lib/yupSchema'
import Vehicle from '../vehicle/Vehicle'
import Customize from './Customize'
import { minHeight } from '../App'
import Standard from '../size/Standard'

export default function Form() {
 const [imageFile, setImageFile] = useState(null)

 const onSubmit = async (data) => {
  if (imageFile) {
   const response = await uploadImage(imageFile)
   console.log(response)
  }
  if (data.standard) {
   console.log('User chose standard size')
   return
  }
  const response = await saveWindow(data)
  console.log(response)
 }

 // console.log(errors)
 const isStandard = watch('standard')

 return (
  <div className='bg-bg-secondary p-6 text-txt-primary w-min m-auto'>
   <form
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col items-start gap-4 m-auto'>
    <Customize
     setImageFile={setImageFile}
     register={register}
     watch={watch}
     setValue={setValue}
     errors={errors}
    />
    <div
     onClick={handleSubmit(onSubmit)}
     className='ml-auto text-center cursor-pointer py-2 px-4 w-1/2 hover:w-full border-2 border-border hover:text-txt-primary hover:border-accent text-accent transition-all ease-in-out duration-400'
     type='submit'>
     Submit
    </div>
   </form>
   <DevTool control={control} />
  </div>
 )
}
