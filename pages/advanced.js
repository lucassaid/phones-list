import ExportNumbers from '../components/advanced/ExportNumbers'
import CheckboxOption from '../components/advanced/CheckboxOption'
import Layout from '../components/Layout'
import BackAndPageName from '../components/BackAndPageName'
import AddSequence from '../components/advanced/AddSequence'
import { useRouter } from 'next/router'

export default function Advanced() {

  const { query: { b: back = '/' } } = useRouter()

  return (
    <Layout 
      topBar={
        <BackAndPageName
          title="Opciones avanzadas"
          backPath={back}
        />
      }
      hideSettingsButton
    >
      <div className="container pt-5">
        <CheckboxOption
          storageKey="show-dates"
          label="Mostrar fechas"
        />
        <CheckboxOption
          storageKey="show-progress"
          label="Mostrar progreso"
        />
        <hr className="my-8"/>
        <AddSequence/>
        <hr className="my-8"/>
        <ExportNumbers/>
      </div>
    </Layout>  
  )
}