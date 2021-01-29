import IconBack from './IconBack'

export default function BackAndPageName({title, backPath}) {
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