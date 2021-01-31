import { useState } from 'react'

export default function setNumbersRange({onRangeChanged, invalid}) {

  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  const range = {
    from: {
      setter: value => {
        setFrom(value)
        onRangeChanged({ from: value, to })
      },
      placeholder: 'Número inicial',
      value: from,
    },
    to: {
      setter: value => {
        setTo(value)
        onRangeChanged({ from, to: value })
      },
      placeholder: 'Número final',
      value: to,
    }
  }

  const mapInputs = prop => {
    const { setter, placeholder, value } = range[prop]
    return (
      <div key={prop} className="mb-3">
        <input
          className="form-control"
          onChange={e => setter(Number(e.target.value))}
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

  return Object.keys(range).map(mapInputs)
}