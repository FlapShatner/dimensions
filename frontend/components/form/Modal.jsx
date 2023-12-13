import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Icons from './Icons'

export default function Modal({ children, preview, isOpen, setIsOpen }) {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: '1000',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1A1A1A',
      border: 'none',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '90%',
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  const openModal = (e) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  const closeModal = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }
  const afterOpenModal = () => {
    console.log('Modal is open')
  }
  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <ReactModal style={customStyles} isOpen={isOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} shouldCloseOnOverlayClick={true}>
        <button className='text-txt-primary border-2 border-border hover:border-red-600 mb-8 flex items-center gap-2' onClick={closeModal}>
          <Icons name='close' size='28' color='red' />
        </button>
        <img className='h-auto max-w-full pointer-events-none ' src={preview} alt='preview' />
      </ReactModal>
    </div>
  )
}
