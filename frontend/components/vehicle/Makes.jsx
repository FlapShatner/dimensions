import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useFormContext, Controller, set } from 'react-hook-form'
import { addMake, getMakes } from '../services.js'
import { matchesValue } from '../utils.js'
import { useAtom, useSetAtom } from 'jotai'
import { makeAtom, disableModelAtom, modelStateAtom, windowSizeAtom } from '../lib/atoms.js'

export default function Makes() {
 const setMakeObject = useSetAtom(makeAtom)
 const setDisableModels = useSetAtom(disableModelAtom)
 const setModelState = useSetAtom(modelStateAtom)
 const setWindowSize = useSetAtom(windowSizeAtom)
 const [options, setOptions] = useState([
  {
   label: 'Loading...',
   value: 'loading',
   id: '',
  },
 ])
 const [isLoading, setIsLoading] = useState(false)
 const [valueState, setValueState] = useState(null)

 const { control, setValue, watch } = useFormContext()
 const value = watch('make', '')

 const createOption = (make) => {
  const { name, id } = make
  const capitalizedLabel = name.charAt(0).toUpperCase() + name.slice(1)

  return {
   id: id,
   label: capitalizedLabel,
   value: name.toLowerCase().replace(/\W/g, ''),
  }
 }

 useEffect(() => {
  getMakes().then((data) => {
   const makes = data.map((make) => createOption(make))
   setOptions(makes)
  })
 }, [])

 const handleChange = (value, { action, removedValue }) => {
  switch (action) {
   case 'clear':
    setValue('make', '')
    setModelState({})
    setValueState(null)
    setWindowSize({ a: 0, b: 0, c: 0 })
    setDisableModels(true)
    break
   default:
    setValue('make', value.label)
    setValueState(value)
    setMakeObject(value)
    setWindowSize({ a: 0, b: 0, c: 0 })
    setModelState({})
    setDisableModels(false)
    break
  }
 }

 const handleCreate = async (inputValue) => {
  if (matchesValue(inputValue, options)) {
   setValue('make', inputValue.label)
   setValueState(inputValue)
   return
  }
  setIsLoading(true)
  try {
   const newOption = createOption(inputValue)
   const result = await addMake(newOption)
   setIsLoading(false)
   setOptions([...options, newOption])
   setValue('make', newOption.label)
   setValueState(newOption)
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <Controller
   name='make'
   control={control}
   render={({ field }) => (
    <CreatableSelect
     {...field}
     isClearable={true}
     isDisabled={isLoading}
     isLoading={isLoading}
     onChange={handleChange}
     onCreateOption={handleCreate}
     options={options}
     value={valueState}
     styles={{
      valueContainer: (base) => ({
       ...base,
       padding: '0',
       paddingLeft: '4px',
       minHeight: '0',
       height: '28px',
      }),
      control: (base) => ({
       ...base,
       minHeight: '0',
       border: '1px solid #d1d5db',
       backgroundColor: '#1A1A1A',
       boxShadow: 'none',
       borderRadius: 'none',
       padding: '0',
       height: '28px',
      }),
      container: (base) => ({
       ...base,
       width: '100%',
      }),
      input: (base) => ({
       ...base,
       minHeight: '0px !important',
       height: '28px !important',
       padding: '0',
       paddingLeft: '4px',
       color: '#D2AC53',
      }),
      placeholder: (base) => ({
       ...base,
       padding: '0',
       paddingLeft: '4px',
       minHeight: '0',
       height: '28px',
       color: '#D2AC53',
      }),
      indicatorsContainer: (base) => ({
       ...base,
       padding: '0',
       minHeight: '0',
       height: '28px',
      }),
      menu: (base) => ({
       ...base,
       backgroundColor: '#1A1A1A',
       color: '#D2AC53',
       border: '1px solid #D2D2D2',
       borderRadius: 'none',
      }),

      option: (base, state) => ({
       ...base,
       backgroundColor: state.isFocused ? '#252525fb' : '#1A1A1A',
       color: '#D2AC53',
      }),
      singleValue: (base) => ({
       ...base,
       color: '#D2AC53',
       minHeight: '0',
       height: '28px',
      }),
     }}
    />
   )}
  />
 )
}
