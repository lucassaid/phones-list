import NumberItem from './NumberItem'
import { useMemo } from 'react'
import { updatePhone } from '../firebase/functions'
import { mutate } from 'swr'

export default function NumbersList({ numbers }) {

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

  return (
    <div className="mb-14">
      {numbersArr.map(({ id, ...number}) => (
        <NumberItem
          key={id}
          onToggleCalled={() => updatePhoneAndMutate(id, { called: !number.called})}
          onSaveNotes={notes => updatePhoneAndMutate(id, { notes })}
          {...number}
        />
      ))}

    </div>
  )
}