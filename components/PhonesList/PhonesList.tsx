import PhoneItem from './PhoneItem'
import firebase from '../../firebase'
import useSWR from 'swr'
import fetchStorage from '../../lib/fetchStorage'
import { Phone } from '../../types'

interface NumberListProps {
  onUpdatePhone: (id: Phone['id'], updateObj: Phone) => void,
  numbersArr: Phone[]
}

export default function NumbersList({
  onUpdatePhone,
  numbersArr
}: NumberListProps) {

  const { data: showDates } = useSWR('show-dates', fetchStorage)

  const updateCalled = (id: Phone['id'], called: Phone['called']): void => {
    let updateObj: Phone = { called }
    if(called) {
      updateObj.calledAt = firebase.firestore.Timestamp.now()
    }
    onUpdatePhone(id, updateObj)
  }

  return (
    <>
      {numbersArr.map(({ id, ...phone}) => (
        <PhoneItem
          key={id}
          onToggleCalled={() => updateCalled(id, !phone.called)}
          onSaveNotes={notes => onUpdatePhone(id, { notes })}
          showDate={showDates}
          {...phone}
        />
      ))}
    </>
  )
}