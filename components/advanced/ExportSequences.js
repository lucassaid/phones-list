import exportFromJSON from 'export-from-json'
import { useState } from 'react'
import { fetchSequence } from '../../firebase/functions'
import useSequences from '../../lib/useSequences'
import { getTimestampDate } from '../../lib/utils'

const exportType = 'csv'
const exportString = 'Exportar todo'

const getNumbersArr = numbers => {
  return Object.keys(numbers)
    .map(id => {
      const { called, number, calledAt, notes } = numbers[id]
      return {
        numero: number,
        llamado: called ? 'SI' : 'NO',
        fecha: calledAt ? getTimestampDate(calledAt) : '-',
        notas: notes || ''
      }
    })
    .sort((a, b) => a.index > b.index ? 1 : -1)
}

export default function ExportSequences() {

  const { sequences } = useSequences()
  const [ exportLabel, setExportLabel ] = useState(exportString)

  const initExportFromJSON = async () => {
    setExportLabel('Generando archivos...')
    for(const sequenceId in sequences) {
      const numbers = await fetchSequence(sequenceId)
      const data = getNumbersArr(numbers)
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


