import Form from './form/Form'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default function App({ home }) {
  console.log('Home', home)

  return (
    <div className='window-form bg-bg-secondary w-full'>
      <Form />
    </div>
  )
}
