import React from 'react'
import { useAlert } from '../Alert'
import { getStatistics } from '../../lib/utils'
import { useState } from 'react'

const defaultTrigger = (
  <button className="btn-small border">
    Estadísticas
  </button>
)

export default function StatisticsModal({trigger = defaultTrigger, numbersArr, }) {
  
  const [queryData, setQueryData] = useState(queryData)

  const calledData = (numbersArr) => {
    let datesData = getStatistics(numbersArr)
    console.log(datesData)
    return { datesData }
  }

  const { alert, closeAlert } = useAlert()
   
  const openStatistics = () => {
    setQueryData ( calledData(numbersArr) )
    console.log(setQueryData)
    console.log(queryData)
    console.log(alert)
  }
  
  let content = (
    <div className="mt-6 max-w-xxs w-full">
      {
        queryData &&              
        queryData.datesData.existenceDates.map( row => {    
        console.log(queryData)            
          return (
            <div style={{marginTop: 10 }} className="flex justify-between ">
              <div> Día {row}: </div>  <div> {queryData.datesData.allDates[row]} llamadas </div>
            </div>
          )
        })
      }
      <div className="flex justify-right flex-row-reverse absolute right-5">
        <button
          className="btn btn-primary -mr-2 -mt-7"
          onClick={closeAlert}
          tabIndex="4"
        >
          Ok
        </button>
      </div>
    </div>
  ) 

  if(queryData) {
    alert({
      title: 'Llamadas realizadas ordenadas por fecha',
      content,  
    })
    setQueryData (false)
  } 

  return React.cloneElement(trigger,  {onClick: openStatistics})
}