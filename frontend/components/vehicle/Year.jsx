import React from 'react'
import Icons from '../common/Icons'
import { getYears } from '../utils'
import { useAtom, useAtomValue } from 'jotai'
import { yearAtom, isStandardAtom, isAddVehicleAtom, addedYearAtom } from '../lib/atoms'

function Year() {
  const [year, setYear] = useAtom(yearAtom)
  const isStandard = useAtomValue(isStandardAtom)
  const isAddVehicle = useAtomValue(isAddVehicleAtom)
  const setAddedYear = useAtom(addedYearAtom)[1]

  const years = getYears()

  const handleChange = (e) => {
    if (isAddVehicle) {
      setAddedYear(e.target.value)
    } else {
      setYear(e.target.value)
    }
  }

  return (
    <div className='flex flex-col'>
      <p htmlFor='year'>Year:</p>
      <div className=' relative flex items-center border border-border isolate w-max'>
        <div className='absolute right-1 -z-10'>
          <Icons name='chevron-down' size='20' color='#D2D2D2' />
        </div>
        <select disabled={isStandard} className='px-2 py-[1px] bg-transparent ' name='year' id='year' value={year} onChange={handleChange}>
          {years.map((year) => (
            <option className='p-1 w-48 bg-bg-secondary' key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Year
