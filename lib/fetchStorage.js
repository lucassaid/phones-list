export default function fetchStorage(key) {
  const value = localStorage.getItem(key)
  console.log("FETCH STORAGE", value)
  try {
    return JSON.parse(value)
  } catch(err) {
    return value
  }
}