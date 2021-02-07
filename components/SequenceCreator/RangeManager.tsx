import { useState } from 'react'
import { Range } from '../../types'

interface RangeManagerProps {
  onRangeChanged?: (range: Range) => void
  invalid?: boolean
}

export default function RangeManager({onRangeChanged, invalid}: RangeManagerProps) {

  const [from, setFrom] = useState<any>()
  const [to, setTo] = useState<any>()

  const range = {
    from: {
      setter: (value: Range['from']) => {
        setFrom(value)
        onRangeChanged && onRangeChanged({ from: value, to })
      },
      placeholder: 'Número inicial',
      value: from,
    },
    to: {
      setter: (value: Range['to']) => {
        setTo(value)
        onRangeChanged && onRangeChanged({ from, to: value })
      },
      placeholder: 'Número final',
      value: to,
    }
  }

  type inputType = 'from' | 'to'

  const mapInputs = (prop: inputType) => {
    const { setter, placeholder, value } = range[prop]
    return (
      <div key={prop} className="mb-3">
        <input
          className="form-control"
          onChange={e => setter(Number(e.target.value))}
          //@ts-ignore
          invalid={invalid ? 'true' : 'false'}
          placeholder={placeholder}
          defaultValue={value}
          type="number"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div> 
    )
  }

  return (
    <>
      {mapInputs('from')}
      {mapInputs('to')}
    </>
  )
}