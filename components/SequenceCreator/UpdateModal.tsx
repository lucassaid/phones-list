import React, { useEffect } from 'react'
import { useAlert } from '../Alert'

export default function UpdateModal() {

  const { alert, closeAlert } = useAlert()

  useEffect(() => {
    console.log(localStorage)
    let existsViewUpdate = localStorage.getItem('0.4-release-notes-displayed')
    if(!existsViewUpdate) {
      alert({
        title: 'Nueva actualización agregada:',
        content,
      }), 
      localStorage.setItem('0.4-release-notes-displayed', 'true')
    }
  }, [] );

  const content = (
    <div className="mt-6 max-w-xxs mx-auto">
      <p>Ahora al tocar el botón "Llamar", el número se tacha automáticamente.</p>
      <div className="mt-8 text-center">
        <button
          onClick={closeAlert}
          className="btn btn-primary"
        >
          Aceptar
        </button>
      </div>
    </div>
  ) 

  return (<></>)
}