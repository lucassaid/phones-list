import NumberItem from './NumberItem'

export default function NumbersList({
  numbers,
  onTogglePhone,
  onSaveNotes
}) {

  return (
    <div className="mb-14">
      {numbers.map(number => (
        <NumberItem
          key={number.id}
          onToggleCalled={() => onTogglePhone(number)}
          onSaveNotes={notes => onSaveNotes(number.id, notes)}
          {...number}
        />
      ))}

    </div>
  )
}