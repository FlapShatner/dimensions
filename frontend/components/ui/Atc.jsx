import React from 'react'
import Icons from '../common/Icons'
import { cn, uploadImage } from '../utils'
import { addToCart } from '../ajax'
import { useValueState } from '../../hooks/useValueState'
import { useCurrentVariant } from '../../hooks/useCurrentVariant'
import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import {
  enableAddToCartAtom,
  isCustomAtom,
  isStandardAtom,
  windowSizeAtom,
  isTextAtom,
  customTextAtom,
  notesAtom,
  submitErrorAtom,
  productAtom,
  valuesAtom,
  quantityAtom,
} from '../lib/atoms'
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
  imageFileAtom,
  imageUrlAtom,
} from '../lib/businessAtoms'

export default function ATC() {
  const standard = useAtomValue(isStandardAtom)
  const isCustom = useAtomValue(isCustomAtom)
  const { a, b, c } = useAtomValue(windowSizeAtom)
  const isText = useAtomValue(isTextAtom)
  const customText = useAtomValue(customTextAtom)
  const notesField = useAtomValue(notesAtom)
  const isBusiness = useAtomValue(businessNameAtom)
  const businessName = useAtomValue(businessNameAtom)
  const slogan = useAtomValue(sloganAtom)
  const city = useAtomValue(cityAtom)
  const state = useAtomValue(stateAtom)
  const phone = useAtomValue(phoneAtom)
  const website = useAtomValue(websiteAtom)
  const [logo, setIsLogo] = useAtom(isLogoAtom)
  const designLogo = useAtomValue(isDesignAtom)
  const vector = useAtomValue(isVectorAtom)
  const nonVector = useAtomValue(isNonVectorAtom)
  const logoNote = useAtomValue(logoNoteAtom)
  const imageFile = useAtomValue(imageFileAtom)
  const [imageUrl, setImageUrl] = useAtom(imageUrlAtom)
  const setSubmitError = useSetAtom(submitErrorAtom)
  const product = useAtomValue(productAtom)
  const quantity = useAtomValue(quantityAtom)

  const filtered = (obj) => {
    const filteredEntries = Object.entries(obj).filter(([key, value]) => value)
    return Object.fromEntries(filteredEntries)
  }

  const values = useValueState()
  const variant = useCurrentVariant()

  const onSubmit = async () => {
    if (isText && !customText) {
      setSubmitError('Please enter your custom text')
      return
    }
    if (isBusiness && !businessName) {
      setSubmitError('Please enter your business information')
      return
    }

    if (imageFile) {
      const response = await uploadImage(imageFile)
      setIsLogo(true)
      setImageUrl(await response)
    }

    const variantId = await variant.id
    const properties = filtered(values)

    let formData = {
      items: [
        {
          id: variantId,
          quantity: quantity,
          properties: {
            ...properties,
          },
        },
      ],
    }
    console.log('formData', formData)
    // console.log('values', values)
    addToCart(formData).then((data) => {
      if (data) {
        window.location.href = '/cart'
      }
    })
  }

  const enabled = isCustom || standard
  return (
    <div className='flex flex-col'>
      {!enabled && <span className='text-accent text-sm text-center'>Please choose a size</span>}
      <button
        onClick={onSubmit}
        className={cn('button text-accent bg-bg-primary gap-3 cursor-pointer', !enabled && ' pointer-events-none  border-icon opacity-30')}>
        Add to cart
        <div className='w-3'>
          <Icons name='right' size='20' color='white' />
        </div>
      </button>
    </div>
  )
}
