import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function useSequences() {

  const { data } = useSWR('sequences-info', fetchStorage)
  const sequences = data || {}
  const sequencesLength = Object.keys(sequences).length

  const setAndMutate = sequences => {
    localStorage.setItem('sequences-info', JSON.stringify(sequences))
    mutate('sequences-info')
  }

  const addSequence = (id, data) => {
    setAndMutate({...sequences, [id]: data})
  }

  const removeSequence = sequenceId => {
    let newSequencies = { ...sequences }
    delete newSequencies[sequenceId]
    setAndMutate(newSequencies)
  }

  return {
    sequences,
    addSequence,
    removeSequence,
    sequencesLength
  }
}