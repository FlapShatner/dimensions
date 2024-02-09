import {atom, useAtom } from 'jotai'

export const vehiclesAtom = atom([])
export const makeAtom   = atom({})
export const yearAtom   = atom(2023) 
export const doorsAtom = atom(2)

export const disableModelAtom = atom(true)
export const disableWindowAtom = atom(true)
export const disableDoorAtom = atom(true)

export const loadingWindowAtom = atom(false)


export const selectedVehicleAtom = atom({})
export const selectedModelAtom = atom({})
export const vehicleWithWindowAtom = atom({})