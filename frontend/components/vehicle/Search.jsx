import React, { useState } from 'react'
import { getVehicle } from '../services'
import { useFormContext } from 'react-hook-form'

export default function Search({ setIsMatch, setHasSearched }) {
  const { watch, setValue } = useFormContext()

  const make = watch('make', '')
  const model = watch('model', '')
  const year = watch('year', '')
  const classType = watch('class', '')
  const doors = watch('doors', '')

  const handleSearch = () => {
    const data = {
      year: year ? year : null,
      make: make ? make : null,
      model: model ? model : null,
      doors: doors ? doors : null,
      class: classType ? classType : null,
    }
    getVehicle(data).then((data) => {
      setHasSearched(true)
      if (data && data.length === 0) {
        setIsMatch(false)
        return
      }
      setIsMatch(true)
      setValue('a', data[0].window[0].a)
      setValue('b', data[0].window[0].b)
      setValue('c', data[0].window[0].c)
    })
  }

  return (
    <div
      onClick={handleSearch}
      className='bg-txt-primary px-20 py-2 mt-4 text-center ml-auto text-bg-secondary font-semibold cursor-pointer border border-bg-secondary hover:bg-bg-secondary hover:text-txt-primary hover:border hover:border-border'>
      Search
    </div>
  )
}
