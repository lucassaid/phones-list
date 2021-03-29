import { useMemo } from 'react'
import { useRouter } from 'next/router'
import PhonesList from '../components/PhonesList'
import { updatePhone, fetchPhones } from '../firebase/functions'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout/Layout'
import BackAndPageName from '../components/layout/BackAndPageName'
import useSequencesInfo from '../lib/useSequencesInfo'
import CreateSequenceModal from '../components//SequenceCreator/CreateSequenceModal'
import fetchStorage from '../lib/fetchStorage'
import Progress from '../components/PhonesList/Progress'
import { Phone, SequenceInfo, SequenceId, Range, Phones } from '../types'

interface Detail {
  title: string,
  desc: string
}

const Detail = ({title, desc}: Detail) => (
  <div className="mb-1">
    {title} &nbsp;
    <span className="font-medium mb-2">
      {desc}
    </span>
  </div>
)

const getLegibleRange = (range: Range) => `${range.from} - ${range.to}`

export default function Sequence() {

  const { query } = useRouter()
  const sequenceId: SequenceId | null = query && query.sequenceId ? query.sequenceId.toString() : null
  const { data: phones } = useSWR<Phones>(sequenceId ? sequenceId : null, fetchPhones)
  const { sequences } = useSequencesInfo()
  const { data: showProgress } = useSWR('show-progress', fetchStorage)
  const { data: showNumbersSequentially } = useSWR('show-numbers-sequentially', fetchStorage)

  const info: SequenceInfo = sequences[sequenceId]
  const legibleRange = info && getLegibleRange(info.range)
  const legibleRange2 = info && info.secondRange && getLegibleRange(info.secondRange)

  const numbersArr: Phone[] = useMemo(() => {
    const sortBy = showNumbersSequentially ? 'number' : 'index'
    const phonesIds = Object.keys(phones || {})
    return phonesIds
      .map((phoneId: Phone['id']) => phones[phoneId])
      .sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
  }, [phones])

  const handleUpdatePhone = async (phoneId: Phone['id'], updateObj: Phone) => {
    const newNumber = { ...phones[phoneId], ...updateObj }
    mutate(sequenceId, {...phones, [phoneId]: newNumber}, false)
    await updatePhone(sequenceId, phoneId, updateObj)
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
            <Detail title="Números:" desc={legibleRange || ''} />
            {legibleRange2 && <Detail title="Combinados con:" desc={legibleRange2} />}
            <Detail title="Código:" desc={sequenceId || ''} />
          </div>
          <div className="w-full sm:w-11/12 max-w-lg mx-auto mb-6">
            <PhonesList
              numbersArr={numbersArr}
              onUpdatePhone={handleUpdatePhone}
            />
          </div>
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