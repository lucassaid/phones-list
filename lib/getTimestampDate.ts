import { Timestamp } from '@firebase/firestore-types'

const getDate = (timestamp: Timestamp): string => {
  return timestamp.toDate().toLocaleDateString('es-ES')
}
export default getDate