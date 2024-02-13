import { atom } from 'jotai'

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

export const disableModelAtom = atom(true)
export const disableWindowAtom = atom(true)
export const disableDoorAtom = atom(true)

export const loadingWindowAtom = atom(false)

export const selectedVehicleAtom = atom({})
export const selectedModelAtom = atom({})
export const vehicleWithWindowAtom = atom({})

export const modelStateAtom = atom({})
