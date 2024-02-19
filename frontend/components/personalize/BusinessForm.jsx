import React, { useState } from 'react'
import { DevTools } from 'jotai-devtools'
import Logo from './Logo'
import Checkbox from '../common/Checkbox'
import { states } from '../lib/states'
import { cn, formatPhoneNumber } from '../utils'
import { minHeight } from '../App'
import { useAtom, useAtomValue } from 'jotai'
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
  logoNoteAtom,
  isNameErrorAtom,
  isLogoErrorAtom,
  logoErrorAtom,
  imageFileAtom,
} from '../lib/businessAtoms'

export default function BusinessForm({ setIsOpen }) {
  const [isBusiness, setIsBusiness] = useAtom(isBusinessAtom)
  const [businessName, setBusinessName] = useAtom(businessNameAtom)
  const [slogan, setSlogan] = useAtom(sloganAtom)
  const [city, setCity] = useAtom(cityAtom)
  const [state, setState] = useAtom(stateAtom)
  const [phone, setPhone] = useAtom(phoneAtom)
  const [website, setWebsite] = useAtom(websiteAtom)
  const [email, setEmail] = useAtom(emailAtom)
  const [isLogo, setIsLogo] = useAtom(isLogoAtom)
  const [isDesignLogo, setIsDesignLogo] = useAtom(isDesignAtom)
  const [isVector, setIsVector] = useAtom(isVectorAtom)
  const [isNonVector, setIsNonVector] = useAtom(isNonVectorAtom)
  const [logoNote, setLogoNote] = useAtom(logoNoteAtom)
  const [isNameError, setisNameError] = useAtom(isNameErrorAtom)
  const [isLogoError, setisLogoError] = useAtom(isLogoErrorAtom)
  const [logoError, setLogoError] = useAtom(logoErrorAtom)
  const imageFile = useAtomValue(imageFileAtom)

  const handleOptionClick = (option) => {
    setisLogoError(false)
    switch (option) {
      case 'logo':
        setIsLogo(!isLogo)
        setIsDesignLogo(false)
        setIsVector(false)
        setIsNonVector(false)
        break
      case 'designLogo':
        setIsLogo(true)
        setIsDesignLogo(!isDesignLogo)
        setIsVector(false)
        setIsNonVector(false)
        break
      case 'vector':
        setIsLogo(true)
        setIsDesignLogo(false)
        setIsVector(!isVector)
        setIsNonVector(false)
        break
      case 'nonVector':
        setIsLogo(true)
        setIsDesignLogo(false)
        setIsVector(false)
        setIsNonVector(!isNonVector)
        break
      default:
        break
    }
  }
  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setPhone(formattedPhone)
  }

  const handleNameChange = (e) => {
    setBusinessName(e.target.value)
    setisNameError(false)
  }

  const onSubmit = () => {
    if (!businessName) {
      setisNameError(true)
      return
    }
    if (isLogo && !isDesignLogo && !isVector && !isNonVector) {
      setisLogoError(true)
      setLogoError('Please make a selection')
      return
    }
    if (isDesignLogo && !logoNote) {
      setisLogoError(true)
      setLogoError('Please describe your custom logo')
      return
    }
    if (isNonVector && !imageFile) {
      setisLogoError(true)
      setLogoError('Please upload a file')
      return
    }
    if (isVector && !imageFile) {
      setisLogoError(true)
      setLogoError('Please upload a file')
      return
    }
    setIsBusiness(true)
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <h2 className='text-txt-primary text-3xl'>Business Info:</h2>
        <div className='flex flex-col sm:flex-row justify-between gap-4'>
          <div className={cn('flex flex-col gap-4 py-4 ')}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col '>
                {isNameError && <span className='text-red-600'>Please enter your business name</span>}
                <label htmlFor='businessName'>Business Name</label>
                <input
                  style={minHeight}
                  value={businessName}
                  type='text'
                  name='businessName'
                  id='businessName'
                  disabled={!isBusiness}
                  onChange={handleNameChange}
                />
              </div>
              <div className='flex flex-col '>
                <label htmlFor='slogan'>
                  Slogan
                  <span className='text-xs ml-3'>Example: "Your 1 stop shop for custom graphics"</span>
                </label>
                <input
                  style={minHeight}
                  disabled={!isBusiness}
                  type='text'
                  name='slogan'
                  id='slogan'
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='city'>City</label>
                <input style={minHeight} disabled={!isBusiness} type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='state'>State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!isBusiness}
                  className='px-2 py-[1px] bg-bg-secondary border border-border '
                  name='state'
                  id='state'>
                  {states.map((state) => (
                    <option className='p-1' key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='phone'>Phone</label>
                <input style={minHeight} value={phone} type='tel' name='phone' id='phone' onChange={handlePhoneChange} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='website'>Website</label>
                <input style={minHeight} value={website} type='url' name='website' id='website' onChange={(e) => setWebsite(e.target.value)} />
              </div>
            </div>

            <div onClick={onSubmit} className='cursor-pointer flex border border-border p-2 text-accent justify-center hover:border-accent'>
              Done
            </div>
          </div>
          <div className='w-full sm:w-1/2'>
            <div className='flex flex-col'>
              <span className='text-txt-primary text-xl'>Logo:</span>
              {isLogoError && <span className='text-red-600'>{logoError}</span>}
            </div>
            <div className={cn('flex gap-2 items-center mt-2 mb-1 text-sm')}>
              <Checkbox isChecked={!isLogo} onClick={() => handleOptionClick('logo')} />
              <label className='mt-0' htmlFor='logo'>
                No logo
              </label>
            </div>
            <div className='mb-2'>
              <div className={cn('flex gap-2 items-center text-sm ')}>
                <Checkbox isChecked={isDesignLogo} onClick={() => handleOptionClick('designLogo')} />
                <label className='mt-0' htmlFor='designLogo'>
                  I need a custom logo designed
                </label>
              </div>
              {isDesignLogo && (
                <div className='mx-6'>
                  <label className='text-xs' htmlFor='logoNote'>
                    Description / Notes
                  </label>
                  <textarea onChange={(e) => setLogoNote(e.target.value)} value={logoNote} name='logoNote' rows='2' id='logoNote' />
                </div>
              )}
            </div>

            <div className={cn('flex gap-2 items-center  my-1 text-sm ')}>
              <Checkbox isChecked={isVector} onClick={() => handleOptionClick('vector')} />
              <label className='mt-0' htmlFor='vector'>
                I have a vector or .PNG image file*
              </label>
            </div>
            <div className={cn('flex gap-2 items-center mb-1 text-sm')}>
              <Checkbox isChecked={isNonVector} onClick={() => handleOptionClick('nonVector')} />
              <label className='mt-0' htmlFor='nonVector'>
                I have a non-vector image file*
              </label>
            </div>

            <Logo />
          </div>
        </div>
      </div>
      {/* <DevTools /> */}
    </>
  )
}
