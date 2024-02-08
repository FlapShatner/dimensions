import React from 'react'
import WindowImage from './WindowImage'
import SizeBox from './SizeBox'
import { useAtom } from 'jotai'
import { selectedVehicleAtom } from '../lib/atoms'

function Measurements() {
  const [selectedVehicle] = useAtom(selectedVehicleAtom)
  console.log('selectedVehicle', selectedVehicle)
  //   const { a, b, c } = selectedVehicle.WindowSize
  return (
    <div className='mt-4'>
      <SizeBox className='ml-20' size='a'>
        Top Width
      </SizeBox>
      <div className='flex gap-4 items-center'>
        <SizeBox size='a'>Window Height</SizeBox>
        <WindowImage />
      </div>
      <SizeBox className='ml-20' size='c'>
        Bottom Width
      </SizeBox>
    </div>
  )
}

export default Measurements
