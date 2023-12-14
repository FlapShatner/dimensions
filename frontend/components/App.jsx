import { useState } from 'react'
import { DevTool } from '@hookform/devtools'

import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { defaultValues } from './utils'
import { yupSchema } from './yupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from './form/Form'
import ATC from './buttons/ATC'
import Quantity from './buttons/Quantity'
import Standard from './buttons/Standard'
import Custom from './buttons/Custom'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  console.log('Home', home)
  const [imageFile, setImageFile] = useState(null)
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
        <Standard />
        <Custom />
        <div className='checkout-btn dynamic-checkout-enabled '>
          <Quantity />
          <ATC />
        </div>
        <DevTool control={methods.control} />
      </div>
    </FormProvider>
  )
}
