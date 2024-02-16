import { useSetAtom, useAtomValue } from 'jotai'
import { isStandardAtom, windowSizeAtom, isTextAtom, customTextAtom, notesAtom, didAddVehicleAtom, newVehicleIdAtom } from '../components/lib/atoms.js'
import {
  businessNameAtom,
  sloganAtom,
  cityAtom,
  stateAtom,
  phoneAtom,
  websiteAtom,
  isLogoAtom,
  isDesignAtom,
  isVectorAtom,
  isNonVectorAtom,
  logoNoteAtom,
  imageUrlAtom,
  isBusinessAtom,
} from '../components/lib/businessAtoms.js'

export function useValueState() {
  const standard = useAtomValue(isStandardAtom)
  const { a, b, c } = useAtomValue(windowSizeAtom)
  const isText = useAtomValue(isTextAtom)
  const customText = useAtomValue(customTextAtom)
  const notesField = useAtomValue(notesAtom)
  const isBusiness = useAtomValue(isBusinessAtom)
  const businessName = useAtomValue(businessNameAtom)
  const slogan = useAtomValue(sloganAtom)
  const city = useAtomValue(cityAtom)
  const state = useAtomValue(stateAtom)
  const phone = useAtomValue(phoneAtom)
  const website = useAtomValue(websiteAtom)
  const isLogo = useAtomValue(isLogoAtom)
  const designLogo = useAtomValue(isDesignAtom)
  const vector = useAtomValue(isVectorAtom)
  const nonVector = useAtomValue(isNonVectorAtom)
  const logoNote = useAtomValue(logoNoteAtom)
  const imageUrl = useAtomValue(imageUrlAtom)
  const didAddVehicle = useAtomValue(didAddVehicleAtom)
  const newVehicleId = useAtomValue(newVehicleIdAtom)

  //   const setValues = useSetAtom(valuesAtom)

  const values = {
    _standard: standard,
    _a: a,
    _b: b,
    _c: c,
    _customText: isText ? true : false,
    customTextField: isText ? customText : null,
    notesField: isText ? notesField : null,
    _business: isBusiness ? true : false,
    businessName: isBusiness ? businessName : null,
    slogan: isBusiness ? slogan : null,
    city: isBusiness ? city : null,
    state: isBusiness ? state : null,
    phone: isBusiness ? phone : null,
    website: isBusiness ? website : null,
    logo: isLogo ? true : null,
    designLogo: designLogo ? true : null,
    logoNote: designLogo ? logoNote : null,
    vector: vector ? true : null,
    nonVector: nonVector ? true : null,
    image: isLogo ? imageUrl : null,
    _addedVehicle: didAddVehicle ? true : false,
    _addedVehicleId: didAddVehicle ? newVehicleId : null,
  }
  return values
}
