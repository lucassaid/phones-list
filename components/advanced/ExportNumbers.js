import exportFromJSON from 'export-from-json'
import { useState } from 'react'
import { fetchSequence } from '../../firebase/functions'
import useSequences from '../../lib/useSequences'
import useTimestamp from '../../lib/useTimestamp'

const exportType = 'csv'
const savedFileString = 'Archivo descargado!'

const getNumbersArr = (numbers, getDate) => {
  return Object.keys(numbers)
    .map(id => {
      const { called, number, calledAt, notes } = numbers[id]
      return {
        numero: number,
        llamado: called ? 'SI' : 'NO',
        fecha: calledAt ? getDate(calledAt) : '-',
        notas: notes || ''
      }
    })
    .sort((a, b) => a.index > b.index ? 1 : -1)
}

export default function ExportNumbers() {

  const { getDate } = useTimestamp()
  const { sequences } = useSequences()
  const [ exportLabel, setExportLabel ] = useState('Exportar todo')

  const initExportFromJSON = async () => {
    setExportLabel('Generando archivo...')
    for(const sequenceId in sequences) {
      const numbers = await fetchSequence(sequenceId)
      const data = getNumbersArr(numbers, getDate)
      const fileName = `${sequenceId}_${Date.now()}`
      exportFromJSON({ data, fileName, exportType })
    }
    setExportLabel(savedFileString)
  }

  const disabled = !sequences 
    || !Object.keys(sequences).length
    || exportLabel == savedFileString

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


