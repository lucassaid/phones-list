import { useState } from 'react'

export default function NumberItem({
  number,
  called,
  notes,
  onToggleCalled,
  onNotesChanged
}) {

  const [expanded, setExpanded] = useState(false)

  const notesClicked = () => {
    setExpanded(!expanded)
  }

  const notesButton = (
    <div
      onClick={notesClicked}
      className={`flex-0 w-9 h-9 rounded-full p-2 opacity-80 ${notes ? 'bg-blue-500' : ''}`}
    >
      <img
        src="/icons/edit.svg"
        style={notes ? {filter: 'invert(100%)'} : {}}
      />
    </div>
  )

  return (
    <div className="my-1">
      <div className="flex items-center">
        <div
          className="flex items-center flex-1 text-lg py-2"
          onClick={onToggleCalled}
        >
          <input
            checked={called}
            type="checkbox"
          />
          <div className={`ml-2 ${called ? 'opacity-50' : ''}`}>
            {number}
          </div>
        </div>
        {notesButton}
      </div>
      {expanded && (
        <textarea
          onChange={onNotesChanged}
          value={notes}
          placeholder="Ingrese sus notas aquí"
          className="w-full border-2 mb-3 p-2 rounded-md"
        />
      )}
    </div>
  )
}