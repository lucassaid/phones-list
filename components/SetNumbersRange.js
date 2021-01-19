import { useState } from 'react'
import generateId from '../lib/generateId'

const placeholders = {
  from: 'Número inicial',
  to: 'Número final'
}

export default function setNumbersRange({onAddNumbers}) {

  const [range, setRange] = useState({from: undefined, to: undefined})

  const calculateNumbers = () => {
    let newNumbers = {}
    const { from, to } = range
    for(let i = from; i <= to; i++) {
      const id = generateId()
      newNumbers[id] = {
        number: i
      }
    }
    onAddNumbers(newNumbers)
  }

  return (
    <div>
      <h3 className="mt-10 mb-4 text-2xl">
        Ingrese el rango de números
      </h3>
      {Object.keys(range).map(prop => (
        <input
          className="border-2 p-2 rounded-md mb-3"
          onChange={e => {
            setRange({...range, [prop]: Number(e.target.value)})
          }}
          placeholder={placeholders[prop]}
          value={range[prop]}
          type="number"
        />
      ))}
      <button
        className="bg-blue-400 mt-3 rounded-md text-white px-4 py-2"
        onClick={calculateNumbers}
      >
        Agregar numeros
      </button>
    </div>
  )
}