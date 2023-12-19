import React from 'react'
import { formatPrice, getCurrentVariant } from '../utils'

export default function Price({ quantity, product, values }) {
  if (!product) return null
  const price = getCurrentVariant(product, values).price
  const formattedPrice = formatPrice(price, quantity)
  return <div className='font-semibold text-[28px]'>{formattedPrice}</div>
}
