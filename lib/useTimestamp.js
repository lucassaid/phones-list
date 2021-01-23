
export default function useTimestamp() {

  const getDate = timestamp => {
    const d = new Date(timestamp.toDate())
    return d.toLocaleDateString()
  }

  return { getDate }
}