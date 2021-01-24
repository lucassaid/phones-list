import { useState } from 'react'
import { validateRange, shuffle } from '../lib/utils'
import { useAlert } from './Alert'

export default function setNumbersRange({onNewSequence}) {

  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [generating, setGenerating] = useState(false)
  const alert = useAlert()

  const generateAndAddSequence = () => {
    if(!validateRange({from, to}, alert)) return
    setGenerating(true)
    const mapArr = (o, n) => from + n
    const numbersArr = Array.from(new Array(to - from + 1), mapArr)
    onNewSequence(shuffle(numbersArr), {from, to})
  }

  const handleSubmit = e => e.preventDefault()

  const range = {
    from: {
      setter: setFrom,
      placeholder: 'Número inicial',
      value: from,
    },
    to: {
      setter: setTo,
      placeholder: 'Número final',
      value: to,
    }
  }

  const mapInputs = prop => {
    const { setter, placeholder, value } = range[prop]
    return (
      <div key={prop}>
        <input
          className="form-control mb-3"
          onChange={e => setter(Number(e.target.value))}
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

  const saveButton = (
    <button
      disabled={generating}
      type="submit"
      className="btn btn-primary"
      onClick={generateAndAddSequence}
    >
      {generating ? 'Generando números...' : 'Generar números'}
    </button>
  )

  return (
    <div className="lg:pt-20">
      <h3 className="mb-6 text-2xl">
        Ingrese el rango de números
      </h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(range).map(mapInputs)}
        <div className="mt-3">
          {saveButton}
        </div>
      </form>
    </div>
  )
}