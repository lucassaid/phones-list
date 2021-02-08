import React from 'react'
import { useAlert } from '../Alert'

const defaultTrigger = (
  <button className="btn-small border">
    Estadísticas
  </button>
)

export default function StatisticsModal({trigger = defaultTrigger, calledData}) {

  const { alert, closeAlert } = useAlert()

  const content = (
    <div className="mt-6 max-w-xxs w-full">
      {
        calledData.existenceDates.map( row => {                
          return (
            <div style={{marginTop: 10, }} className="flex justify-between ">
              <div> Día {row}: </div>  <div> {calledData.allDates[row]} llamadas </div>
            </div>
          )
        })
      }
    </div>
  ) 

  const openStatistics = () => {
    alert({
      title: ' Llamadas realizadas ordenadas por fecha',
      content,
    })
  }

  return React.cloneElement(trigger, {onClick: openStatistics})
}