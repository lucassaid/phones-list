import { useState } from 'react'

const activities = [
  {
    buttonLabel: 'Hiking',
    message: 'Hiking is fun'
  },
  {
    buttonLabel: 'Nature',
    message: 'Nature is fun too'
  }
]

const Container = () => {

  // el contenedor tiene el estado
  const [visibleMessage, setVisibleMessage] = useState(null)

  const buttonClicked = index => {
    setVisibleMessage(activities[index].message)
  } 

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: 100}}>
        {activities.map((activity, index) => (
            <button onClick={() => buttonClicked(index)}>
              {activity.buttonLabel}
            </button>
          )
        )}
      </div>
      <div>
        {visibleMessage}
      </div>
    </div>
  )
}

export default function Prueba() {
  return (
    <Container/>
  )
}