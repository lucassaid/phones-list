import { createContext } from 'react'
import { ModalOptions } from './types'

interface AlertContext {
  alert: (options: ModalOptions) => void,
  closeAlert: () => void
}

export default createContext<AlertContext>({ 
  alert: () => {},
  closeAlert: () => {}
})