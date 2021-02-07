import { useAlert } from '../Alert'

interface DeleteNumbersProps {
  onDelete: () => void
}

export default function DeleteNumbers({onDelete}: DeleteNumbersProps) {

  const { alert, closeAlert } = useAlert()

  const content = (
    <div className="mt-8 text-right">
      <button
        onClick={closeAlert}
        className="btn border mr-4"
      >
        No borrar
      </button>
      <button
        onClick={() => {
          onDelete()
          closeAlert()
        }}
        className="btn bg-red-600 text-white"
      >
        Borrar
      </button>
    </div>
  )

  const deleteNumbers = () => {
    alert({
      title: '¿Borrar secuencia?',
      content
    })
  }

  return (
    <button
      className="p-2 opacity-70 hover:opacity-100"
      onClick={deleteNumbers}
    >
      <img
        className="h-6"
        src="/icons/delete.svg"
      />
    </button>
  )
}