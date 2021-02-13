import React from 'react'
import { useAlert } from '../Alert'
import { getStatistics } from '../../lib/utils'

const defaultTrigger = (
  <button className="btn-small border">
    Estadísticas
  </button>
)

const DatesList = ({datesData}) => (
  <div className="mt-6">
    {datesData.existenceDates.map(date => (
        <div key={date} className="my-2">
          <span className="opacity-70">{date}</span>
          <span className="mx-3">-</span>
          {datesData.allDates[date]} llamadas
        </div>
      )
    )}
  </div>
)

export default function StatisticsModal({trigger = defaultTrigger, numbersArr, }) {
  
  const { alert, closeAlert } = useAlert()
   
  const openStatistics = () => {
    const datesData = getStatistics(numbersArr)
    alert({
      title: 'Llamadas realizadas ordenadas por fecha',
      content: (
        <>
          {datesData.existenceDates.length ? (
            <DatesList datesData={datesData}/>
          ) : (
            <div className="opacity-60 text-center mt-4">
              No hay llamadas realizadas
            </div>
          )}
          <div className="text-right mt-4">
            <button
              className="btn btn-primary"
              onClick={closeAlert}
              tabIndex="4"
            >
              Ok
            </button>
          </div>
        </>
      )
    })
  }

  return React.cloneElement(trigger,  {onClick: openStatistics})
}