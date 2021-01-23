import { useContext } from 'react'
import AlertContext from './context'

export default function useAlert() {
  const { close } = useContext(AlertContext)
  return close
}