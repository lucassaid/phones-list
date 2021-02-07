import Layout from '../components/layout/Layout'
import useSequencesInfo from '../lib/useSequencesInfo'
import { useEffect } from 'react'
import SequencesList from '../components/SequencesList'
import migrateOldId from '../lib/migrateOldId'
import CreateSequenceModal from '../components/SequenceCreator/CreateSequenceModal'
import SequenceCreator from '../components/SequenceCreator'

export default function Home() {

  const { sequencesLength } = useSequencesInfo()

  useEffect(() => {
    const oldId = localStorage.getItem('sequence-id')
    oldId && migrateOldId(oldId)
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
    <div className="pt-6">
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