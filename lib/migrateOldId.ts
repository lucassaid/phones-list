import { fetchSequenceInfo } from '../firebase/functions'
import { SequenceId } from '../types'
import { setSequenceInfoAndMutate } from './useSequencesInfo'

export default async function migrateOldId(oldId: SequenceId) {
  const { range } = await fetchSequenceInfo(oldId)
  setSequenceInfoAndMutate({[oldId]: { range }})
  localStorage.removeItem('sequence-id')
}