import React from 'react'
import Icons from '../common/Icons'

export default function Quantity({ quantity, setQuantity }) {
  const handleQuantity = (e) => {
    if (e.target.id === 'plus') {
      setQuantity(quantity + 1)
    } else {
      if (quantity === 1) return
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className='product-quantity-selector '>
      <p className='variant-title' htmlFor='product-quantity-product-form-template--15254165553235__main'>
        Quantity
      </p>
      <div className='quantity' data-quantity-wrapper=''>
        <button id='minus' type='button' className='quantity-button quantity-down focus-inside' onClick={handleQuantity}>
          <span className='hidden'>Decrease quantity for 7 Seconds in Hell Bull Truck Back Window Graphics</span>
          <Icons name='minus' size='12' color='#ffffff' />
        </button>
        <label className='hidden' htmlFor='product-quantity'>
          Quantity
        </label>
        <input className='quantity-input focus-inside bg-bg-primary' type='number' name='quantity' readOnly min='1' value={quantity} aria-label='Quantity' />
        <button id='plus' type='button' className='quantity-button quantity-up  focus-inside' onClick={handleQuantity}>
          <span className='hidden'>Increase quantity for 7 Seconds in Hell Bull Truck Back Window Graphics</span>
          <Icons size='12' color='#ffffff' name='plus' />
        </button>
      </div>
    </div>
  )
}
