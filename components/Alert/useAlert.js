import { useContext } from 'react'
import AlertContext from './context'

export default function useAlert() {
  return useContext(AlertContext)
}