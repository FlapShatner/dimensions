import React, { useState } from 'react'
import Icons from '../common/Icons'
import WindowImage from './WindowImage'
import { useAtom } from 'jotai'
import { addedWindowAtom } from '../lib/atoms'

function AddMeasurements() {
  const [addedWindow, setAddedWindow] = useAtom(addedWindowAtom)

  const handleChange = (e) => {
    const { id, value } = e.target
    setAddedWindow({ ...addedWindow, [id]: value })
  }

  return (
    <div className='flex flex-col items-center -ml-8 gap-2 text-accent'>
      <div className='ml-14 flex flex-col items-center'>
        <div className='flex border border-border mb-2'>
          <input onChange={handleChange} value={addedWindow.a} className='text-end  w-10 ' type='text' id='a' />
          <span className='bg-input-bg'> "</span>
        </div>
        <Icons name='width' width='40' height='40' color='currentColor' />
      </div>
      <div className='flex justify-center items-center gap-2 '>
        <div className='flex border border-border'>
          <input onChange={handleChange} value={addedWindow.b} className=' text-end w-10 ' type='text' id='b' />
          <span className='bg-input-bg'>"</span>
        </div>
        <Icons name='height' width='40' height='40' color='currentColor' />
        <WindowImage className='w-1/2 p-0 mt-0' />
      </div>
      <div className='ml-14 flex flex-col items-center'>
        <Icons name='width' width='40' height='40' color='currentColor' />
        <div className='flex items-center mt-2 border border-border'>
          <input onChange={handleChange} value={addedWindow.c} className='text-end w-10 ' type='text' id='c' />
          <span className='bg-input-bg'>"</span>
        </div>
      </div>
    </div>
  )
}

export default AddMeasurements
