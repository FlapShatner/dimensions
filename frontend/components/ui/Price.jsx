import React from 'react'
import { useCurrentVariant } from '../../hooks/useCurrentVariant.jsx'
import { useAtomValue } from 'jotai'
import { productAtom, quantityAtom } from '../lib/atoms.js'
import { formatPrice } from '../utils'

export default function Price() {
  const quantity = useAtomValue(quantityAtom)
  const product = useAtomValue(productAtom)
  const variant = useCurrentVariant()
  const productExists = product && Object.keys(product).length > 0
  if (!productExists) return null
  const price = variant.price
  const formattedPrice = formatPrice(price, quantity)
  return <div className='font-semibold text-[28px]'>{formattedPrice}</div>
}
