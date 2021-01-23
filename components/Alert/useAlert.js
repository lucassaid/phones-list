import { useContext } from 'react'
import AlertContext from './context'

export default function useAlert() {
  const { open } = useContext(AlertContext)
  return open
}