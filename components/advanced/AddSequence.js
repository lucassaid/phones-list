import { useState } from 'react'
import { fetchSequenceInfo } from '../../firebase/functions'
import useSequences from '../../lib/useSequences'

export default function AddSequence() {

  const [newSeqId, setNewSeqId] = useState('')
  const [foundSequence, setFoundSequence] = useState()
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [saveText, setSaveText] = useState('Guardar')
  const [resultText, setResultText] = useState('')
  const { sequences, addSequence } = useSequences()

  const handleChange = async e => {
    const newSequenceId = e.target.value.trim().trimStart()
    setNewSeqId(newSequenceId)
    if(sequences[newSequenceId]) {
      setResultText('Esta secuencia ya es parte de sus secuencias')
      return
    }
    if(newSequenceId.length < 15) return
    setResultText('Buscando...')
    const info = newSequenceId && await fetchSequenceInfo(newSequenceId)
    if(info) {
      const {name, range} = info
      setFoundSequence({name, range})
      setSaveDisabled(false)
    } else {
      setResultText('Secuencia no encontrada')
      setFoundSequence(null)
    }
  }

  const save = () => {
    addSequence(newSeqId, foundSequence)
    setSaveText('Guardado!')
    setSaveDisabled(true)
  }

  return (
    <>
      <div className="mb-2">
        Agregar secuencia:
      </div>
      <input
        className="form-control mb-3"
        onChange={handleChange}
        defaultValue={newSeqId}
      />
      <div>
        {newSeqId.length > 0 && (
          foundSequence ? (
            <div>
              <div className="opacity-70 text-xl">
                {foundSequence.range.from} - {foundSequence.range.to}
              </div>
              <button
                disabled={saveDisabled}
                className="btn border-2 mt-2"
                onClick={save}
              >
                {saveText}
              </button>
            </div>
          ) : (
            <div className="opacity-50">
              {resultText}
            </div>
          )
        )}
      </div>
    </>
  )
}