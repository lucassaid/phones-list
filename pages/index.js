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
import Link from 'next/link'

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

  const wheelIcon = (
    <Link href="/advanced">
      <a>
        <div className="text-right opacity-70">
          <img
            className="w-6"
            src="/icons/gear.svg"
          />
        </div>
      </a>
    </Link>
  )

  return (
    <div>
      <Head>
        <title>Lista de números</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 max-w-lg mx-auto pt-10">

        <div className="mb-7 flex space-x-5 items-center justify-end">
          {numbersLength ? <DeleteNumbers/> : null}
          {wheelIcon}
        </div>

        {!numbersLength ? (
          <SetNumbersRange onNewSequence={handleNewSequence} />
        ) : (
          <>
            <h3 className="text-3xl mb-2">Teléfonos</h3>
            <div className="opacity-70 text-md mb-8">Toque un número para tacharlo</div>
            <NumbersList numbers={numbers}/>
          </>
        )}
      </main>
    </div>
  )
}
