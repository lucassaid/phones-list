import NumberItem from './NumberItem'
import { useMemo } from 'react'
import firebase from '../firebase'
import { updatePhone } from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function NumbersList({ numbers }) {

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
  
  const updatePhoneAndMutate = (id, updateObj) => {
    updatePhone(id, updateObj)
    const newNumber = { ...numbers[id], ...updateObj }
    mutate('sequence', {...numbers, [id]: newNumber}, false)
  }

  const updateCalled = (id, called) => {
    let updateObj = { called }
    if(called) {
      updateObj.calledAt = firebase.firestore.Timestamp.now()
    }
    updatePhoneAndMutate(id, updateObj)
  }
  
  const progress = (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-lg w-full mx-auto bg-blue-500 px-4 h-10 text-white flex items-center">
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
            onSaveNotes={notes => updatePhoneAndMutate(id, { notes })}
            showDate={showDates == 'true'}
            {...number}
          />
        ))}
      </div>
      {showProgress == 'true' && progress}
    </>
  )
}