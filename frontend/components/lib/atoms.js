import { atom } from 'jotai'

export const productAtom = atom({})
export const variantsAtom = atom({})
export const quantityAtom = atom(1)
export const chosenWindowSizeAtom = atom({})

export const vehiclesAtom = atom([])
export const makeAtom = atom({})
export const yearAtom = atom(2022)
export const doorsAtom = atom(2)
export const windowSizeAtom = atom({
 a: 0,
 b: 0,
 c: 0,
})

export const valuesAtom = atom({})

export const disableModelAtom = atom(true)
export const disableWindowAtom = atom(true)
export const disableDoorAtom = atom(true)

export const loadingWindowAtom = atom(false)

export const selectedVehicleAtom = atom({})
export const selectedModelAtom = atom({})
export const vehicleWithWindowAtom = atom({})

export const modelStateAtom = atom({})

export const isStandardAtom = atom(false)
export const isCustomAtom = atom(false)
export const isTextAtom = atom(false)

export const customTextAtom = atom('')
export const notesAtom = atom('')

export const enableAddToCartAtom = atom(false)

export const submitErrorAtom = atom(null)

export const isAddVehicleAtom = atom(false)
export const addedModelAtom = atom('')
export const addedMakeAtom = atom('')
export const addedYearAtom = atom('2024')
export const addedDoorsAtom = atom('2')
export const addedWindowAtom = atom({
 a: 0,
 b: 0,
 c: 0,
})
export const addedVehicleAtom = atom('')

export const didAddVehicleAtom = atom(false)
export const newVehicleIdAtom = atom('')
export const isVehicleOpenAtom = atom(false)