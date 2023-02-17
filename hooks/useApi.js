import { useState, useEffect } from "react"

export default function useApi(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getStudents = () => {
      setLoading(true)
      setError(null)
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }

    getStudents()
  }, [url])

  return {
    data,
    isLoading: loading && !error,
    isError: error && !loading,
  }
}
