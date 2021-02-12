import { useMemo } from 'react'
import StatisticsModal from './StatisticsModal'

export default function Progress({numbersArr}) {

  const calledNumbers = useMemo(() => {
    return numbersArr.filter(number => number.called).length
  }, [numbersArr])

  const seeStatistics = (
    <button style={{display: 'flex'}} className="btn border items-center"  >
      <span>
        Ver estadísticas
      </span>
    </button>
  )

  return (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-lg w-full mx-auto bg-blue-500 h-15 text-white flex flex-col items-center justify-center md:rounded-t-lg">
        Avance: {calledNumbers} de {numbersArr.length}  
        <div className="pt-4" >
          <StatisticsModal trigger={seeStatistics} numbersArr={numbersArr}  /> 
        </div>
      </div>
    </div>
  )
  
}