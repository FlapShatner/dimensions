import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'

export default function Makes() {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(null)

  const createOption = (label) => {
    return {
      label,
      value: label.toLowerCase().replace(/\W/g, ''),
    }
  }

  useEffect(() => {
    getMakes().then((data) => {
      const makes = data.map((make) => createOption(make))
      setOptions(makes)
    })
  }, [])
  const handleCreate = (inputValue) => {
    setIsLoading(true)
    console.group('Option created')
    console.log('Wait a moment...')
    setTimeout(() => {
      const newOption = createOption(inputValue)
      console.log(newOption)
      console.groupEnd()
      setIsLoading(false)
      setOptions([...options, newOption])
      setValue(newOption)
    }, 1000)
  }

  //   TODO: Finish this. Function above won't work yet.

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={setValue}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  )
}
