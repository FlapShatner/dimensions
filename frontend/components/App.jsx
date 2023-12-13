import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { defaultValues } from './utils'
import { yupSchema } from './yupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from './form/Form'
import Standard from './buttons/Standard'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export const minHeight = {
  minHeight: '0',
}

export default function App({ home }) {
  console.log('Home', home)
  const [imageFile, setImageFile] = useState(null)

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
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
  const isStandard = watch('standard')

  return (
    <div className='window-form bg-bg-secondary w-full'>
      {/* <Form /> */}
      <Standard isStandard={isStandard} register={register} />
    </div>
  )
}
