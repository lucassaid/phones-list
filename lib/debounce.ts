export default function debounce<T>(func: (...args: any) => any, wait: number) {
  let timer: any = null

  return (...args: any): Promise<T> => {
    clearTimeout(timer)
    return new Promise(res => {
      timer = setTimeout(
        () => res(func(...args)),
        wait,
      )
    })
  }
}