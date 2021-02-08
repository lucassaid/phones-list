import Link from 'next/link'

const WheelIcon = ({back}) =>  (
  <Link href={`/advanced${back}`}>
    <a className="p-2">
      <div className="text-right opacity-70">
        <img
          className="w-6"
          src="/icons/gear.svg"
        />
      </div>
    </a>
  </Link>
)

export default function Layout({topBar, children, path, hideSettingsButton}) {

  const justify = topBar ? 'justify-between' : 'justify-end'

  return (
    <main className="py-10">
      <div className={`container mb-7 flex space-x-3 items-center ${justify}`}>
        {topBar}
        {console.log( <WheelIcon back={path ? `?b=${path}` : ''}/>)}
        {!hideSettingsButton ? (
          <WheelIcon back={path ? `?b=${path}` : ''}/>
        ) : null}
      </div>
      {children}
    </main>
  )
}