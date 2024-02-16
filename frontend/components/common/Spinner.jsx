import React from 'react'

export default function Spinner({ style = {} }) {
  return <div style={style} className='border-accent h-6 w-6 animate-spin rounded-full border-2 border-t-bg-secondary' />
}
