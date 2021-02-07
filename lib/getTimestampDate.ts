import { Timestamp } from '@firebase/firestore-types'

const getDate = (timestamp: Timestamp): string => {
  const d = new Date(timestamp.toDate())
  return d.toLocaleDateString()
}
export default getDate 