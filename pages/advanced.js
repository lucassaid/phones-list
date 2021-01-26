import Link from 'next/link'
import ExportNumbers from '../components/ExportNumbers'
import SequenceManager from '../components/SequenceManager'
import ShowDates from '../components/ShowDates'
import ShowProgress from '../components/ShowProgress'

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
    <div className="container">
      {topBar}
      <SequenceManager/>
      <hr className="my-10"/>
      <ShowDates/>
      <ShowProgress/>
      <hr className="my-10"/>
      <ExportNumbers/>
    </div>
  )
}