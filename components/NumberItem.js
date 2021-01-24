import { useState } from 'react'
import useTimestamp from '../lib/useTimestamp'

export default function NumberItem({
  number,
  called,
  notes = '',
  onToggleCalled,
  onSaveNotes,
  calledAt,
  showDate
}) {

  const [expanded, setExpanded] = useState(false)
  const [notesState, setNotesState] = useState(notes)
  const { getDate } = useTimestamp()

  const calledDate = showDate && calledAt && getDate(calledAt)

  const saveNotes = () => {
    setExpanded(false)
    onSaveNotes(notesState)
  }

  const callButton = (
    <a
      className="flex-0 btn-small border opacity-80 hover:opacity-90 mr-2 md:mr-3"
      href={`tel:${number}`}
    >
      Llamar
    </a>
  )

  const notesButton = (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`flex-0 w-9 h-9 rounded-full p-2 opacity-70 cursor-pointer tap-transparent hover:bg-gray-200 ${notes ? 'bg-blue-400' : ''}`}
    >
      <img
        src="/icons/edit.svg"
        style={notes ? {filter: 'invert(100%)'} : {}}
      />
    </div>
  )

  const expandedArea = (
    <div className="px-1">
      <textarea
        onChange={e => setNotesState(e.target.value)}
        defaultValue={notesState}
        rows={4}
        placeholder="Ingrese sus notas aquí"
        className="form-control w-full"
      />
      <div className="text-right mt-2 pb-4">
        <button
          className="btn-small btn-primary"
          onClick={saveNotes}
        >
          Guardar
        </button>
      </div>
    </div>
  )

  const date = calledDate ? (
    <div className="opacity-50 text-sm mt-1">
      {calledDate}
    </div>
  ) : null

  return (
    <div className="hover:bg-gray-100 px-2 sm:rounded-md">
      <div className="flex items-center">
        <div
          className="py-3 pl-2 flex-1 text-xl cursor-pointer tap-transparent"
          onClick={onToggleCalled}
        >
          <div className={called ? 'opacity-40 line-through' : ''}>
            {number}
          </div>
          {date}
        </div>
        {callButton}
        {notesButton}
      </div>
      {expanded && expandedArea}
    </div>
  )
}