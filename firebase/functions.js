import { db } from './index'

export const fetchSequence = async () => {
  const sequenceId = localStorage.getItem('sequence-id')
  if(!sequenceId) return []

  const ref = db.collection('sequences').doc(sequenceId).collection('phones')
  const docs = await ref.get()
  if(docs.empty) return {}
  let result = {}
  docs.forEach(doc => result[doc.id] = doc.data())
  return result
}

export const addSequence = async (sequence) => {
  const sequenceRef = db.collection('sequences').doc()
  
  const batch = db.batch()

  sequence.forEach((number, index) => {
    const docRef = db.collection('sequences').doc(sequenceRef.id).collection('phones').doc()
    batch.set(docRef, { number, index })
  })

  await batch.commit()

  return sequenceRef.id
}

export const updatePhone = async (phoneId, updateObj) => {
  const sequenceId = localStorage.getItem('sequence-id')
  const ref = db.collection('sequences').doc(sequenceId).collection('phones').doc(phoneId)
  await ref.update(updateObj)
}