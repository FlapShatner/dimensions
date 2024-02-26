import { useState, useEffect } from 'react'
import { DevTools } from 'jotai-devtools'
import { getCurrentProduct } from './ajax.js'
import { cn } from './utils.js'

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
import Title from './ui/Title.jsx'
import ProductImage from './ui/ProductImage.jsx'
import { useWindowSize } from 'usehooks-ts'

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  // console.log('Home', home)
  const { width } = useWindowSize()
  let isLg = width > 1040
  let isMd = width > 768 && width < 1040
  let isSm = width < 768
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

  const productHtml = product.description

  return (
    <>
      <DevTools />
      <div className={cn('flex gap-4 max-w-[1000px] m-auto', isSm && 'flex-col')}>
        <div className={cn('flex flex-col gap-6', isMd && 'max-w-[400px]', isLg && 'max-w-[540px]')}>
          <ProductImage />
          {!isSm && !Object.keys(product).length == 0 && <div dangerouslySetInnerHTML={{ __html: productHtml }}></div>}
        </div>
        <div className='window-form bg-black w-full '>
          <div className='flex flex-col gap-2'>
            <Title />
            <div className='flex justify-between '>
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
          {isSm && !Object.keys(product).length == 0 && <div dangerouslySetInnerHTML={{ __html: productHtml }}></div>}
        </div>
      </div>
    </>
  )
}
