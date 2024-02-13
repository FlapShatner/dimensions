import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { minHeight } from '../App'
import Checkbox from '../common/Checkbox'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { isTextAtom, isBusinessAtom, customTextAtom, notesAtom } from '../lib/atoms'

export default function Text() {
  const [isCustomText, setIsCustomText] = useAtom(isTextAtom)
  const [isBusiness, setIsBusiness] = useAtom(isBusinessAtom)
  const [customText, setCustomText] = useAtom(customTextAtom)
  const [notes, setNotes] = useAtom(notesAtom)

  const {
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext()

  const handleClick = (e) => {
    e.stopPropagation()
    setIsCustomText(!isCustomText)
    setIsBusiness(false)
  }

  return (
    <div className='flex flex-col border-b p-4  border border-border my-2'>
      <div className='flex gap-2 items-center mb-2'>
        <Checkbox onClick={handleClick} isChecked={isCustomText} />
        <label htmlFor='customText'>Personalize with Name / Text</label>
      </div>
      <div className={cn('flex flex-col', !isCustomText && 'opacity-30')}>
        <label htmlFor='customTextField'>Your custom text:</label>
        <input
          className='px-2 py-1  placeholder:opacity-60'
          style={minHeight}
          onChange={(e) => setCustomText(e.target.value)}
          value={customText}
          type='text'
          name='customTextField'
          id='customTextField'
          disabled={!isCustomText}
          placeholder='John Doe'
        />
        <div className='flex flex-col mt-4'>
          <label htmlFor='notesField'>Special instructions:</label>
          <input
            className='px-2 py-1 placeholder:opacity-60'
            style={minHeight}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            type='text'
            name='notesField'
            id='notesField'
            disabled={!isCustomText}
            placeholder='Text color, style, placement, etc.'
          />
        </div>
        {/* TODO: Error Messages */}
      </div>
    </div>
  )
}
