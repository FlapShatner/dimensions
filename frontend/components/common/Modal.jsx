import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Icons from './Icons'

export default function Modal({ isOpen, setIsOpen, closeStyle, children, contents, maxWidth }) {
  const customStyles = {
    overlay: {
      backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
      zIndex: '10000',
      minHeight: '100vh',
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
      maxWidth: maxWidth,
      maxHeight: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
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
    // console.log('Modal is open')
  }
  return (
    <div className='max-w-lg'>
      <div onClick={openModal}>{children}</div>
      <ReactModal style={customStyles} isOpen={isOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} shouldCloseOnOverlayClick={true}>
        <button className={closeStyle} onClick={closeModal}>
          <Icons name='close' size='28' color='red' />
        </button>
        {contents}
      </ReactModal>
    </div>
  )
}
