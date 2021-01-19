import Head from 'next/head'
import { useRecoilState, useRecoilValue } from 'recoil'
import NumbersList from '../components/NumbersList'
import SetNumbersRange from '../components/SetNumbersRange'
import numbersState, { numbersSelector } from '../atoms/numbers'

export default function Home() {

  const numbers = useRecoilValue(numbersSelector)

  const [, setNumbers] = useRecoilState(numbersState)

  const handleAddNumbers = numbers => {
    setNumbers(numbers)
  }

  const deleteNumbers = () => {
    const result = confirm('¿Borrar todos los números?')
    if(result) {
      setNumbers({})
    }
  }

  const actions = (
    <div className="text-right mt-10 mb-7">
      <button
        onClick={deleteNumbers}
      >
        Borrar todos los números
      </button>
    </div>
  )

  return (
    <div>
      <Head>
        <title>Lista de números</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 max-w-lg mx-auto">
        {numbers.length == 0 ? (
          <SetNumbersRange onAddNumbers={handleAddNumbers} />
        ) : (
          <>
            {actions}
            <h3 className="text-2xl ">Teléfonos</h3>
            <div className="text-sm opacity-70 mb-4">
              Toque un teléfono para marcarlo como "llamado"
            </div>
            <NumbersList numbers={numbers} />
          </>
        )}

      </main>
    </div>
  )
}
