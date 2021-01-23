import exportFromJSON from 'export-from-json'
import { useCallback } from 'react'
import useSWR from 'swr'
import { fetchSequence } from '../firebase/functions'
import useTimestamp from '../lib/useTimestamp'
 
export default function ExportNumbers() {

  const { getDate } = useTimestamp()
  const { data: numbers } = useSWR('sequence', fetchSequence)
  const fileName = 'download'
  const exportType = 'csv'

  const getNumbersArr = useCallback(() => {
    return Object.keys(numbers)
      .map(id => {
        const { called, number, calledAt } = numbers[id]
        return {
          numero: number,
          llamado: called ? 'SI' : 'NO',
          fecha: calledAt ? getDate(calledAt) : '-'
        }
      })
      .sort((a, b) => a.index > b.index ? 1 : -1)
  }, [numbers])
  
  const initExportFromJSON = () => {
    const data = getNumbersArr()
    exportFromJSON({ data, fileName, exportType })
  }

  return (
    <button
      disabled={!numbers}
      className="btn border"
      onClick={initExportFromJSON}
    >
      Exportar números
    </button>
  )
}


