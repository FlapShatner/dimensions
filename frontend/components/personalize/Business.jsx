import React, { useState } from 'react'
import { cn } from '../utils'
import Checkbox from '../common/Checkbox'
import Modal from '../common/Modal'
import BusinessForm from './BusinessForm'
import { useFormContext } from 'react-hook-form'

export default function Business({ setImageFile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState(null)
  const { watch, setValue } = useFormContext()
  const isBusiness = watch('business')
  const name = watch('businessName')
  const slogan = watch('slogan')
  const city = watch('city')
  const state = watch('state')
  const phone = watch('phone')
  const website = watch('website')
  const email = watch('email')
  const isLogo = watch('logo')
  const handleClick = (e) => {
    e.stopPropagation()
    if (!name) {
      setIsOpen(true)
    } else {
      setValue('business', !isBusiness)
    }
  }
  const captureImageFile = (imageFile) => {
    setImageFile(imageFile)
    setImage(imageFile)
  }
  return (
    <Modal
      maxWidth='700px'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
      contents={<BusinessForm currentImage={image} setImageFile={captureImageFile} />}>
      <div className={cn('flex flex-col p-4 gap-2 border-border border cursor-pointer', isBusiness && ' pb-1')}>
        <div className='flex items-center gap-2'>
          <Checkbox onClick={handleClick} isChecked={isBusiness} />
          <span className='underline'>Personalize With Business Info</span>
        </div>
        {isBusiness && (
          <div>
            <div className='flex gap-8'>
              <div className='flex flex-col text-accent'>
                {name && <span>{name}</span>}
                {slogan && <span>"{slogan}"</span>}
                <div className=''>
                  {city && <span>{city}</span>}, {state && <span>{state}</span>}
                </div>
                {phone && <span>{phone}</span>}
                {website && <span>{website}</span>}
                {email && <span>{email}</span>}
              </div>
              {isLogo && (
                <div className=' w-1/3 flex flex-col gap-2'>
                  <img src={image} alt='logo' />
                </div>
              )}
            </div>
            <span className='text-xs underline'>Click to edit info</span>
          </div>
        )}
      </div>
    </Modal>
  )
}
