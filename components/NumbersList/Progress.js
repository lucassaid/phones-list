import { useMemo } from 'react'

export default function Progress({numbersArr}) {

  const calledNumbers = useMemo(() => {
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