import SequenceItem from './SequenceItem'
import useSequencesInfo from '../../lib/useSequencesInfo'
import { SequenceId, SequenceInfo } from '../../types'

export default function SequencesList() {

  const { sequences, removeSequence } = useSequencesInfo()
  const sequencesIds = Object.keys(sequences)
  
  const mapSequences = (sequenceId: SequenceId) => {
    const sequenceInfo: SequenceInfo = sequences[sequenceId]

    return (
      <SequenceItem
        key={sequenceId}
        sequenceId={sequenceId}
        onDelete={() => removeSequence(sequenceId)}
        {...sequenceInfo}
      />
    )
  }

  return (
    <>
      {sequencesIds.map(mapSequences)}
    </>
  )
}