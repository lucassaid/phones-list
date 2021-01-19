import { useRecoilState } from 'recoil'
import NumberItem from './NumberItem'
import numbersState from '../atoms/numbers'

export default function NumbersList({numbers}) {

  const [numbersObj, setNumbers] = useRecoilState(numbersState)

  const toggleCalled = id => {
    setNumbers({
      ...numbersObj,
      [id]: {
        ...numbersObj[id],
        called: !numbersObj[id].called,
      }
    })
  }

  const setNotes = (id, value) => {
    setNumbers({
      ...numbersObj,
      [id]: {
        ...numbersObj[id],
        notes: value,
      }
    })
  }

  return (
    <div className="mb-14">
      {numbers.map(number => (
        <NumberItem
          key={number.id}
          onToggleCalled={() => toggleCalled(number.id)}
          onNotesChanged={e => setNotes(number.id, e.target.value)}
          {...number}
        />
      ))}

    </div>
  )
}