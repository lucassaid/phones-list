import useSWR, { mutate } from 'swr'
import fetchStorage from '../../lib/fetchStorage'
import Checkbox from '../Checkbox'

interface ShowProgress {
  storageKey: string,
  label: string
}

export default function ShowProgress({ storageKey, label }: ShowProgress) {

  const { data } = useSWR<boolean>(storageKey, fetchStorage)

  const handleChange = (e: any) => {
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