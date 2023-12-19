import React from 'react'

import Text from './Text'
import Business from './Business'

export default function Personalize({ imageFile, setImageFile }) {
  return (
    <>
      <div className='flex flex-col py-4 '>
        <h2 className='text-2xl text-txt-primary font-sans'> Personalize Your Graphics:</h2>
        <Text />
        <Business imageFile={imageFile} setImageFile={setImageFile} />
      </div>
    </>
  )
}
