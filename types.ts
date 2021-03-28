import { Timestamp } from '@firebase/firestore-types'

export interface Range {
  from: number,
  to: number
}

export type SequenceId = string

export interface SequenceInfo {
  createdAt?: Timestamp,
  range: Range,
  secondRange?: Range
}

export interface Phone {
  id?: string,
  index?: number,
  number?: number,
  called?: boolean,
  calledAt?: Timestamp,
  notes?: string
}

export type Phones = Record<Phone['id'], Phone>

export type SequencesInfo = Record<SequenceId, SequenceInfo>