import { useState } from 'react'
import { DevTool } from '@hookform/devtools'

import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { defaultValues } from './lib/data.js'
import { yupSchema } from './lib/yupSchema.js'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from './form/Form'
import ATC from './ui/Atc.jsx'
import Quantity from './ui/Quantity.jsx'
import Standard from './size/Standard.jsx'
import Custom from './size/Custom.jsx'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export const minHeight = {
 minHeight: '0',
}

export default function App({ home }) {
 console.log('Home', home)
 const [imageFile, setImageFile] = useState(null)
 const [isCustom, setIsCustom] = useState(false)
 const methods = useForm({
  resolver: yupResolver(yupSchema),
  defaultValues: defaultValues,
 })

 const onSubmit = async (data) => {
  if (imageFile) {
   const response = await uploadImage(imageFile)
   console.log(response)
  }
  if (data.standard) {
   console.log('User chose standard size')
   return
  }
  const response = await saveWindow(data)
  console.log(response)
 }

 // console.log(errors)

 return (
  <FormProvider {...methods}>
   <div className='window-form bg-bg-primary w-full'>
    {/* <Form /> */}
    <div className='flex flex-col gap-2'>
     <Standard setIsCustom={setIsCustom} />
     <Custom
      setIsCustom={setIsCustom}
      isCustom={isCustom}
     />
    </div>
    <div className='checkout-btn dynamic-checkout-enabled mt-2 '>
     <Quantity />
     <ATC />
    </div>
    <DevTool control={methods.control} />
   </div>
  </FormProvider>
 )
}
