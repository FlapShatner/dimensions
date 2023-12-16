import React, { useCallback, useState } from 'react'
import Modal from '../common/Modal'
import { useDropzone } from 'react-dropzone'
import { cn } from '../utils'
import Icons from '../common/Icons'

export default function Logo({ isLogo, isBusiness, setImageFile }) {
 const [preview, setPreview] = useState(null)
 const [isOpen, setIsOpen] = useState(false)

 const onDrop = useCallback(
  (acceptedFile) => {
   const file = acceptedFile[0]
   if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
     setPreview(reader.result)
     setImageFile(reader.result)
     // console.log(reader.result)
    }
    reader.readAsArrayBuffer(file)
   } else {
    console.log('File not accepted, must be an image')
   }
  },
  [setImageFile]
 )

 const { getRootProps, getInputProps } = useDropzone({ onDrop })
 return (
  <div>
   <div
    {...getRootProps()}
    className={cn('flex flex-col', !isLogo && 'opacity-30', !isBusiness && 'hidden')}>
    <label htmlFor='logoFile'>Upload Image</label>
    <div className='mt-2 border-2 w-36 border-border hover:border-accent cursor-pointer'>
     <span className={cn('flex gap-2 items-center justify-center text-accent', !isLogo && 'text-txt-primary')}>
      <Icons
       name='upload'
       size='12'
       color={!isLogo ? '#ffffff' : '#13FC00'}
      />
      Choose file
     </span>
     <input
      {...getInputProps()}
      disabled={!isLogo || isOpen}
      name='logoFile'
     />
    </div>
    <span className='text-xs mt-2 mb-4'>
     *Logo should be vector art or high resolution .PNG file with no background. Otherwise the logo will be recreated in a printable format and you will be
     charged an extra $85, and you will receive your design either vectorized, or as a high resolution .PNG file with no background.
    </span>
   </div>
   {preview && (
    <div className='flex flex-col justify-center'>
     <span className='text-center'>Click to enlarge</span>
     <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      preview={preview}
      closeStyle='text-txt-primary border-2 border-border hover:border-red-600 mb-8 flex items-center gap-2'
      content={
       <img
        className='h-auto max-w-full pointer-events-none '
        src={preview}
        alt='preview'
       />
      }>
      <img
       className='cursor-zoom-in m-auto w-[200px] mt-2'
       src={preview}
       alt='preview'
      />
     </Modal>
    </div>
   )}
  </div>
 )
}
