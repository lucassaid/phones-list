import { useRouter } from 'next/router'
import { useState } from 'react'
import { fetchSequenceInfo } from '../../firebase/functions'
import useSequences from '../../lib/useSequences'
import debounce from '../../lib/debounce'

const debouncedFetchInfo = debounce(fetchSequenceInfo, 200)

export default function ImportSequence() {

  const [searchString, setSearchString] = useState('')
  const [foundSequence, setFoundSequence] = useState()
  const [statusText, setStatusText] = useState('')
  const { sequences, addSequence } = useSequences()
  const router = useRouter()

  const handleChange = async e => {
    const searchString = e.target.value.trim().trimStart()
    setSearchString(searchString)
    if(sequences[searchString]) {
      setStatusText('Esta ya es parte de sus secuencias')
      return
    }
    if(searchString.length < 15) return
    setStatusText('Buscando...')
    const info = await debouncedFetchInfo(searchString)
    setFoundSequence(info)
    if(!info) setStatusText('Secuencia no encontrada')
  }

  const save = () => {
    addSequence(searchString, foundSequence)
    router.push(`/${searchString}`)
  }

  const foundSequenceSection = foundSequence && (
    <>
      <div className="text-5xl ml-10">&darr;</div>
      <div className="my-3">Secuencia encontrada:</div>
      <div className="opacity-70 text-2xl">
        {foundSequence.range.from} - {foundSequence.range.to}
        {foundSequence.secondRange && (
          <div className="mt-2">
            {foundSequence.secondRange.from} - {foundSequence.secondRange.to}
          </div>
        )}
      </div>
      <button
        className="btn border mt-3"
        onClick={save}
      >
        Importar
      </button>
    </>
  )

  return (
    <>
      <div className={foundSequence ? 'opacity-40' : ''}>
        <div className="mb-2">
          Importar secuencia:
        </div>
        <input
          className="form-control mb-2"
          onChange={handleChange}
          defaultValue={searchString}
          placeholder="Id de secuencia"
        />
      </div>
      {searchString.length > 0 && (
        foundSequence ? (
          foundSequenceSection
        ) : (
          <div className="opacity-50 mt-1">
            {statusText}
          </div>
        )
      )}
    </>
  )
}