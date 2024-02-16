import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import {
  chosenWindowSizeAtom,
  isAddVehicleAtom,
  addedWindowAtom,
  addedDoorsAtom,
  addedMakeAtom,
  addedModelAtom,
  addedYearAtom,
  windowSizeAtom,
  didAddVehicleAtom,
  newVehicleIdAtom,
  isVehicleOpenAtom,
  loadingWindowAtom,
} from '../lib/atoms'
import { makeVehicle, cn } from '../utils'
import { saveVehicle } from '../services'
import Spinner from '../common/Spinner'
import { set } from 'react-hook-form'

export default function SubmitButton() {
  const [chosenWindowSize, setChosenWindowSize] = useAtom(chosenWindowSizeAtom)
  const isAddVehicle = useAtomValue(isAddVehicleAtom)
  const addedWindow = useAtomValue(addedWindowAtom)
  const addedDoors = useAtomValue(addedDoorsAtom)
  const addedMake = useAtomValue(addedMakeAtom)
  const addedModel = useAtomValue(addedModelAtom)
  const addedYear = useAtomValue(addedYearAtom)
  const windowSize = useAtomValue(windowSizeAtom)
  const setNewVehicleId = useSetAtom(newVehicleIdAtom)
  const setDidAddVehicle = useSetAtom(didAddVehicleAtom)
  const setIsOpen = useSetAtom(isVehicleOpenAtom)
  const [loadingWindow, setLoadingWindow] = useAtom(loadingWindowAtom)

  const handleSubmit = async () => {
    setLoadingWindow(true)
    if (isAddVehicle) {
      setChosenWindowSize(addedWindow)
      const data = makeVehicle(addedMake, addedModel, addedYear, addedDoors, addedWindow)
      const response = await saveVehicle(data)
      setDidAddVehicle(true)
      setNewVehicleId(response.id)
      setIsOpen(false)
    } else {
      setChosenWindowSize(windowSize)
      setDidAddVehicle(false)
      setIsOpen(false)
    }
    setLoadingWindow(false)
  }

  const handleCancel = () => {
    setDidAddVehicle(false)
    setNewVehicleId(null)
    setIsOpen(false)
  }

  return (
    <div className='flex gap-4 justify-center mt-4'>
      <div
        onClick={handleSubmit}
        className={cn(
          'w-[187px]  m-auto border border-border text-accent text-xl flex items-center justify-center cursor-pointer hover:border-accent  hover:bg-bg-secondary transition-all px-4 py-2'
        )}>
        {loadingWindow ? <Spinner /> : 'Ok'}
      </div>
      <div
        onClick={handleCancel}
        className={cn(
          'w-[187px]  m-auto border border-border text-accent text-xl flex items-center justify-center cursor-pointer hover:border-accent  hover:bg-bg-primary transition-all px-4 py-2'
        )}>
        Cancel
      </div>
    </div>
  )
}
