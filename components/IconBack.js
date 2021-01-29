import Link from 'next/link'

const IconBack = ({href = '/'}) => (
  <Link href={href}>
    <a className="flex-shrink-0 p-1">
      <img
        className="w-8"
        src="/icons/arrow-left.svg"
      />
    </a>
  </Link>
)
export default IconBack