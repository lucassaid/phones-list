import Head from 'next/head'
import NumbersList from '../components/NumbersList'
import SetNumbersRange from '../components/SetNumbersRange'
import { 
  fetchSequence,
  addSequence
} from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import { useMemo } from 'react'
import DeleteNumbers from '../components/DeleteNumbers'

export default function Home() {

  const { data: numbers } = useSWR('sequence', fetchSequence)
  const numbersLength = useMemo(() => Object.keys(numbers || {}).length, [numbers])

  const handleNewSequence = async sequence => {
    const sequenceId = await addSequence(sequence)
    localStorage.setItem('sequence-id', sequenceId)
    mutate('sequence')
  }

  if(!numbers) return (
    <div className="pt-28 text-center text-xl">
      Cargando números...
    </div>
  )

  return (
    <div>
      <Head>
        <title>Lista de números</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 max-w-lg mx-auto">
        {!numbersLength ? (
          <SetNumbersRange onNewSequence={handleNewSequence} />
        ) : (
          <>
            <div className="text-right pt-10 mb-7">
              <DeleteNumbers/>
            </div>
            <h3 className="text-3xl mb-8">Teléfonos</h3>
            <NumbersList numbers={numbers}/>
          </>
        )}
      </main>
    </div>
  )
}
