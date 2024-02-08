import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useFormContext, Controller } from 'react-hook-form'
import { getModels, getVehicleWithWindow } from '../services'
import { useAtom } from 'jotai'
import { vehiclesAtom, makeAtom, yearAtom, selectedVehicleAtom, doorsAtom } from '../lib/atoms.js'

function Models() {
  const [vehiclesArray, setVehiclesArray] = useAtom(vehiclesAtom)
  const [doors, setDoors] = useAtom(doorsAtom)
  const [options, setOptions] = useState([
    {
      label: 'Loading...',
      value: 'loading',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [valueState, setValueState] = useState(null)
  const [makeValue, setMakeValue] = useAtom(makeAtom)
  const [year, setYear] = useAtom(yearAtom)
  const [selectedVehicle, setSelectedVehicle] = useAtom(selectedVehicleAtom)
  const { control, setValue, watch } = useFormContext()

  const createOptions = (vehicles) => {
    const uniqueModelNames = [...new Set(vehicles.map((vehicle) => vehicle.Model.name))]
    return uniqueModelNames.map((model) => {
      return {
        label: model,
        value: model,
      }
    })
  }

  useEffect(() => {
    console.log('makeValue', makeValue, 'year', year)
    getModels({ id: makeValue.id, year: year })
      .then((data) => {
        if (!data || data.length === 0) {
          setOptions([
            {
              label: 'No models found',
              value: 'none',
            },
          ])
          return
        }
        const models = createOptions(data)
        setOptions(models)
        setVehiclesArray(data)
      })
      .catch((error) => console.error('Error fetching models:', error))
  }, [makeValue, year])

  const getSelectedVehicle = async (model) => {
    const selectedVehicles = vehiclesArray.filter((vehicle) => vehicle.Model.name === model)
    const selectedVehicle = await selectedVehicles.find((vehicle) => vehicle.doors === doors)
    console.log('selectedVehicle', selectedVehicle)
    const vehicleId = selectedVehicle.id
    const vehicleWithWindow = getVehicleWithWindow(vehicleId)
  }

  const handleChange = (value, { action, removedValue }) => {
    switch (action) {
      case 'clear':
        setValue('model', '')
        setValueState(null)
        break
      default:
        setValue('model', value.label)
        setValueState(value)
        setSelectedVehicle(getSelectedVehicle(value.label))
        break
    }
  }

  const handleCreate = async (inputValue) => {}

  return (
    <div>
      <Controller
        name='model'
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
    </div>
  )
}

export default Models
