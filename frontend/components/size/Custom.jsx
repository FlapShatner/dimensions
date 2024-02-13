import React, { useState } from 'react'
import Modal from '../common/Modal'

import Vehicle from '../vehicle/Vehicle'
import Checkbox from '../common/Checkbox'
import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { chosenWindowSizeAtom, makeAtom, modelStateAtom, yearAtom, loadingWindowAtom, isStandardAtom, isCustomAtom } from '../lib/atoms'
import MiniMeasure from '../vehicle/miniMeasure'

export default function Custom() {
  const [isCustom, setIsCustom] = useAtom(isCustomAtom)
  const [isStandard, setIsStandard] = useAtom(isStandardAtom)
  const setLoadingWindow = useSetAtom(loadingWindowAtom)
  const setMake = useSetAtom(makeAtom)
  const setModelState = useSetAtom(modelStateAtom)
  const setYear = useSetAtom(yearAtom)
  const chosenWindowSize = useAtomValue(chosenWindowSizeAtom)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e) => {
    setIsOpen(true)
    setIsCustom(true)
    if (isStandard) {
      setIsStandard(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setLoadingWindow(true)
    setMake({})
    setModelState({})
    setYear(2022)
  }

  const isWindowChosen = Object.keys(chosenWindowSize).length != 0 && Object.values(chosenWindowSize).every((val) => val !== 0)

  return (
    <Modal
      onClose={handleClose}
      maxWidth='700px'
      isOpen={isOpen}
      setIsOpen={handleClick}
      closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
      contents={<Vehicle setIsOpen={setIsOpen} />}>
      <div className='flex flex-col p-4 border border-border'>
        <div className='flex gap-2 items-center'>
          <Checkbox onClick={handleClick} isChecked={isWindowChosen && isCustom} />
          {isWindowChosen ? (
            <span className='text-accent'>Your window measurements:</span>
          ) : (
            <span className='underline'>Look up your window measurements</span>
          )}
        </div>
        {isWindowChosen && <MiniMeasure />}

        <div className='mx-6'></div>
        {!isWindowChosen && <span className=' flex flex-col mt-1 ml-8 text-xs font-medium text-accent opacity-70'>*Highly recommended for best results</span>}
      </div>
    </Modal>
  )
}
