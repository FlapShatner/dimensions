import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useFormContext, Controller } from 'react-hook-form'
import { addMake, getMakes } from '../services.js'
import { matchesValue } from '../utils.js'

export default function Makes() {
  const [options, setOptions] = useState([
    {
      label: 'Loading...',
      value: 'loading',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [valueState, setValueState] = useState(null)

  const { control, setValue, watch } = useFormContext()
  const value = watch('make', '')

  const createOption = (label) => {
    // console.log(label)
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)

    return {
      label: capitalizedLabel,
      value: label.toLowerCase().replace(/\W/g, ''),
    }
  }

  useEffect(() => {
    getMakes().then((data) => {
      const makes = data.map((make) => createOption(make.make))
      setOptions(makes)
    })
  }, [])

  const handleChange = (newValue) => {
    setValue('make', newValue.label)
    setValueState(newValue)
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
          isClearable
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
              color: '#13FC00',
            }),
            placeholder: (base) => ({
              ...base,
              padding: '0',
              paddingLeft: '4px',
              minHeight: '0',
              height: '28px',
              color: '#13FC00',
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
              color: '#13FC00',
              border: '1px solid #D2D2D2',
              borderRadius: 'none',
            }),

            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#252525fb' : '#1A1A1A',
              color: '#13FC00',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#13FC00',
              minHeight: '0',
              height: '28px',
            }),
          }}
        />
      )}
    />
  )
}
