import React from 'react'
import { useAlert } from '../Alert'
import { getStatistics } from '../../lib/utils'

const DatesList = ({datesData}) => (
  <div className="mt-6 max-w-xxs mx-auto">
    {datesData.map(({date, quantity}) => (
      <div key={date} className="my-2">
        <span className="opacity-70">{date}</span>
        <span className="mx-3">-</span>
        {quantity} llamadas
      </div>
    ))}
  </div>
)

export default function StatisticsModal({ trigger, numbersArr }) {
  
  const { alert } = useAlert()
   
  const openStatistics = () => {
    const datesData = getStatistics(numbersArr)
    alert({
      title: 'Llamadas realizadas por día',
      desc: <DatesList datesData={datesData}/>
    })
  }
  
  return React.cloneElement(trigger, {onClick: openStatistics})
}