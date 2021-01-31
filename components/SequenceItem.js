import Link from 'next/link'
import DeleteSequenceModal from './DeleteSequenceModal'

const LegibleRange = ({range}) => (
  <div className="text-center md:text-left md:flex md:space-x-3">
    <div>{range.from}</div><div>&ndash;</div><div>{range.to}</div>
  </div>
)

export default function SequenceItem({ sequenceId, range, secondRange, onDelete }) {

  const numbers = (
    <div className="mr-auto">
      {range && <LegibleRange range={range}/>}
      {secondRange && (
        <div className="mt-2">
          <LegibleRange range={secondRange}/>
        </div>
      )}
    </div>
  )

  return(
    <div className="flex w-full items-center justify-end rounded-lg my-3 bg-gray-100 py-2 px-4">
      {numbers}
      <Link href={`/${sequenceId}`}>
        <a className="ml-4 mr-2">
          <button className="btn-small border">
            Continuar
          </button>
        </a>
      </Link>
      <DeleteSequenceModal onDelete={onDelete}/>
    </div>
  )
}