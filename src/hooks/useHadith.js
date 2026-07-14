import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://sunnah.amanahagent.cloud/api/v1'
const API_KEY = import.meta.env.VITE_API_KEY

const headers = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json',
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function useHadith() {
  const [hadiths, setHadiths] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHadiths = async () => {
    setLoading(true)
    setError(null)
    try {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const results = []

      for (const num of numbers) {
        try {
          const response = await axios.get(`${BASE_URL}/hadith/bukhari:${num}`, { headers })
          results.push({
            ...response.data,
            id: `hadith-${num}`,
            isFromApi: true,
          })
          await delay(1000)
        } catch (err) {
          console.error(`Gagal mengambil hadits ke-${num}:`, err.message)
        }
      }

      if (results.length === 0) {
        setError('Gagal mengambil semua hadits. Server sedang sibuk, coba lagi nanti.')
      } else {
        setHadiths(results)
      }
    } catch (err) {
      setError('Gagal mengambil data hadits. Periksa koneksi internet atau API Key.')
      console.error('Error fetching hadiths:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHadiths()
  }, [])

  return { hadiths, loading, error, refetch: fetchHadiths }
}

export async function searchHadith(query) {
  try {
    const response = await axios.post(
      `${BASE_URL}/search`,
      { q: query, type: 'hadith', limit: 10 },
      { headers }
    )
    return response.data.results || []
  } catch (err) {
    console.error('Error searching hadith:', err)
    throw err
  }
}

export async function fetchHadithByKey(key) {
  try {
    const response = await axios.get(`${BASE_URL}/hadith/${key}`, { headers })
    return { ...response.data, id: key, isFromApi: true }
  } catch (err) {
    console.error('Error fetching single hadith:', err)
    throw err
  }
}

export async function fetchCollectionHadiths(collection, limit = 10) {
  try {
    const results = []
    for (let i = 1; i <= limit; i++) {
      try {
        const response = await axios.get(`${BASE_URL}/hadith/${collection}:${i}`, { headers })
        results.push({
          ...response.data,
          id: `${collection}-${i}`,
          isFromApi: true,
        })
        await delay(1000)
      } catch (err) {
        console.error(`Gagal mengambil hadits ${collection}:${i}:`, err.message)
      }
    }
    return results
  } catch (err) {
    console.error('Error fetching collection hadiths:', err)
    throw err
  }
}