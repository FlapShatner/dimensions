import React, { useState } from 'react'
import { cn } from '../utils'
import Checkbox from '../common/Checkbox'
import Modal from '../common/Modal'
import BusinessForm from './BusinessForm'
import { useFormContext } from 'react-hook-form'

export default function Business({ imageFile, setImageFile }) {
  const [isOpen, setIsOpen] = useState(false)
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
  const isDesign = watch('designLogo')

  const handleClick = (e) => {
    e.stopPropagation()
    setValue('business', !isBusiness)
    setValue('customText', false)
  }

  const onClose = () => {
    setValue('business', false)
    setValue('vector', false)
    setValue('nonVector', false)
    setValue('designLogo', false)
  }

  // console.log('imageFile', imageFile)

  return (
    <div className='flex items-start gap-2  border-border border  p-4 '>
      <div className='mt-1'>
        <Checkbox onClick={handleClick} isChecked={isBusiness} />
      </div>
      <Modal
        maxWidth='700px'
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={setIsOpen}
        closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
        contents={<BusinessForm setIsOpen={setIsOpen} imageFile={imageFile} setImageFile={setImageFile} />}>
        <div className={cn('flex flex-col gap-2 cursor-pointer', isBusiness && name && ' pb-1')}>
          <span>Personalize With Business Info</span>
          {isBusiness && name && (
            <div>
              <div className='flex gap-8'>
                <div className='flex flex-col text-accent'>
                  {name && <span className='text-xs'>{name}</span>}
                  {slogan && <span className='text-xs'>"{slogan}"</span>}
                  <div>
                    {city && <span className='text-xs'>{city}</span>} {state && <span className='text-xs'>, {state}</span>}
                  </div>
                  {phone && <span className='text-xs'>{phone}</span>}
                  {website && <span className='text-xs'>{website}</span>}
                  {email && <span className='text-xs'>{email}</span>}
                </div>
                {isDesign && <span className='text-xs text-accent'> We'll design a logo for you</span>}
                {isLogo && !isDesign && (
                  <div className=' w-1/3 flex flex-col gap-2'>
                    <img src={imageFile} alt='logo' />
                  </div>
                )}
              </div>
              <span className='text-xs underline'>Click to edit info</span>
            </div>
          )}
          {!name && <div className={cn('underline text-accent', !isBusiness && 'opacity-30')}>Click here to enter your business info</div>}
        </div>
      </Modal>
    </div>
  )
}
