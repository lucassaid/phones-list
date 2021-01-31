import useSWR, { mutate } from 'swr'
import fetchStorage from '../../lib/fetchStorage'
import Checkbox from '../Checkbox'

export default function ShowProgress({ storageKey, label }) {

  const { data } = useSWR(storageKey, fetchStorage)

  const handleChange = e => {
    localStorage.setItem(storageKey, e.target.checked)
    mutate(storageKey)
  }
  
  return (
    <Checkbox
      onChange={handleChange}
      defaultChecked={data}
      label={label}
    />
  )
}