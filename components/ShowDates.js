import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function ShowDates() {

  const { data: showDates } = useSWR('show-dates', fetchStorage)

  const handleChange = e => {
    localStorage.setItem('show-dates', e.target.checked)
    mutate('show-dates')
  }
  
  return (
    <div>
      <input
        id="showDates"
        className="transform scale-150 ml-1 mr-4"
        type="checkbox"
        onChange={handleChange}
        defaultChecked={showDates == 'true'}
      />
      <label
        className="select-none"
        htmlFor="showDates"
      >
        Ver fechas
      </label>
    </div>
  )
}