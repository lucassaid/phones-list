import { useState } from 'react'

const placeholders = {
  from: 'Número inicial',
  to: 'Número final'
}

function shuffle(sourceArray) {
  const copy = Array.from(sourceArray)
  for (let i = 0; i < copy.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      const temp = copy[j];
      copy[j] = copy[i];
      copy[i] = temp;
  }
  return copy;
}

const validate = (from, to) => {
  if(!from || !to) {
    alert('Rango incompleto')
    return false
  } else if(to <= from) {
    alert('El número final debe ser mayor al inicial')
    return false
  }
  return true
}

export default function setNumbersRange({onNewSequence}) {

  const [range, setRange] = useState({from: undefined, to: undefined})
  const [generating, setGenerating] = useState(false)

  const calculateNumbers = () => {
    const { from, to } = range
    if(!validate(from, to)) return
    setGenerating(true)
    const numbersQ = to - from
    const orderedNumbers = Array.from(new Array(numbersQ + 1), (o, n) => from + n)
    const shuffledNumbers = shuffle(orderedNumbers)
    onNewSequence(shuffledNumbers)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <h3 className="mt-10 mb-4 text-2xl">
        Ingrese el rango de números
      </h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(range).map(prop => (
          <input
            key={prop}
            className="border-2 p-2 rounded-md mb-3"
            onChange={e => {
              setRange({...range, [prop]: Number(e.target.value)})
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
            className={`bg-blue-400 inline-block mt-3 rounded-md text-white px-4 py-2 ${generating ? 'opacity-60 cursor-auto' : ''}`}
            onClick={calculateNumbers}
          >
            {generating ? 'Generando números...' : 'Generar números'}
          </button>
        </div>
      </form>
    </div>
  )
}