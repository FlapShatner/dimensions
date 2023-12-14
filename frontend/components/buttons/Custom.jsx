import React, { useState } from 'react'
import Modal from '../form/Modal'
import { minHeight } from '../App'
import Vehicle from '../form/Vehicle'
import { useFormContext } from 'react-hook-form'

export default function Custom() {
  const [isOpen, setIsOpen] = useState(false)
  const { methods } = useFormContext()
  return (
    <Modal
      maxWidth='700px'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
      contents={<Vehicle {...methods} />}>
      <div className='flex flex-col p-4 border border-border '>
        <div className='flex gap-2'>
          <input style={minHeight} className='accent-accent w-4 ' type='checkbox' name='standard' id='standard' />
          <label htmlFor='standard'>Enter your window measurements</label>
        </div>
        <span className=' flex flex-col mt-1 ml-8 text-xs font-medium text-accent opacity-70'>*Highly recommended for best results</span>
      </div>
    </Modal>
  )
}
