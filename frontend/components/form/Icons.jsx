import React from 'react'

export default function Icons({ name, size, color }) {
  return (
    <>
      {name === 'upload' && (
        <svg fill={color} stroke={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={size} height={size}>
          <path d='M 8 0 L 3 5 L 3 6 L 6 6 L 6 11 L 10 11 L 10 6 L 13 6 L 13 5 L 8 0 z M 2 13 L 2 15 L 14 15 L 14 13 L 2 13 z' />
        </svg>
      )}
      {name === 'close' && (
        <svg xmlns='http://www.w3.org/2000/svg' fill={color} stroke={color} viewBox='0 0 24 24' width={size} height={size}>
          <path d='M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z' />
        </svg>
      )}
    </>
  )
}
