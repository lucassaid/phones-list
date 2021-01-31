export default function debounce(func, wait) {
  let timer = null

  return (...args) => {
    clearTimeout(timer)
    return new Promise(res => {
      timer = setTimeout(
        () => res(func(...args)),
        wait,
      )
    })
  }
}