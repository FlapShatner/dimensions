import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useFormContext, Controller, set } from 'react-hook-form'
import { getModels, getVehicleWithWindow } from '../services'
import { useAtom, useSetAtom, useAtomValue } from 'jotai'
import {
  vehiclesAtom,
  makeAtom,
  yearAtom,
  selectedModelAtom,
  doorsAtom,
  disableWindowAtom,
  disableDoorAtom,
  disableModelAtom,
  loadingWindowAtom,
  vehicleWithWindowAtom,
} from '../lib/atoms.js'

function Models() {
  const [vehiclesArray, setVehiclesArray] = useAtom(vehiclesAtom)
  const [selectedModel, setSelectedModel] = useAtom(selectedModelAtom)
  const [loadingWindow, setLoadingWindow] = useAtom(loadingWindowAtom)
  const setDisableDoor = useSetAtom(disableDoorAtom)
  const setDisableWindow = useSetAtom(disableWindowAtom)

  const setVehicleWithWindow = useSetAtom(vehicleWithWindowAtom)
  const disableModel = useAtomValue(disableModelAtom)

  const makeValue = useAtomValue(makeAtom)
  const year = useAtomValue(yearAtom)
  const doors = useAtomValue(doorsAtom)
  const [options, setOptions] = useState([
    {
      label: 'Loading...',
      value: 'loading',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [valueState, setValueState] = useState(null)

  const { control, setValue, watch } = useFormContext()

  const createOptions = (vehicles) => {
    try {
      const uniqueModelNames = [...new Set(vehicles.map((vehicle) => vehicle.Model.name))]
      return uniqueModelNames.map((model) => {
        return {
          label: model,
          value: model,
        }
      })
    } catch (error) {
      console.log('Error creating options:', error)
    }
  }

  useEffect(() => {
    if (!makeValue) return
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

  const getSelectedModel = async (model) => {
    setLoadingWindow(true)
    const modelArray = vehiclesArray.filter((vehicle) => vehicle.Model.name === model)
    setSelectedModel(modelArray)

    const selectedVehicle = (await modelArray.find((vehicle) => vehicle.doors === doors)) ?? modelArray[0]
    const vehicleId = await selectedVehicle.id
    const vehicleWithWindow = await getVehicleWithWindow(vehicleId)
    setLoadingWindow(false)
    setDisableDoor(false)
    setDisableWindow(false)
    return await vehicleWithWindow
  }

  const handleChange = async (value, { action, removedValue }) => {
    switch (action) {
      case 'clear':
        setValue('model', '')
        setValueState(null)
        break
      default:
        setValue('model', value.label)
        setValueState(value)
        setVehicleWithWindow(await getSelectedModel(value.label))
        console.log('withwindow:', await getSelectedModel(value.label))
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
            isDisabled={disableModel}
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
              container: (base, state) => ({
                ...base,
                width: '100%',
                opacity: state.isDisabled ? '0.5' : '1',
              }),
              input: (base) => ({
                ...base,
                minHeight: '0px !important',
                height: '28px !important',
                padding: '0',
                paddingLeft: '4px',
                color: '#D2AC53',
              }),
              placeholder: (base, state) => ({
                ...base,
                padding: '0',
                paddingLeft: '4px',
                minHeight: '0',
                height: '28px',
                color: '#D2AC53',
                opacity: state.isDisabled ? '0.5' : '1',
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
                maxHeight: '160px',
                overflowY: 'hidden',
                paddingBottom: 0,
              }),
              menuList: (base) => ({
                ...base,
                padding: 0,
                maxHeight: '160px',
                overflowY: 'scroll',
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
