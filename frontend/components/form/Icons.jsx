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
      {name === 'right' && (
        <svg viewBox='0 0 100 100' fill='none'>
          <path
            d='M98.232 53.2256C98.6928 52.304 98.8464 51.2287 98.8464 50.1535C98.8464 50.1535 98.8464 50.1535 98.8464 49.8463C98.8464 49.5391 98.8464 49.6927 98.8464 49.5391C98.8464 48.4639 98.6928 47.3886 98.232 46.467C97.9247 45.5454 97.3103 44.9309 96.6959 44.1629C96.6959 44.0093 96.5423 43.8557 96.3887 43.7021L56.1442 3.45758C52.7649 0.078268 47.2351 0.078268 43.8558 3.45758C40.4765 6.83689 40.4765 12.3667 43.8558 15.746L69.3542 41.2444H9.60188C4.84012 41.2444 1 45.0845 1 49.8463C1 54.6081 4.84012 58.4482 9.60188 58.4482H69.3542L43.8558 83.9466C40.4765 87.3259 40.4765 92.8557 43.8558 96.235C45.5454 97.9247 47.6959 98.6927 50 98.6927C52.3041 98.6927 54.4545 97.9247 56.1442 96.235L96.3887 55.9905C96.3887 55.9905 96.5423 55.6833 96.6959 55.5297C97.3103 54.9153 97.7711 54.1472 98.232 53.2256Z'
            fill='currentColor'></path>
        </svg>
      )}
      {name === 'minus' && (
        <svg x='0px' y='0px' width={size} height={size} viewBox='0 0 14 14'>
          <rect x='6' transform='matrix(6.123234e-17 -1 1 6.123234e-17 0 14)' width='2.1' height='14'></rect>
        </svg>
      )}
      {name === 'plus' && (
        <svg x='0px' y='0px' width={size} height={size} viewBox='0 0 14 14'>
          <polygon points='14,6 8,6 8,0 6,0 6,6 0,6 0,8 6,8 6,14 8,14 8,8 14,8 '></polygon>
        </svg>
      )}
      {name === 'down' && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' stroke={color} fill={color} width={size} height={size}>
          <path d='M 24.78125 7.96875 C 23.75 8.082031 22.976563 8.964844 23 10 L 23 35.09375 L 16.40625 28.5625 C 16.027344 28.179688 15.507813 27.964844 14.96875 27.96875 C 14.140625 27.960938 13.398438 28.464844 13.09375 29.230469 C 12.789063 30 12.988281 30.875 13.59375 31.4375 L 23.59375 41.3125 L 25 42.71875 L 26.40625 41.3125 L 36.40625 31.4375 C 37.199219 30.660156 37.214844 29.386719 36.4375 28.59375 C 35.660156 27.800781 34.386719 27.785156 33.59375 28.5625 L 27 35.09375 L 27 10 C 27.007813 9.457031 26.796875 8.9375 26.414063 8.554688 C 26.03125 8.171875 25.511719 7.960938 24.96875 7.96875 C 24.90625 7.964844 24.84375 7.964844 24.78125 7.96875 Z' />
        </svg>
      )}
      {name === 'check' && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26' width={size} height={size} fill={color} stroke={color}>
          <path d='M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z' />
        </svg>
      )}
    </>
  )
}
