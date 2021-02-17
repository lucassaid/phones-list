import { useMemo } from 'react'
import { useRouter } from 'next/router'
import NumbersList from '../components/NumbersList'
import { updatePhone, fetchSequence } from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout/Layout'
import BackAndPageName from '../components/layout/BackAndPageName'
import useSequences from '../lib/useSequences'
import CreateSequenceModal from '../components/CreateSequenceModal'
import fetchStorage from '../lib/fetchStorage'
import Progress from '../components/NumbersList/Progress'

const Detail = ({title, desc}) => (
  <div className="mb-1">
    {title} &nbsp;
    <span className="font-medium mb-2">
      {desc}
    </span>
  </div>
)

const getLegibleRange = range => `${range.from} - ${range.to}`

export default function Sequence() {

  const { query: { sequenceId } } = useRouter()
  const { data: numbers } = useSWR(sequenceId, fetchSequence)
  const { sequences } = useSequences()
  const { data: showProgress } = useSWR('show-progress', fetchStorage)

  const info = sequences[sequenceId]
  const legibleRange = info && getLegibleRange(info.range)
  const legibleRange2 = info && info.secondRange && getLegibleRange(info.secondRange)

  const numbersArr = useMemo(() => {
    return Object.keys(numbers || {})
      .map(id => ({ id, ...numbers[id]}))
      .sort((a, b) => a.index > b.index ? 1 : -1)
  }, [numbers])

  const handleUpdatePhone = (phoneId, updateObj) => {
    updatePhone(sequenceId, phoneId, updateObj)
    const newNumber = { ...numbers[phoneId], ...updateObj }
    mutate(sequenceId, {...numbers, [phoneId]: newNumber}, false)
  }

  const topBar = (
    <div className="flex flex-1 justify-between items-center">  
      <BackAndPageName />
      <CreateSequenceModal />
    </div>
  )

  return (
    <Layout
      topBar={topBar}
      path={`/${sequenceId}`}
    >
      {numbersArr.length ? (
        <>
          <div className="container opacity-40 text-sm mb-8">
            <Detail title="Números:" desc={legibleRange} />
            {legibleRange2 && <Detail title="Combinados con:" desc={legibleRange2} />}
            <Detail title="Código:" desc={sequenceId} />
          </div>
          <div className="w-full sm:w-11/12 max-w-lg mx-auto">
            <NumbersList
              numbersArr={numbersArr}
              onUpdatePhone={handleUpdatePhone}
            />
          </div>
          <div className="mt-16"/>
          {showProgress && <Progress numbersArr={numbersArr} />}
        </>
      ) : (
        <div className="pt-28 text-center text-xl">
          Cargando números...
        </div>
      )}
    </Layout>
  )
}