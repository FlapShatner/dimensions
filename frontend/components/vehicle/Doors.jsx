import React from 'react'
import { cn } from '../utils'
import Icons from '../common/Icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectedModelAtom, disableWindowAtom, disableDoorAtom } from '../lib/atoms'

function Doors() {
  const selectedModel = useAtomValue(selectedModelAtom)
  const setDisableWindow = useSetAtom(disableWindowAtom)
  const disableDoor = useAtomValue(disableDoorAtom)
  const createOptions = (array) => {
    console.log('Array:', array)
    try {
      const uniqueItems = [...new Set(array.map((item) => item.doors))]
      return uniqueItems.map((value) => {
        return {
          label: value,
          value: value,
        }
      })
    } catch (error) {
      console.log('Error creating options:', error)
    }
  }
  let options = [{ label: '0', value: '0' }]
  if (selectedModel.length > 0) {
    options = createOptions(selectedModel)
  }

  const handleChange = () => {}

  return (
    <div className={cn('relative flex items-center border border-border isolate w-max', disableDoor ? 'opacity-50' : 'opacity-100')}>
      <div className='absolute right-1 -z-10'>
        <Icons name='chevron-down' size='20' color='#D2D2D2' />
      </div>
      <select disabled={disableDoor} onChange={handleChange} className='px-2 py-[1px] bg-transparent '>
        {options.map((option) => {
          return (
            <option className='p-1 w-48 bg-bg-secondary' key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Doors
