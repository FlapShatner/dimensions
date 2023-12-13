import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn, defaultValues, checkABCErrors, uploadImage } from '../utils'
import { saveWindow } from '../services'
import { yupSchema } from '../yupSchema'
import Vehicle from './Vehicle'
import Customize from './Customize'
import { minHeight } from '../App'
import Standard from '../buttons/Standard'

export default function Form() {
  const [imageFile, setImageFile] = useState(null)

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: defaultValues,
  })
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
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-start gap-4 m-auto'>
        <Standard isStandard={isStandard} setIsStandard={setValue} register={register} />
        <div className='w-[423px]'>
          <Vehicle isStandard={isStandard} register={register} watch={watch} setValue={setValue} errors={errors} />
          <div className={cn('border border-t-0 border-border p-4', isStandard && 'opacity-40')}>
            <span className='text-accent my-4'>Window measurements:</span>
            <div className='flex gap-4 justify-between'>
              <div className='flex flex-col w-full'>
                <label htmlFor='a'>A:</label>
                <input style={{ minHeight: '0' }} disabled={isStandard} className='w-full' type='string' name='a' id='a' {...register('a')} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='b'>B:</label>
                <input style={{ minHeight: '0' }} disabled={isStandard} className='w-full' type='string' name='b' id='b' {...register('b')} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='c'>C:</label>
                <input style={{ minHeight: '0' }} disabled={isStandard} className='w-full' type='string' name='c' id='c' {...register('c')} />
              </div>
            </div>
            {!isStandard && checkABCErrors(errors) && <p className='text-accent'> Please enter values for A B and C. </p>}
          </div>
        </div>
        <Customize setImageFile={setImageFile} register={register} watch={watch} setValue={setValue} errors={errors} />
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
