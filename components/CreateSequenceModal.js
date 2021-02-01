import React from 'react'
import { useAlert } from './Alert'
import SequenceCreator from './SequenceCreator'

const defaultTrigger = (
  <button className="btn-small border">
    Nueva secuencia
  </button>
)

export default function CreateSequenceModal({trigger = defaultTrigger}) {

  const { alert, closeAlert } = useAlert()

  const content = (
    <div className="mt-6 max-w-xxs mx-auto">
      <SequenceCreator onSequenceCreated={closeAlert}>
        {saveButton => (
          <div className="h-11 mt-8 w-full">
            <div className="flex justify-right flex-row-reverse absolute right-5">
              {saveButton}
              <button
                className="btn border mr-4"
                onClick={closeAlert}
                tabIndex="4"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </SequenceCreator>
    </div>
  ) 

  const openNewSequenceModal = () => {
    alert({
      title: 'Nueva secuencia',
      content,
    })
  }

  return React.cloneElement(trigger, {onClick: openNewSequenceModal})
}