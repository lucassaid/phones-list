import { useMemo } from 'react'
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
      <div className="max-w-lg w-full mx-auto bg-blue-500 h-9 text-white flex items-center justify-center md:rounded-t-lg">
        Avance: {calledNumbers} de {numbersArr.length}
      </div>
    </div>
  )
}