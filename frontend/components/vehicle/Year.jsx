import React from 'react'
import { useFormContext } from 'react-hook-form'
import Icons from '../common/Icons'
import { getYears } from '../utils'
import { useAtom, useSetAtom } from 'jotai'
import { yearAtom, makeAtom } from '../lib/atoms'

function Year() {
 const [year, setYear] = useAtom(yearAtom)
 const setMake = useSetAtom(makeAtom)
 const { watch, register } = useFormContext()
 const isStandard = watch('standard')
 const years = getYears()

 const handleChange = (e) => {
  setYear(e.target.value)
 }

 return (
  <div className='flex flex-col'>
   <p htmlFor='year'>Year:</p>
   <div className=' relative flex items-center border border-border isolate w-max'>
    <div className='absolute right-1 -z-10'>
     <Icons
      name='chevron-down'
      size='20'
      color='#D2D2D2'
     />
    </div>
    <select
     //  {...register('year')}
     disabled={isStandard}
     className='px-2 py-[1px] bg-transparent '
     name='year'
     id='year'
     value={year}
     onChange={handleChange}>
     {years.map((year) => (
      <option
       className='p-1 w-48 bg-bg-secondary'
       key={year}
       value={year}>
       {year}
      </option>
     ))}
    </select>
   </div>
  </div>
 )
}

export default Year
