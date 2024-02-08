import React from 'react'

function Class({ register, isStandard }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='class'>Truck Class:</label>
      <div className=' relative flex items-center border border-border isolate'>
        <div className='absolute right-1 -z-10'>
          <Icons name='chevron-down' size='20' color='#D2D2D2' />
        </div>
        <select {...register('class')} disabled={isStandard} className='bg-transparent  pl-1' name='class' id='class'>
          <option className='bg-bg-secondary' value='MIDSIZE'>
            Mid Size
          </option>
          <option className='bg-bg-secondary' value='HALF'>
            1/2 Ton
          </option>
          <option className='bg-bg-secondary' option value='THREEQUARTER'>
            3/4 Ton
          </option>
          <option className='bg-bg-secondary' value='ONE'>
            1 Ton
          </option>
          <option className='bg-bg-secondary' value='OTHER'>
            Other
          </option>
        </select>
      </div>
    </div>
  )
}

export default Class
