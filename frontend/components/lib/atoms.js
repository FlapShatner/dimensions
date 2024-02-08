import {atom, useAtom } from 'jotai'

export const vehiclesAtom = atom([])
export const makeAtom   = atom({})
export const yearAtom   = atom(2023) 
export const disableModelAtom = atom(true)
export const selectedModelAtom = atom({})
export const doorsAtom = atom(2)
export const selectedVehicleAtom = atom({})