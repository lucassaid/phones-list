import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function useSequences() {

  const { data } = useSWR('sequences-info', fetchStorage)
  const sequences = data || {}

  const addSequence = (id, data) => {
    const newSequenceIds = JSON.stringify({...sequences, [id]: data})
    localStorage.setItem('sequences-info', newSequenceIds)
    mutate('sequences-info')
  }

  const removeSequence = sequenceId => {
    let newSequencies = { ...sequences }
    delete newSequencies[sequenceId]
    console.log(sequenceId, newSequencies)
    localStorage.setItem('sequences-info', JSON.stringify(newSequencies))
    mutate('sequences-info')
  }

  return {
    sequences,
    addSequence,
    removeSequence
  }
}