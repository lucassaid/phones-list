import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function SequenceManager() {

  const { data: seqId } = useSWR('sequence-id', fetchStorage)
  const [newSeqId, setNewSeqId] = useState()
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [saveText, setSaveText] = useState('Guardar')

  const handleChange = e => {
    setSaveText('Guardar')
    setSaveDisabled(false)
    setNewSeqId(e.target.value)
  }

  const save = () => {
    const trimmedId = newSeqId.trim().trimStart()
    localStorage.setItem('sequence-id', trimmedId)
    setSaveText('Guardado!')
    setSaveDisabled(true)
    mutate('sequence')
    mutate('sequence-id')
  }

  return (
    <>
      <div className="mb-2">
        Id de secuencia:
      </div>
      <input
        className="form-control mr-3"
        onChange={handleChange}
        defaultValue={seqId}
      />
      <button
        disabled={saveDisabled}
        className="btn border-2 m-l"
        onClick={save}
      >
        {saveText}
      </button>
    </>
  )
}