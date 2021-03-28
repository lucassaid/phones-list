import { useMemo } from 'react'
import StatisticsModal from './StatisticsModal'
import { Phone } from '../../types'

interface ProgressProps {
  numbersArr: Phone[]
}

export default function Progress({ numbersArr }: ProgressProps) {

  const calledNumbers: number = useMemo(() => {
    return numbersArr.filter(number => number.called).length
  }, [numbersArr])

  return (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-lg w-full mx-auto bg-blue-500 py-2 text-white flex items-center justify-center md:rounded-t-lg">
        <div className="mr-10">
          Avance: {calledNumbers} de {numbersArr.length}  
        </div>
        <StatisticsModal
          trigger={(
            <button
              className="btn-small border"
              disabled={!calledNumbers}
            >
              Estadísticas
            </button>
          )}
          numbersArr={numbersArr}
        /> 
      </div>
    </div>
  )
  
}