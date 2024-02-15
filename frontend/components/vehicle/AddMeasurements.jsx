import React from 'react'
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
        <input onChange={handleChange} className='mb-2 w-10 border border-border' type='text' id='a' />
        <Icons name='width' width='40' height='40' color='currentColor' />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <input onChange={handleChange} className='w-10 border border-border' type='text' id='b' />
        <Icons name='height' width='40' height='40' color='currentColor' />
        <WindowImage className='w-1/2 p-0 mt-0' />
      </div>
      <div className='ml-14 flex flex-col items-center'>
        <Icons name='width' width='40' height='40' color='currentColor' />
        <input onChange={handleChange} className='mt-2 w-10 border border-border' type='text' id='c' />
      </div>
    </div>
  )
}

export default AddMeasurements
