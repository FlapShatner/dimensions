import { useState, useEffect } from 'react'
import { DevTools } from 'jotai-devtools'
import { getCurrentProduct } from './ajax.js'

import ATC from './ui/Atc.jsx'
import Quantity from './ui/Quantity.jsx'
import Standard from './size/Standard.jsx'
import Custom from './size/Custom.jsx'
import ReactModal from 'react-modal'
import Personalize from './personalize/Personalize.jsx'
import Price from './ui/Price.jsx'
import Pricing from './ui/Pricing.jsx'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { productAtom, variantsAtom, submitErrorAtom, quantityAtom } from './lib/atoms.js'

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  // console.log('Home', home)
  const [imageFile, setImageFile] = useState(null)

  const [product, setProduct] = useAtom(productAtom)
  const submitError = useAtomValue(submitErrorAtom)
  const setVariants = useSetAtom(variantsAtom)
  const quantity = useAtom(quantityAtom)

  useEffect(() => {
    getCurrentProduct().then((data) => {
      setProduct(data)
      setVariants(data.variants)
    })
  }, [])

  return (
    <>
      {/* <DevTools /> */}
      <div className='window-form bg-bg-primary w-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between min-w-max'>
            <Price />
            <Pricing />
          </div>
          <h2 className='text-2xl text-txt-primary font-sans'>Size:</h2>
          <Standard />
          <Custom />
          <Personalize imageFile={imageFile} setImageFile={setImageFile} />
          <p className='text-accent text-sm text-center'>{submitError}</p>
        </div>
        <div className='checkout-btn dynamic-checkout-enabled mt-2 '>
          <Quantity />
          <ATC />
        </div>
      </div>
    </>
  )
}
