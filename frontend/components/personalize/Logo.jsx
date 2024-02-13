import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '../utils'
import Icons from '../common/Icons'
import { useAtomValue, useSetAtom } from 'jotai'

import { isVectorAtom, isNonVectorAtom, isLogoAtom, imageFileAtom } from '../lib/businessAtoms'

export default function Logo() {
  const [preview, setPreview] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const isLogo = useAtomValue(isLogoAtom)
  const isVector = useAtomValue(isVectorAtom)
  const isNonVector = useAtomValue(isNonVectorAtom)
  const setImageFile = useSetAtom(imageFileAtom)

  const enabled = isVector || isNonVector

  const onDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setPreview(reader.result)
          setImageFile(reader.result)
        }
      } else {
        console.log('File not accepted, must be an image')
      }
    },
    [setImageFile]
  )

  // console.log('preview', preview)

  const handleReset = () => {
    setPreview(null)
    setImageFile(null)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <div>
      <div {...getRootProps()} className={cn('flex flex-col', !enabled && 'opacity-30')}>
        <label htmlFor='logoFile'>Upload Image</label>
        <div className={cn('mt-2 border-2 w-36 border-border ', enabled && 'hover:border-accent cursor-pointer')}>
          <span className={cn('flex gap-2 items-center justify-center text-accent', !enabled && 'text-txt-primary')}>
            <Icons name='upload' size='12' color={!enabled ? '#ffffff' : '#13FC00'} />
            Choose file
          </span>
          <input {...getInputProps()} disabled={!enabled || isOpen} name='logoFile' />
        </div>
        <span className='text-xs mt-2 mb-4'>
          *Logo should be vector art or high resolution .PNG file with no background. Otherwise the logo will be recreated in a printable format and you will be
          charged an extra $85, and you will receive your design either vectorized, or as a high resolution .PNG file with no background.
        </span>
      </div>
      {preview && enabled && (
        <div className='flex flex-col justify-center items-center'>
          <img className='m-auto w-[200px] mt-2' src={preview} alt='preview' />
        </div>
      )}
      <div className='w-full flex justify-end'>
        {preview && enabled && (
          <div onClick={handleReset} className='cursor-pointer text-sm border border-border px-1 ml-auto mt-2'>
            Reset Image
          </div>
        )}
      </div>
    </div>
  )
}
