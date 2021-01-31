import NumberItem from './NumberItem'
import firebase from '../../firebase'
import useSWR from 'swr'
import fetchStorage from '../../lib/fetchStorage'

export default function NumbersList({
  onUpdatePhone,
  numbersArr
}) {

  const { data: showDates } = useSWR('show-dates', fetchStorage)

  const updateCalled = (id, called) => {
    let updateObj = { called }
    if(called) {
      updateObj.calledAt = firebase.firestore.Timestamp.now()
    }
    onUpdatePhone(id, updateObj)
  }

  return (
    numbersArr.map(({ id, ...number}) => (
      <NumberItem
        key={id}
        onToggleCalled={() => updateCalled(id, !number.called)}
        onSaveNotes={notes => onUpdatePhone(id, { notes })}
        showDate={showDates}
        {...number}
      />
    ))
  )
}