import Link from 'next/link'
import ExportNumbers from '../components/ExportNumbers'
import SequenceManager from '../components/SequenceManager'
import ShowDates from '../components/ShowDates'

const IconBack = () => (
  <Link href="/">
    <a className="flex-shrink-0">
      <img
        className="w-8"
        src="/icons/arrow-left.svg"
      />
    </a>
  </Link>
)

export default function Advanced() {

  const topBar = (
    <div className="flex space-x-5 items-center pt-10 mb-8">
      <IconBack/>
      <div className="text-2xl">
        Opciones avanzadas
      </div>
    </div>
  )

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      
      {topBar}

      <div>
        <SequenceManager/>
      </div>
      <hr className="my-10"/>
      <div>
        <ShowDates/>
      </div>
      <hr className="my-10"/>
      <div>
        <ExportNumbers/>
      </div>
    </div>
  )
}