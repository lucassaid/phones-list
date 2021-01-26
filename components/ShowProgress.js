import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function ShowProgress() {

  const { data: showProgress } = useSWR('show-progress', fetchStorage)

  const handleChange = e => {
    localStorage.setItem('show-progress', e.target.checked)
    mutate('show-progress')
  }
  
  return (
    <div>
      <input
        id="showProgress"
        className="transform scale-150 ml-1 mr-4 mb-5"
        type="checkbox"
        onChange={handleChange}
        defaultChecked={showProgress == 'true'}
      />
      <label
        className="select-none"
        htmlFor="showProgress"
      >
        Mostrar progreso
      </label>
    </div>
  )
}