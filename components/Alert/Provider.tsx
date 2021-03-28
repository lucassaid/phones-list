import AlertContext from './context'
import { useState } from 'react'
import Modal from './Modal'
import { ModalOptions } from './types'

export default function Provider({children}: {children: any}) {

  const [opened, setOpened] = useState(false)
  const [options, setOptions] = useState<ModalOptions>()

  const alert = (options: ModalOptions) => {
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