import NumberItem from './NumberItem'
import { useMemo } from 'react'
import firebase from '../firebase'
import useSWR from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function NumbersList({
  numbers,
  onUpdatePhone
}) {

  const { data: showDates } = useSWR('show-dates', fetchStorage)
  const { data: showProgress } = useSWR('show-progress', fetchStorage)

  const numbersArr = useMemo(() => {
    return Object.keys(numbers)
      .map(id => ({ id, ...numbers[id]}))
      .sort((a, b) => a.index > b.index ? 1 : -1)
  }, [numbers])

  const calledNumbers = useMemo(() => {
    const calledNumbersArr = numbersArr.filter(number => number.called)
    return calledNumbersArr.length
  }, [numbersArr])

  const updateCalled = (id, called) => {
    let updateObj = { called }
    if(called) {
      updateObj.calledAt = firebase.firestore.Timestamp.now()
    }
    onUpdatePhone(id, updateObj)
  }
  
  const progress = (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-lg w-full mx-auto bg-blue-500 h-9 text-white flex items-center justify-center rounded-tr-lg rounded-tl-lg">
        Avance: {calledNumbers} de {numbersArr.length}
      </div>
    </div>
  )

  return (
    <>
      <div className="mb-14">
        {numbersArr.map(({ id, ...number}) => (
          <NumberItem
            key={id}
            onToggleCalled={() => updateCalled(id, !number.called)}
            onSaveNotes={notes => onUpdatePhone(id, { notes })}
            showDate={showDates}
            {...number}
          />
        ))}
      </div>
      {showProgress && progress}
    </>
  )
}