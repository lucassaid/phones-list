import { Phone, Range } from '../types'
import getDate from './getTimestampDate'
import { Timestamp } from '@firebase/firestore-types'

export const shuffle = (sourceArray: any[]): any[] => {
  const copy = Array.from(sourceArray)
  for (let i = 0; i < copy.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i))
      const temp = copy[j]
      copy[j] = copy[i]
      copy[i] = temp
  }
  return copy
}

export const validateRange = ({from, to}: Range): void => {
  if(!from || !to) throw new Error('Campos incompletos')
  if(to <= from) throw new Error('El número final debe ser mayor al inicial')
  if(to - from  > 200) throw new Error('El límite de números es 200')
}

export const generateSequence = ({from, to}: Range): number[] => {
  const mapArr = (o: any, n: number) => from + n
  return Array.from(new Array(to - from + 1), mapArr)
}

export const validateRanges = (ranges: Range[]): void => {
  ranges.forEach(validateRange)
  const [range1, range2] = ranges
  if(!range2) return
  if(range1.from == range2.from) throw new Error('Las secuencias no pueden ser iguales')
}

function sortByDate(dateStrA: string, dateStrB: string) {
  const dateA = new Date(dateStrA).getTime()
  const dateB = new Date(dateStrB).getTime()
  return dateA > dateB ? -1 : 1
}

export const getStatistics = (numbersArr: Phone[]) => {
  let datesQuantity = {} // will be something like { '20/02/2021': 4 }
  
  // populate `datesQuantity`
  const calledPhones = numbersArr.filter(number => number.called)
  calledPhones.forEach(({ calledAt }) => {
    const date = getDate(calledAt)
    const calledThisDay = datesQuantity[date] || 0
    datesQuantity[date] = calledThisDay + 1
  })

  // create and return an ordered array like [{date: '20/02/2021', quantity: 4}]
  const orderedDates = Object.keys(datesQuantity).sort(sortByDate)
  return orderedDates.map(date => ({ date, quantity: datesQuantity[date] }))
}