import { useState } from 'react'
import { validateRanges, generateSequence, shuffle } from '../../lib/utils'
import { createFirestoreSequence } from '../../firebase/functions'
import useSequencesInfo from '../../lib/useSequencesInfo'
import { useRouter } from 'next/router'
import RangeManager from './RangeManager'
import Checkbox from '../Checkbox'
import { Range, SequenceInfo, SequenceId } from '../../types'

interface SetNumbersRangeProps {
  onSequenceCreated?: (sequenceId: SequenceId) => void,
  children?: any
}

export default function SetNumbersRange({onSequenceCreated, children}: SetNumbersRangeProps) {

  const { addSequence } = useSequencesInfo()
  const [range, setRange] = useState<Range>()
  const [range2, setRange2] = useState<Range>()
  const [showRange2, setShowRange2] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [invalidRange, setInvalidRange] = useState(false)
  const router = useRouter()
  
  const createSequence = async () => {
    setGenerating(true)
    try {
      if(!range) throw new Error('Campos incompletos')
      const ranges: Range[] = !range2 ? [range] : [range, range2]
      validateRanges(ranges)
      let doc: SequenceInfo = { range }
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

  const handleSubmit = (e: any) => e.preventDefault()

  const saveButton = (
    <button
      disabled={generating}
      type="submit"
      className="btn btn-primary"
      onClick={createSequence}
      tabIndex={3}
    >
      {generating ? 'Creando...' : 'Crear secuencia'}
    </button>
  )

  const invalidMessage = invalidRange && (
    <div className="text-red-500">
      {invalidRange}
    </div>
  )

  const handleCheckboxChange = (e: any) => {
    setInvalidRange(false)
    setShowRange2(e.target.checked)
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
      {showRange2 && (
        <div className="mt-4">
          <RangeManager
            onRangeChanged={range => {
              setInvalidRange(false)
              setRange2(range)
            }}
            invalid={invalidRange}
          />
        </div>
      )}
      {invalidMessage}
      {typeof children == 'function' ? (
        children(saveButton)
      ) : (
        <div className="mt-6">
          {saveButton}
        </div>
      )}
    </form>
  )
}