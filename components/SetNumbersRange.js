import { useState } from 'react'
import { validateRange, shuffle } from '../lib/utils'
import { useAlert } from './Alert'

const placeholders = {
  from: 'Número inicial',
  to: 'Número final'
}

export default function setNumbersRange({onNewSequence}) {

  const [range, setRange] = useState({from: undefined, to: undefined})
  const [generating, setGenerating] = useState(false)
  const alert = useAlert()

  const generateAndAddSequence = () => {
    if(!validateRange(range, alert)) return
    setGenerating(true)
    const { from, to } = range
    const mapArr = (o, n) => from + n
    const numbersArr = Array.from(new Array(to - from + 1), mapArr)
    onNewSequence(shuffle(numbersArr))
  }

  const handleSubmit = e => e.preventDefault()

  return (
    <div className="lg:pt-20">
      <h3 className="mb-6 text-2xl">
        Ingrese el rango de números
      </h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(range).map(prop => (
          <input
            key={prop}
            className="border-2 p-2 rounded-md mb-3 max-w-full"
            onChange={e => {
              setRange({
                ...range,
                [prop]: Number(e.target.value)
              })
            }}
            placeholder={placeholders[prop]}
            defaultValue={range[prop]}
            type="number"
          />
        ))}
        <div>
          <button
            disabled={generating}
            type="submit"
            className={`btn btn-primary mt-3 ${generating ? 'opacity-70 cursor-auto' : ''}`}
            onClick={generateAndAddSequence}
          >
            {generating ? 'Generando números...' : 'Generar números'}
          </button>
        </div>
      </form>
    </div>
  )
}