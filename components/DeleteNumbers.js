import { mutate } from 'swr'
import { useMemo } from 'react'
import { useAlert, useCloseAlert } from '../components/Alert'

export default function DeleteNumbers() {

  const alert = useAlert()
  const closeAlert = useCloseAlert()

  const deleteModalButtons = useMemo(() => (
    <div className="mt-8 text-right">
      <button
        onClick={closeAlert}
        className="btn border mr-4"
      >
        No borrar
      </button>
      <button
        onClick={() => {
          localStorage.removeItem('sequence-id')
          mutate('sequence')
          closeAlert()
        }}
        className="btn bg-red-600 text-white"
      >
        Borrar
      </button>
    </div>
  ), [])

  const deleteNumbers = () => {
    alert({
      title: '¿Borrar todos los números?',
      buttons: deleteModalButtons
    })
  }

  return (
    <button
      className="btn-small border hover:border-gray-300"
      onClick={deleteNumbers}
    >
      Borrar todos los números
    </button>
  )
}