import exportFromJSON from 'export-from-json'
import { useState } from 'react'
import { fetchPhones } from '../../firebase/functions'
import useSequencesInfo from '../../lib/useSequencesInfo'
import getTimestampDate from '../../lib/getTimestampDate'
import { Phone, Phones } from '../../types'

const exportType = 'csv'
const exportString = 'Exportar todo'

const parsePhonesToCsv = (phones: Phones) => {
  const PhonesIds: Phone['id'][] = Object.keys(phones)
  return PhonesIds
    .sort((a, b) => phones[a].index > phones[b].index ? 1 : -1)
    .map(phoneId => {
      const { called, number, calledAt, notes } = phones[phoneId]
      return {
        numero: number,
        llamado: called ? 'SI' : 'NO',
        fecha: calledAt ? getTimestampDate(calledAt) : '-',
        notas: notes || ''
      }
    })
}

export default function ExportSequences() {

  const { sequences } = useSequencesInfo()
  const [ exportLabel, setExportLabel ] = useState(exportString)

  const initExportFromJSON = async () => {
    setExportLabel('Generando archivos...')
    for(const sequenceId in sequences) {
      const phones = await fetchPhones(sequenceId)
      const data = parsePhonesToCsv(phones)
      const fileName = `${sequenceId}_${Date.now()}`
      exportFromJSON({ data, fileName, exportType })
    }
    setExportLabel('Descargando archivos')
  }

  const disabled = !sequences 
    || !Object.keys(sequences).length
    || exportLabel != exportString

  return (
    <button
      disabled={disabled}
      className="btn border"
      onClick={initExportFromJSON}
    >
      {exportLabel}
    </button>
  )
}


