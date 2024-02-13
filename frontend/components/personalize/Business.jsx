import React, { useState } from 'react'
import { cn } from '../utils'
import Checkbox from '../common/Checkbox'
import Modal from '../common/Modal'
import BusinessForm from './BusinessForm'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isCustomAtom, isTextAtom } from '../lib/atoms'
import {
  isBusinessAtom,
  businessNameAtom,
  sloganAtom,
  cityAtom,
  stateAtom,
  phoneAtom,
  websiteAtom,
  emailAtom,
  isLogoAtom,
  isDesignAtom,
  isVectorAtom,
  isNonVectorAtom,
  imageFileAtom,
} from '../lib/businessAtoms'

export default function Business() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBusiness, setIsBusiness] = useAtom(isBusinessAtom)
  const setIsText = useSetAtom(isTextAtom)
  const businessName = useAtomValue(businessNameAtom)
  const slogan = useAtomValue(sloganAtom)
  const city = useAtomValue(cityAtom)
  const state = useAtomValue(stateAtom)
  const phone = useAtomValue(phoneAtom)
  const website = useAtomValue(websiteAtom)
  const email = useAtomValue(emailAtom)
  const isLogo = useAtomValue(isLogoAtom)
  const [isDesign, setIsDesign] = useAtom(isDesignAtom)
  const setIsVector = useSetAtom(isVectorAtom)
  const setIsNonVector = useSetAtom(isNonVectorAtom)
  const imageFile = useAtomValue(imageFileAtom)

  const handleClick = (e) => {
    setIsBusiness(true)
    setIsText(false)
  }

  const handleCheck = (e) => {
    setIsBusiness(!isBusiness)
    setIsText(false)
  }

  const onClose = () => {
    setIsBusiness(false)
    setIsVector(false)
    setIsNonVector(false)
    setIsDesign(false)
  }

  return (
    <div className='flex items-start gap-2  border-border border  p-4 '>
      <div className='mt-1'>
        <Checkbox onClick={handleCheck} isChecked={isBusiness} />
      </div>
      <Modal
        maxWidth='700px'
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={setIsOpen}
        closeStyle='text-txt-primary border-2 border-border hover:border-red-600 flex w-full justify-end'
        contents={<BusinessForm setIsOpen={setIsOpen} />}>
        <div onClick={handleClick} className={cn('flex flex-col gap-2 cursor-pointer', isBusiness && businessName && ' pb-1')}>
          <span>Personalize With Business Info</span>
          {isBusiness && businessName && (
            <div>
              <div className='flex gap-8'>
                <div className='flex flex-col text-accent'>
                  {businessName && <span className='text-xs'>{businessName}</span>}
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
          {!businessName && <div className={cn('underline text-accent', !isBusiness && 'opacity-30')}>Click here to enter your business info</div>}
        </div>
      </Modal>
    </div>
  )
}
