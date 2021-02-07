import ExportSequences from '../components/advanced/ExportSequences'
import CheckboxOption from '../components/advanced/CheckboxOption'
import Layout from '../components/layout/Layout'
import BackAndPageName from '../components/layout/BackAndPageName'
import ImportSequence from '../components/advanced/ImportSequence'
import { useRouter } from 'next/router'

export default function Advanced() {

  const { query: { b } } = useRouter()

  const backPath = b ? b.toString() : '/'

  return (
    <Layout 
      topBar={
        <BackAndPageName
          title="Opciones avanzadas"
          backPath={backPath}
        />
      }
      hideSettingsButton
    >
      <div className="container pt-5">
        <div className="space-y-4">
          <CheckboxOption
            storageKey="show-dates"
            label="Mostrar fechas"
          />
          <CheckboxOption
            storageKey="show-progress"
            label="Mostrar progreso"
          />
        </div>
        <hr className="my-8"/>
        <ImportSequence/>
        <hr className="my-8"/>
        <ExportSequences/>
      </div>
    </Layout>  
  )
}