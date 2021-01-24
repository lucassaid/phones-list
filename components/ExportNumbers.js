import exportFromJSON from 'export-from-json'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { fetchSequence } from '../firebase/functions'
import useTimestamp from '../lib/useTimestamp'

const exportType = 'csv'
const savedFileString = 'Archivo descargado!'

export default function ExportNumbers() {

  const { getDate } = useTimestamp()
  const { data: numbers } = useSWR('sequence', fetchSequence)
  const [ exportLabel, setExportLabel ] = useState('Exportar números')

  const getNumbersArr = useCallback(() => {
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
  }, [numbers])
  
  const initExportFromJSON = () => {
    setExportLabel('Generando archivo...')
    const data = getNumbersArr()
    const fileName = `numbers_${Date.now()}`
    exportFromJSON({ data, fileName, exportType })
    setExportLabel(savedFileString)
  }

  const disabled = !numbers 
    || !Object.keys(numbers).length
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


