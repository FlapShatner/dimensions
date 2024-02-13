import React, { useEffect, useState } from 'react'
import { cn } from '../utils'
import Icons from '../common/Icons'
import WindowImage from './WindowImage'
import SizeBox from './SizeBox'
import { useAtomValue, useAtom } from 'jotai'
import { vehicleWithWindowAtom, loadingWindowAtom, disableWindowAtom, windowSizeAtom } from '../lib/atoms'
import { useWindowSize } from 'usehooks-ts'

function Measurements() {
  const selectedVehicle = useAtomValue(vehicleWithWindowAtom)
  const loadingWindow = useAtomValue(loadingWindowAtom)
  const [disableWindow] = useAtom(disableWindowAtom)
  const [windowSize, setWindowSize] = useAtom(windowSizeAtom)
  useEffect(() => {
    if (selectedVehicle && selectedVehicle.WindowSize) {
      setWindowSize({
        a: selectedVehicle.WindowSize.a,
        b: selectedVehicle.WindowSize.b,
        c: selectedVehicle.WindowSize.c,
      })
    }
  }, [selectedVehicle])

  return (
    <div className={cn('mt-4', disableWindow ? 'opacity-50' : 'opacity-100')}>
      <SizeBox className='ml-20' size={loadingWindow ? '0' : windowSize.a}>
        Top Width
      </SizeBox>

      <div className='flex gap-4 items-center'>
        <SizeBox size={loadingWindow ? '0' : windowSize.b}>Window Height</SizeBox>
        <WindowImage />
      </div>
      <SizeBox className='ml-20' size={loadingWindow ? '0' : windowSize.c}>
        Bottom Width
      </SizeBox>
    </div>
  )
}

export default Measurements
