export default function fetchStorage(key: string): any {
  const value = localStorage.getItem(key)
  try {
    return value && JSON.parse(value)
  } catch(err) {
    return value
  }
}