const Modal = ({title, desc, content, onAccept}) => (
  <div className="w-11/12 z-20 max-w-md rounded-lg bg-white p-5 relative">
    
    <div className="text-center text-xl">
      {title}
    </div>

    {desc}

    {content}

    {!content && (
      <div className="mt-8 text-center">
        <button
          onClick={onAccept}
          className="btn btn-primary"
        >
          Aceptar
        </button>
      </div>
    )}
  </div>
)
export default Modal