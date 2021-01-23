import { useMemo } from 'react'
import Head from 'next/head'
import NumbersList from '../components/NumbersList'
import SetNumbersRange from '../components/SetNumbersRange'
import { 
  fetchSequence,
  addSequence,
  updatePhone
} from '../firebase/functions'
import useSWR, { mutate } from 'swr'

export default function Home() {

  const { data: numbers } = useSWR('sequence', fetchSequence)

  const numbersArr = useMemo(() => {
    if(!numbers) return false
    return Object.keys(numbers)
      .map(id => ({ id, ...numbers[id]}))
      .sort((a, b) => a.index > b.index ? 1 : -1)
  }, [numbers])
  
  console.log(numbersArr)

  if(!numbersArr) return (
    <div className="pt-28 text-center text-xl">
      Cargando números...
    </div>
  )

  const handleNewSequence = async sequence => {
    const sequenceId = await addSequence(sequence)
    localStorage.setItem('sequence-id', sequenceId)
    mutate('sequence')
  }

  const deleteNumbers = () => {
    const result = confirm('¿Borrar todos los números?')
    if(result) {
      localStorage.removeItem('sequence-id')
      mutate('sequence')
    }
  }

  const updatePhoneAndMutate = (id, updateObj) => {
    updatePhone(id, updateObj)
    const newNumber = { ...numbers[id], ...updateObj }
    mutate('sequence', {...numbers, [id]: newNumber}, false)
  }

  const handleTogglePhone = ({id, called}) => {
    updatePhoneAndMutate(id, { called: !called })
  }

  const handleSaveNotes = async (id, notes) => {
    updatePhoneAndMutate(id, { notes })
  }

  const actions = (
    <div className="text-right pt-10 mb-7">
      <button
        className="px-3 py-1 rounded-md border hover:border-gray-300"
        onClick={deleteNumbers}
      >
        Borrar todos los números
      </button>
    </div>
  )

  return (
    <div>
      <Head>
        <title>Lista de números</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 max-w-lg mx-auto">
        {!numbersArr || numbersArr.length == 0 ? (
          <SetNumbersRange onNewSequence={handleNewSequence} />
        ) : (
          <>
            {actions}
            <h3 className="text-3xl mb-8">Teléfonos</h3>
            <NumbersList
              numbers={numbersArr}
              onTogglePhone={handleTogglePhone}
              onSaveNotes={handleSaveNotes}
            />
          </>
        )}

      </main>
    </div>
  )
}
