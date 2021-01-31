import SequenceItem from './SequenceItem'
import useSequences from '../../lib/useSequences'

export default function SequencesList() {

  const { sequences, removeSequence } = useSequences()
  const sequencesIds = Object.keys(sequences)
  
  const mapSequences = sequenceId => {
    const sequence = sequences[sequenceId]

    return (
      <SequenceItem
        key={sequenceId}
        sequenceId={sequenceId}
        onDelete={() => removeSequence(sequenceId)}
        {...sequence}
      />
    )
  }

  return sequencesIds.map(mapSequences)
}