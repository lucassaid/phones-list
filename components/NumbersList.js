import NumberItem from './NumberItem'
import { useMemo } from 'react'
import firebase from '../firebase'
import { updatePhone } from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import fetchStorage from '../lib/fetchStorage'

export default function NumbersList({ numbers }) {

  const { data: showDates } = useSWR('show-dates', fetchStorage)

  const numbersArr = useMemo(() => {
    return Object.keys(numbers)
      .map(id => ({ id, ...numbers[id]}))
      .sort((a, b) => a.index > b.index ? 1 : -1)
  }, [numbers])

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

  return (
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
  )
}