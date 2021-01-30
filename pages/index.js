import SequenceCreator from '../components/SequenceCreator'
import { addSequence, fetchSequenceInfo } from '../firebase/functions'
import Layout from '../components/Layout'
import SequenceItem from '../components/SequenceItem'
import { useRouter } from 'next/router'
import useSequences from '../lib/useSequences'
import { useEffect } from 'react'

export default function Home() {

  const {
    sequences,
    addSequence: addSequenceLocal,
    removeSequence
  } = useSequences()
  const router = useRouter()

  const sequencesIds = Object.keys(sequences)
  
  const handleNewSequence = async (sequence, range) => {
    const sequenceId = await addSequence(sequence, range)
    addSequenceLocal(sequenceId, { range })
    router.push(`/${sequenceId}`)
  }

  const migrateOldId = async oldId => {
    const { range } = await fetchSequenceInfo(oldId)
    addSequenceLocal(oldId, { range })
    router.push(`/${oldId}`)
    localStorage.removeItem('sequence-id')
  }

  useEffect(() => {
    const oldId = localStorage.getItem('sequence-id')
    oldId && migrateOldId(oldId)
  }, [])

  return (
    <Layout>
      <div className="container">
        {sequencesIds.length ? (
          <div>
            <h3 className="mb-6 text-2xl">
              Secuencias creadas
            </h3>
            {sequencesIds.map(sequenceId => {
              const sequence = sequences[sequenceId]
              return (
                <SequenceItem
                  key={sequenceId}
                  sequenceId={sequenceId}
                  onDelete={() => removeSequence(sequenceId)}
                  {...sequence}
                />
              )
            })}
          </div>
        ) : null}
        <SequenceCreator
          onNewSequence={handleNewSequence}
        />
      </div>
    </Layout>
  )
}
