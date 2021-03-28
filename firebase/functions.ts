import firebase, { db } from './index'
import { 
  SequenceInfo,
  SequenceId,
  Phones,
  Phone
} from '../types'

export const fetchSequenceInfo = async (apiURL: string): Promise<SequenceInfo | null> => {
  const [sequenceId] = apiURL.split('/')
  const ref = db.collection('sequences').doc(sequenceId)
  const doc = await ref.get()
  if(!doc.exists) return null
  const range = doc.data()?.range
  return { range }
}

export const fetchPhones = async (sequenceId: string): Promise<Phones> => {
  const ref = db.collection('sequences').doc(sequenceId).collection('phones')
  const docs = await ref.get()
  if(docs.empty) return {}
  let result: Phones = {}
  docs.forEach(doc => {
    const phone: Phone = { id: doc.id, ...doc.data() }
    result[doc.id] = phone
  })
  return result
}

export const createFirestoreSequence = async (sequence: number[], doc: object): Promise<SequenceId> => {
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

export const updatePhone = async (sequenceId: SequenceId, phoneId: Phone['id'], updateObj: Phone): Promise<void> => {
  const ref = db.collection('sequences').doc(sequenceId).collection('phones').doc(phoneId)
  await ref.update(updateObj)
}