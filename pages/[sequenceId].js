import { useMemo } from 'react'
import { useRouter } from 'next/router'
import NumbersList from '../components/NumbersList'
import { updatePhone, fetchSequence } from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import Layout from '../components/Layout'
import BackAndPageName from '../components/BackAndPageName'
import useSequences from '../lib/useSequences'

const Detail = ({title, desc}) => (
  <div className="mb-1">
    {title} &nbsp;
    <span className="font-medium mb-2">
      {desc}
    </span>
  </div>
)

export default function Sequence() {

  const { query: { sequenceId } } = useRouter()
  const { data: numbers } = useSWR(sequenceId, fetchSequence)
  const { sequences } = useSequences()

  const info = sequences[sequenceId]
  const numbersLength = useMemo(() => Object.keys(numbers || {}).length, [numbers])
  const legibleRange = info ? `${info.range.from} - ${info.range.to}` : ' '

  const handleUpdatePhone = (phoneId, updateObj) => {
    updatePhone(sequenceId, phoneId, updateObj)
    const newNumber = { ...numbers[phoneId], ...updateObj }
    mutate(sequenceId, {...numbers, [phoneId]: newNumber}, false)
  }

  return (
    <Layout
      topBar={<BackAndPageName title="Lista" />}
      path={`/${sequenceId}`}
    >
      {numbersLength ? (
        <>
          <div className="container opacity-40 text-sm mb-8">
            <Detail title="Números:" desc={legibleRange} />
            <Detail title="Código:" desc={sequenceId} />
          </div>
          <div className="w-full sm:w-11/12 max-w-lg mx-auto">
            <NumbersList
              numbers={numbers}
              onUpdatePhone={handleUpdatePhone}
            />
          </div>
        </>
      ) : (
        <div className="pt-28 text-center text-xl">
          Cargando números...
        </div>
      )}
    </Layout>
  )
}