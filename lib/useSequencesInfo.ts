import useSWR, { mutate } from 'swr'
import { SequenceInfo, SequenceId, SequencesInfo } from '../types'
import fetchStorage from './fetchStorage'

export const setSequenceInfoAndMutate = (sequences: SequencesInfo): void => {
  localStorage.setItem('sequences-info', JSON.stringify(sequences))
  mutate('sequences-info')
}

export default function useSequencesInfo() {

  const { data } = useSWR<SequencesInfo>('sequences-info', fetchStorage)
  const sequences = data || {}
  const sequencesLength = Object.keys(sequences).length

  const addSequence = (id: SequenceId, data: SequenceInfo): void => {
    setSequenceInfoAndMutate({...sequences, [id]: data})
  }

  const removeSequence = (sequenceId: SequenceId): void => {
    let newSequencies: SequencesInfo = fetchStorage('sequences-info')
    delete newSequencies[sequenceId]
    setSequenceInfoAndMutate(newSequencies)
  }

  return {
    sequences,
    addSequence,
    removeSequence,
    sequencesLength
  }
}