import React from 'react'
import Icons from '../common/Icons'
import { cn, uploadImage } from '../utils'
import { useLocalStorage } from 'usehooks-ts'
import { addToCart } from '../ajax'
import { useValueState } from '../../hooks/useValueState'
import { useCurrentVariant } from '../../hooks/useCurrentVariant'
import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import { isCustomAtom, isStandardAtom, isTextAtom, customTextAtom, submitErrorAtom, productAtom, didAddVehicleAtom, quantityAtom } from '../lib/atoms'
import { businessNameAtom, isLogoAtom, imageFileAtom, imageUrlAtom } from '../lib/businessAtoms'

export default function ATC() {
  const standard = useAtomValue(isStandardAtom)
  const isCustom = useAtomValue(isCustomAtom)
  const isText = useAtomValue(isTextAtom)
  const customText = useAtomValue(customTextAtom)
  const isBusiness = useAtomValue(businessNameAtom)
  const businessName = useAtomValue(businessNameAtom)
  const imageFile = useAtomValue(imageFileAtom)
  const setIsLogo = useAtomValue(isLogoAtom)

  const [imageUrl, setImageUrl] = useAtom(imageUrlAtom)
  const setSubmitError = useSetAtom(submitErrorAtom)
  const product = useAtomValue(productAtom)
  const quantity = useAtomValue(quantityAtom)
  const didAddVehicle = useAtomValue(didAddVehicleAtom)

  const [windowProduct, setWindowProduct] = useLocalStorage('windowProduct', {})

  const isAi = product.id == 7180539068499

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
    let result = null
    if (imageFile) {
      console.log('imageFile:', imageFile)
      result = await uploadImage(imageFile)
      setIsLogo(true)
    }
    if (didAddVehicle) {
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
            _imageUrl: result ? result : 'no image',
            aiImage: isAi ? windowProduct.url : 'no ai image',
          },
        },
      ],
    }
    addToCart(formData).then((data) => {
      console.log('data:', data)
      console.log('imageUrl:', imageUrl)
      if (data) {
        window.location.href = '/cart'
        setWindowProduct({})
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
