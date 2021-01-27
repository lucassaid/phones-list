import NumbersList from '../components/NumbersList'
import SetNumbersRange from '../components/SetNumbersRange'
import { 
  fetchSequenceInfo,
  fetchSequence,
  addSequence
} from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import { useMemo } from 'react'
import DeleteNumbers from '../components/DeleteNumbers'
import Link from 'next/link'

export default function Home() {

  const { data: numbers } = useSWR('sequence', fetchSequence)
  const { data: info } = useSWR('sequenceInfo', fetchSequenceInfo)
  const numbersLength = useMemo(() => Object.keys(numbers || {}).length, [numbers])

  const legibleRange = info ? `${info.range.from} - ${info.range.to}` : ' '

  const handleNewSequence = async (sequence, range) => {
    const sequenceId = await addSequence(sequence, range)
    localStorage.setItem('sequence-id', sequenceId)
    mutate('sequence')
    mutate('sequenceInfo')
  }

  if(!numbers) return (
    <div className="pt-28 text-center text-xl">
      Cargando números...
    </div>
  )

  const wheelIcon = (
    <Link href="/advanced">
      <a className="p-2">
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
      <main className="pt-10">
        <div className="container mb-7 flex space-x-3 items-center justify-end">
          {numbersLength ? <DeleteNumbers/> : null}
          {wheelIcon}
        </div>

        {!numbersLength ? (
          <div className="container">
            <SetNumbersRange onNewSequence={handleNewSequence} />
          </div>
        ) : (
          <>
            <div className="container">
              <h3 className="text-3xl mb-2">Teléfonos</h3>
              <div className="opacity-70 text-lg mb-8">
                {legibleRange}
              </div>
            </div>
            <div className="w-full sm:w-11/12 max-w-lg mx-auto">
              <NumbersList numbers={numbers}/>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
