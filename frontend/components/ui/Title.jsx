import React from 'react'
import { useAtomValue } from 'jotai'
import { productAtom } from '../lib/atoms'

function Title() {
  const product = useAtomValue(productAtom)
  return <h2 className='text-4xl'>{product.title}</h2>
}

export default Title
