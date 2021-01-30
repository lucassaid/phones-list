import useSWR, { mutate } from 'swr'
import fetchStorage from '../../lib/fetchStorage'

export default function ShowProgress({ storageKey, label }) {

  const { data } = useSWR(storageKey, fetchStorage)

  const handleChange = e => {
    localStorage.setItem(storageKey, e.target.checked)
    mutate(storageKey)
  }
  
  return (
    <div>
      <input
        id={`${storageKey}-checkbox`}
        className="transform cursor-pointer scale-150 ml-1 mr-4 mb-5"
        type="checkbox"
        onChange={handleChange}
        defaultChecked={data}
      />
      <label
        className="select-none cursor-pointer"
        htmlFor={`${storageKey}-checkbox`}
      >
        {label}
      </label>
    </div>
  )
}