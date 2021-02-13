import React from 'react'
import { useAlert } from '../Alert'
import { getStatistics } from '../../lib/utils'

const defaultTrigger = (
  <button className="btn-small border">
    Estadísticas
  </button>
)

const ModalContent = ({datesData, children}) => (
  <div className="mt-6">
    {datesData.existenceDates.map(date => (
        <div key={date} className="my-2">
          <span className="opacity-70">{date}</span>
          <span className="mx-3">-</span>
          {datesData.allDates[date]} llamadas
        </div>
      )
    )}
    {children}
  </div>
)

export default function StatisticsModal({trigger = defaultTrigger, numbersArr, }) {
  
  const { alert, closeAlert } = useAlert()
   
  const openStatistics = () => {
    const datesData = getStatistics(numbersArr)
    alert({
      title: 'Llamadas realizadas ordenadas por fecha',
      content: (
        <ModalContent datesData={datesData}>
          <div className="text-right mt-4">
            <button
              className="btn btn-primary"
              onClick={closeAlert}
              tabIndex="4"
            >
              Ok
            </button>
          </div>
        </ModalContent>   
      )
    })
  }

  return React.cloneElement(trigger,  {onClick: openStatistics})
}