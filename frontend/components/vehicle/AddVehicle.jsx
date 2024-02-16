import React from 'react'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import AddMeasurements from './AddMeasurements'
import AddDoors from './AddDoors'
import Year from './Year'
import SubmitButton from './SubmitButton'
import { addedMakeAtom, addedModelAtom, addedVehicleAtom } from '../lib/atoms'

function AddVehicle() {
  const [addedMake, setAddedMake] = useAtom(addedMakeAtom)
  const [addedModel, setAddedModel] = useAtom(addedModelAtom)
  const [addedVehicle, setAddedVehicle] = useAtom(addedVehicleAtom)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'make') {
      setAddedMake(value)
    }
    if (name === 'model') {
      setAddedModel(value)
    }
  }

  return (
    <div className='flex flex-col border border-border p-4 max-w-sm m-auto'>
      <p className='text-accent text-center mb-2'>Please enter your vehicle information and the measurements of its back window.</p>

      <div className='flex flex-col gap-4 my-4'>
        <Year />
        <div className='flex flex-col w-full'>
          <label htmlFor='make'>Make:</label>
          <input onChange={handleChange} type='text' id='make' name='make' className={cn('input border border-border')} />
        </div>
        <div className='flex flex-col w-full  '>
          <label htmlFor='model'>Model:</label>
          <input onChange={handleChange} type='text' id='model' name='model' className={cn('input border border-border')} />
        </div>
      </div>
      <div className={cn('text-center')}></div>
      <div className=' flex flex-col gap-6 justify-start'>
        <div className='flex gap-8 justify-start'>
          <div>
            <span>Doors:</span>
            <AddDoors />
          </div>
        </div>
      </div>
      <p className='text-accent text-xs mb-2 mt-4 w-[300px] text-center m-auto'>
        Measure the width in inches of the window from corner to corner at the top, the width of the window at the bottom, and the height of the window.
      </p>
      <AddMeasurements />
      <SubmitButton />
    </div>
  )
}

export default AddVehicle
