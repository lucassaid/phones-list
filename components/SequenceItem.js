import Link from 'next/link'

export default function SequenceItem({ sequenceId, range }) {
  
  const legibleRange = range ? `${range.from} - ${range.to}` : ' '

  return(
    <Link href={`/${sequenceId}`}>
      <a className="flex items-center max-w-max rounded-lg my-3 bg-gray-100 py-3 px-4">
        <img
          className="h-4 opacity-60 mr-3"
          src="/icons/arrow-right.svg"
        />
        {legibleRange}
      </a>
    </Link>
  )
}