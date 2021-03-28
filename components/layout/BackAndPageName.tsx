import IconBack from './IconBack'

interface BackAndPageNameProps {
  title?: string,
  backPath?: string
}

export default function BackAndPageName({title, backPath}: BackAndPageNameProps) {
  return (
    <div className="flex space-x-4 items-center">
      <IconBack href={backPath}/>
      <div>
        <div className="text-2xl">
          {title}
        </div>
      </div>
    </div>
  )
}