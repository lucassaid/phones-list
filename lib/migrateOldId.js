import { fetchSequenceInfo } from '../firebase/functions'

export default async function migrateOldId(oldId, addSequence) {
  const { range } = await fetchSequenceInfo(oldId)
  addSequence(oldId, { range })
  localStorage.removeItem('sequence-id')
}