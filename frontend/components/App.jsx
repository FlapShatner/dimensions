import { useState, useEffect } from 'react'
import { DevTool } from '@hookform/devtools'
import { getCurrentProduct, addToCart } from './ajax.js'
import { uploadImage, getCurrentVariant } from './utils.js'
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

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  // console.log('Home', home)
  const [imageFile, setImageFile] = useState(null)
  const [isCustom, setIsCustom] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState([])

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

  const isStandard = getValues('standard')
  const enabled = isCustom || isStandard

  useEffect(() => {
    getCurrentProduct().then((data) => {
      setProduct(data)
      setVariants(data.variants)
    })
  }, [])

  const values = getValues()
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
      setSubmitError('Please enter your business name')
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

    let formData = {
      items: [
        {
          id: variantId,
          quantity: quantity,
          properties: {
            _standard: values.standard,
            _a: values.a,
            _b: values.b,
            _c: values.c,
            _customText: values.customText,
            customTextField: values.customText ? values.customTextField : null,
            _business: values.business,
            businessName: values.business ? values.businessName : null,
            notesField: values.notesField ? values.notesField : null,
            slogan: values.business ? values.slogan : null,
            city: values.business ? values.city : null,
            state: values.business ? values.state : null,
            phone: values.business ? values.phone : null,
            website: values.business ? values.website : null,
            logo: logo ? true : null,
            _image: logo ? image : null,
          },
        },
      ],
    }
    addToCart(formData).then((data) => {
      if (data) {
        window.location.href = '/cart'
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <div className='window-form bg-bg-primary w-full'>
        <div className='flex flex-col gap-2'>
          <Price quantity={quantity} values={values} product={product} />
          <h2 className='text-2xl text-txt-primary font-sans'>Size:</h2>
          <Standard setIsCustom={setIsCustom} />
          <Custom setIsCustom={setIsCustom} isCustom={isCustom} />
          <Personalize imageFile={imageFile} setImageFile={setImageFile} />
          <p className='text-accent text-sm text-center'>{submitError}</p>
        </div>
        <div className='checkout-btn dynamic-checkout-enabled mt-2 '>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <ATC enabled={enabled} onSubmit={onSubmit} />
        </div>
        <DevTool control={methods.control} />
      </div>
    </FormProvider>
  )
}
