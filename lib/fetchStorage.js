export default function fetchStorage(key) {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch(err) {
    return value
  }
}