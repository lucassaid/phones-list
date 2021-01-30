import SequenceCreator from '../components/SequenceCreator'
import Layout from '../components/layout/Layout'
import useSequences from '../lib/useSequences'
import { useEffect } from 'react'
import SequencesList from '../components/SequencesList'
import migrateOldId from '../lib/migrateOldId'
import CreateSequenceModal from '../components/CreateSequenceModal'

export default function Home() {

  const { addSequence, sequencesLength } = useSequences()

  useEffect(() => {
    const oldId = localStorage.getItem('sequence-id')
    oldId && migrateOldId(oldId, addSequence)
  }, [])

  const createdSequencies = sequencesLength > 0 && (
    <>
      <h3 className="mb-6 text-2xl">
        Secuencias creadas
      </h3>
      <SequencesList/>
    </>
  )

  const newSequenceButton = (
    <button style={{display: 'flex'}} className="btn border items-center">
      <img
        className="h-6 mr-3 opacity-70"
        src="/icons/plus.svg"
      />
      <span>
        Nueva secuencia
      </span>
    </button>
  )

  const newSequenceSection = sequencesLength ? (
    <div className="pt-4">
      <CreateSequenceModal trigger={newSequenceButton}/>
    </div>
  ):(
    <div className="pt-10">
      <h3 className="mb-6 text-2xl">
        Nueva secuencia
      </h3>
      <SequenceCreator />
    </div>
  )

  return (
    <Layout>
      <div className="container">
        {createdSequencies}
        {newSequenceSection}
      </div>
    </Layout>
  )
}