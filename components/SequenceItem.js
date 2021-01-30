import Link from 'next/link'
import DeleteSequence from './DeleteSequence'

export default function SequenceItem({ sequenceId, range, onDelete }) {
  
  const legibleRange = range ? (
    <div className="text-center md:text-left md:flex md:space-x-3">
      <div>{range.from}</div><div>&ndash;</div><div>{range.to}</div>
    </div>
  ) : null

  return(
    <div className="flex w-full items-center justify-end rounded-lg my-3 bg-gray-100 py-2 px-4">
      <div className="mr-auto">{legibleRange}</div>
      <Link href={`/${sequenceId}`}>
        <a className="ml-4 mr-2">
          <button className="btn-small border">
            Continuar
          </button>
        </a>
      </Link>
      <DeleteSequence onDelete={onDelete}/>
    </div>
  )
}