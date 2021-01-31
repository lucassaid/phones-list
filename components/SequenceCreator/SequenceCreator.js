import { useState } from 'react'
import { validateRange, generateSequence, shuffle } from '../../lib/utils'
import { createFirestoreSequence } from '../../firebase/functions'
import useSequences from '../../lib/useSequences'
import { useRouter } from 'next/router'
import RangeManager from './RangeManager'
import Checkbox from '../Checkbox'

export default function setNumbersRange({onSequenceCreated, children}) {

  const { addSequence } = useSequences()
  const [range, setRange] = useState({})
  const [range2, setRange2] = useState()
  const [generating, setGenerating] = useState(false)
  const [invalidRange, setInvalidRange] = useState(false)
  const router = useRouter()
  
  const createSequence = async () => {
    setGenerating(true)
    try {
      const ranges = !range2 ? [range] : [range, range2]
      ranges.forEach(validateRange)
      let doc = { range }
      if(range2) doc.secondRange = range2
      const numbersArr = ranges.map(generateSequence)
      const combinedRanges = [...numbersArr[0], ...numbersArr[1] || []]
      const shuffledArr = shuffle(combinedRanges)
      const sequenceId = await createFirestoreSequence(shuffledArr, doc)
      addSequence(sequenceId, doc)
      onSequenceCreated && onSequenceCreated(sequenceId)
      router.push(`/${sequenceId}`)
    } catch(err) {
      err.message && setInvalidRange(err.message)
      setGenerating(false)
    }
  }

  const handleSubmit = e => e.preventDefault()

  const saveButton = (
    <button
      disabled={generating}
      type="submit"
      className="btn btn-primary"
      onClick={createSequence}
      tabIndex="3"
    >
      {generating ? 'Generando números...' : 'Crear secuencia'}
    </button>
  )

  const invalidMessage = invalidRange && (
    <div className="text-red-500">
      {invalidRange}
    </div>
  )

  const handleCheckboxChange = e => {
    setRange2(e.target.checked ? {} : null)
  }

  const checkBox = (
    <Checkbox
      label="Combinar con otra secuencia"
      onChange={handleCheckboxChange}
    />
  )

  return (
    <form onSubmit={handleSubmit}>
      <RangeManager
        onRangeChanged={range => {
          setInvalidRange(false)
          setRange(range)
        }}
        invalid={invalidRange}
      />
      {checkBox}
      {range2 && (
        <RangeManager
          onRangeChanged={range => {
            setInvalidRange(false)
            setRange2(range)
          }}
          invalid={invalidRange}
        />
      )}
      {invalidMessage}
      {typeof children == 'function' ? (
        children(saveButton)
      ) : (
        <div className="mt-4">
          {saveButton}
        </div>
      )}
    </form>
  )
}