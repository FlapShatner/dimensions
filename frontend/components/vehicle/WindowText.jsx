import React from 'react'
import { windowText } from '../lib/windowText.js'

export default function WindowText() {
 return (
  <div className='flex flex-col gap-6 mt-4'>
   {windowText.map((item, index) => {
    return (
     <div key={index}>
      <h2 className='text-2xl text-accent font-sans '>{item.header}</h2>
      <p>{item.text}</p>
     </div>
    )
   })}
  </div>
 )
}
