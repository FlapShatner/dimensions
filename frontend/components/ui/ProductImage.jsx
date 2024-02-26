import React, { useState } from 'react'
import { cn } from '../utils'
import { useAtomValue } from 'jotai'
import { productAtom } from '../lib/atoms'
import Spinner from '../common/Spinner'
import Modal from '../common/Modal'
import { useWindowSize } from 'usehooks-ts'

function ProductImage() {
  const product = useAtomValue(productAtom)
  const image = Object.keys(product).length == 0 ? null : `https:${product.featured_image}`
  const { width } = useWindowSize()
  let isLg = width > 1040
  let isMd = width > 768 && width < 1040
  let isSm = width < 768
  const [isZoomed, setIsZoomed] = useState(false)
  const handleModal = () => {
    if (isSm) {
      return
    }
    setIsZoomed(!isZoomed)
  }
  return (
    <div className={cn('max-h-[70vh]', !isSm && 'min-w-[70vh] ')}>
      <Modal
        minHeight='70vh'
        minWidth='70vw'
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        setIsOpen={handleModal}
        contents={<img className=' my-12' src={image} alt='' />}
      />

      {image ? (
        <img
          onClick={handleModal}
          className={cn('cursor-zoom-in  hover:scale-[102%] ease-in-out transition-all', isMd && 'w-[400px]', isSm && 'm-auto max-w-[90vw]')}
          src={image}
          alt=''
        />
      ) : (
        <div className='h-full w-full flex items-center justify-center'>
          <Spinner style={{ width: '48px', height: '48px' }} />
        </div>
      )}
    </div>
  )
}

export default ProductImage
