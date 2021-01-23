export default function fetchStorage(key) {
  console.log('fetching', key, localStorage.getItem(key))
  return localStorage.getItem(key)
}