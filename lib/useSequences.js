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

  return { sequences, addSequence }
}