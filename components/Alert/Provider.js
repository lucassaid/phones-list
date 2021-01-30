import AlertContext from './context'
import { useState } from 'react'

const Modal = ({title, desc, content, buttons, onAccept}) => (
  <div className="w-11/12 z-20 max-w-md rounded-lg bg-white p-5">
    
    <div className="text-center text-xl">
      {title}
    </div>

    {desc}

    {content}

    {!content && (
      <div className="mt-8 text-center">
        <button
          onClick={onAccept}
          className="btn btn-primary"
        >
          Aceptar
        </button>
      </div>
    )}
  </div>
)

export default function Provider({children}) {

  const [opened, setOpened] = useState(false)
  const [options, setOptions] = useState({})

  const alert = options => {
    setOptions(options)
    setOpened(true)
  }

  const closeAlert = () => setOpened(false)

  return (
    <AlertContext.Provider value={{alert, closeAlert}}>
      {children}
      {opened && (
        <div className="z-40 fixed w-screen h-screen left-0 top-0 flex justify-center items-center">
          <Modal
            onAccept={closeAlert}
            {...options}
          />
          <div
            className="opacity-50 bg-black w-full h-full absolute z-10"
            onClick={closeAlert}
          />
        </div>
      )}
    </AlertContext.Provider>
  )
}