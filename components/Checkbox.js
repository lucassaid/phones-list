const Checkbox =({onChange, defaultChecked, label}) => (
  <div>
    <label className="select-none cursor-pointer opacity-80">
      <input
        className="transform cursor-pointer scale-150 ml-1 mr-4 mb-5"
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      {label}
    </label>
  </div>
)
export default Checkbox