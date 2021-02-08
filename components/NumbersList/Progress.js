import { useMemo } from 'react'
import useTimestamp from '../../lib/useTimestamp'
import StatisticsModal from './StatisticsModal'

const { getDate } = useTimestamp()

//initializing variables
let calledDates = []
let existenceDates = []
let allDates = {}
let date 

export default function Progress({numbersArr}) {

  const calledNumbers = useMemo(() => {
    return numbersArr.filter(number => number.called).length
  }, [numbersArr])

  const calledData = useMemo(() => {
    
    //rebooting variables
    existenceDates= []
    allDates= {}
    
    calledDates = numbersArr.filter(number => number.calledAt && number.called)
    
    calledDates.map( row => {   

      date = existenceDates.indexOf( getDate(row.calledAt) )

      if( date == -1){

        existenceDates.push(getDate(row.calledAt))

        allDates[getDate(row.calledAt)]  =  1     

      }   else  {

        allDates[getDate(row.calledAt)] =  allDates[getDate(row.calledAt)] + 1

      }
      
      //ordering dates
      existenceDates.sort()
     
    })
    
    return { allDates,  existenceDates }
    
  }, [numbersArr])

  const seeStatistics = (
    
    <button style={{display: 'flex'}} className="btn border items-center">
     
      <span>
      
        Ver estadísticas
      
      </span>
    
    </button>
  )

  return (
    
    <div className="fixed w-full bottom-0 left-0">
      
      <div className="max-w-lg w-full mx-auto bg-blue-500 h-15 text-white flex flex-col items-center justify-center md:rounded-t-lg">
      
        Avance: {calledNumbers} de {numbersArr.length}  

        <div className="pt-4">
        
          <StatisticsModal trigger={seeStatistics} calledData={calledData}/>
        
        </div>
      
      </div>
            
    </div>
  )
  
}