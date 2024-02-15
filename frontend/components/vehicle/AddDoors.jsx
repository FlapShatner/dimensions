import React from 'react'
import { cn } from '../utils'
import Icons from '../common/Icons'
import { getVehicleWithWindow } from '../services'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectedModelAtom, disableDoorAtom, vehicleWithWindowAtom, loadingWindowAtom, addedDoorsAtom } from '../lib/atoms'

function Doors() {
  const setAddedDoors = useSetAtom(addedDoorsAtom)
  const options = [
    { label: '2', value: '2' },
    { label: '4', value: '4' },
  ]

  const handleChange = async (e) => {
    setAddedDoors(e.target.value)
  }

  return (
    <div className={cn('relative flex items-center border border-border isolate w-max')}>
      <div className='absolute right-1 -z-10'>
        <Icons name='chevron-down' size='20' color='#D2D2D2' />
      </div>
      <select onChange={handleChange} className='px-2 py-[1px] bg-transparent  '>
        {options.map((option) => {
          return (
            <option className='p-1 w-48 bg-bg-secondary ' key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Doors
