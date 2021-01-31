import firebase, { db } from './index'

export const fetchSequenceInfo = async apiURL => {
  const [sequenceId] = apiURL.split('/')
  const ref = db.collection('sequences').doc(sequenceId)
  const doc = await ref.get()
  if(!doc.exists) return null
  return doc.data()
}

export const fetchSequence = async (sequenceId) => {
  const ref = db.collection('sequences').doc(sequenceId).collection('phones')
  const docs = await ref.get()
  if(docs.empty) return {}
  let result = {}
  docs.forEach(doc => result[doc.id] = doc.data())
  return result
}

export const createFirestoreSequence = async (sequence, doc) => {
  const sequenceRef = db.collection('sequences').doc()
  await sequenceRef.set({ 
    createdAt: firebase.firestore.Timestamp.now(),
    ...doc,
  })
  const batch = db.batch()
  sequence.forEach((number, index) => {
    const docRef = db.collection('sequences').doc(sequenceRef.id).collection('phones').doc()
    batch.set(docRef, { number, index })
  })
  await batch.commit()
  return sequenceRef.id
}

export const updatePhone = async (sequenceId, phoneId, updateObj) => {
  const ref = db.collection('sequences').doc(sequenceId).collection('phones').doc(phoneId)
  await ref.update(updateObj)
}