import { useState, useEffect } from 'react'
import { DevTools } from 'jotai-devtools'
import { getCurrentProduct, addToCart } from './ajax.js'
import { uploadImage, getCurrentVariant, makePropertiesObject } from './utils.js'
import { useForm, FormProvider } from 'react-hook-form'
import { defaultValues } from './lib/data.js'
import { yupSchema } from './lib/yupSchema.js'
import { yupResolver } from '@hookform/resolvers/yup'
import ATC from './ui/Atc.jsx'
import Quantity from './ui/Quantity.jsx'
import Standard from './size/Standard.jsx'
import Custom from './size/Custom.jsx'
import ReactModal from 'react-modal'
import Personalize from './personalize/Personalize.jsx'
import Price from './ui/Price.jsx'
import Pricing from './ui/Pricing.jsx'
import { useAtom } from 'jotai'
import { isStandardAtom, isCustomAtom, enableAddToCartAtom } from './lib/atoms.js'

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  // console.log('Home', home)
  const [imageFile, setImageFile] = useState(null)

  const [submitError, setSubmitError] = useState(null)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState([])

  const [isStandard, setIsStandard] = useAtom(isStandardAtom)
  const [isCustom, setIsCustom] = useAtom(isCustomAtom)
  const [enabled, setEnabled] = useAtom(enableAddToCartAtom)

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: defaultValues,
  })
  const {
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods

  useEffect(() => {
    getCurrentProduct().then((data) => {
      setProduct(data)
      setVariants(data.variants)
    })
  }, [])

  const values = watch()
  const customText = watch('customText')
  const customTextField = watch('customTextField', '')
  const business = watch('business')
  const businessName = watch('businessName', '')

  const onSubmit = async () => {
    if (customText && !customTextField) {
      setSubmitError('Please enter your custom text')
      return
    }
    if (business && !businessName) {
      setSubmitError('Please enter your business information')
      return
    }
    let logo = false
    let image = null
    if (imageFile) {
      const response = await uploadImage(imageFile)
      logo = true
      image = response
    }
    const variantId = getCurrentVariant(product, values).id
    const properties = makePropertiesObject(values, logo, image)

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

  return (
    <FormProvider {...methods}>
      <DevTools />
      <div className='window-form bg-bg-primary w-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between min-w-max'>
            <Price quantity={quantity} values={values} product={product} />
            <Pricing />
          </div>
          <h2 className='text-2xl text-txt-primary font-sans'>Size:</h2>
          <Standard />
          <Custom />
          <Personalize imageFile={imageFile} setImageFile={setImageFile} />
          <p className='text-accent text-sm text-center'>{submitError}</p>
        </div>
        <div className='checkout-btn dynamic-checkout-enabled mt-2 '>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <ATC enabled={enabled} onSubmit={onSubmit} />
        </div>
        {/* <DevTool control={methods.control} /> */}
      </div>
    </FormProvider>
  )
}
