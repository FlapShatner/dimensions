import React, { useState, useRef } from 'react'
import Modal from '../common/Modal'
import Icons from '../common/Icons'
import { cn } from '../utils'
import { minHeight } from '../App'
import Vehicle from '../vehicle/Vehicle'
import Checkbox from '../common/Checkbox'
import { useFormContext } from 'react-hook-form'
import { useWindowSize } from 'usehooks-ts'

export default function Custom({ setIsCustom, isCustom }) {
  const [isOpen, setIsOpen] = useState(false)
  const [measurements, setMeasurements] = useState({
    a: '',
    b: '',
    c: '',
  })
  const { methods, watch, setValue } = useFormContext()
  const isStandard = watch('standard')

  const handleClick = (e) => {
    e.stopPropagation()
    setIsOpen(true)
    if (isStandard) {
      setValue('standard', false)
    }
  }

  return (
    <Modal
      onClose={() => console.log('closed')}
      maxWidth='700px'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
      contents={<Vehicle setIsChecked={setIsCustom} setIsOpen={setIsOpen} setMeasurements={setMeasurements} {...methods} />}>
      <div className='flex flex-col p-4 border border-border'>
        <div className='flex gap-2 items-center'>
          <Checkbox onClick={handleClick} isChecked={isCustom} />
          {isCustom ? <span className='text-accent'>Your window measurements:</span> : <span className='underline'>Enter your window measurements</span>}
        </div>
        {isCustom && (
          <div className='flex gap-4 ml-6 mt-2 text-accent'>
            <span>
              A: <span> {measurements.a}" </span>{' '}
            </span>
            <span>
              B: <span> {measurements.b}" </span>
            </span>
            <span>
              C: <span> {measurements.c}" </span>
            </span>
          </div>
        )}

        <div className='mx-6'></div>
        {!isCustom && <span className=' flex flex-col mt-1 ml-8 text-xs font-medium text-accent opacity-70'>*Highly recommended for best results</span>}
      </div>
    </Modal>
  )
}
