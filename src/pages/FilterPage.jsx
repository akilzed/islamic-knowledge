import { useState } from 'react'
import { searchHadith, fetchCollectionHadiths } from '../hooks/useHadith'
import HadithCard from '../components/HadithCard'

const collections = [
  { key: 'bukhari', label: 'Sahih al-Bukhari' },
  { key: 'muslim', label: 'Sahih Muslim' },
  { key: 'abudawud', label: 'Sunan Abu Dawud' },
  { key: 'tirmidzi', label: 'Jami at-Tirmidzi' },
  { key: 'nasai', label: 'Sunan an-Nasa\'i' },
  { key: 'ibnmajah', label: 'Sunan Ibnu Majah' },
]

export default function FilterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)
    setSelectedCollection('')

    try {
      const data = await searchHadith(searchQuery.trim())
      const formattedResults = data.map((item, index) => ({
        ...item,
        id: `search-${index}-${Date.now()}`,
        isFromApi: true,
        hadith_number: item.hadith_key?.split(':')[1] || index + 1,
        collection_name: item.collection_name || 'Hasil Pencarian',
        text_indonesian: item.text_indonesian || '',
        text_arabic: item.text_arabic || '',
        grades: item.grades || [],
        section_name: item.collection_name || '',
      }))
      setResults(formattedResults)
    } catch (err) {
      setError('Gagal mencari hadits. Silakan coba lagi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCollectionSelect = async (collectionKey) => {
    setSelectedCollection(collectionKey)
    setSearchQuery('')
    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const data = await fetchCollectionHadiths(collectionKey, 10)
      setResults(data)
    } catch (err) {
      setError('Gagal memuat koleksi hadits.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold" style={{ color: 'var(--islamic-green)' }}>🔍 Cari Hadits</h1>
        <p className="lead text-muted">Cari hadits berdasarkan kata kunci atau pilih koleksi</p>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-8">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Cari kata kunci hadits... (contoh: shalat, puasa, zakat)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-gold" onClick={handleSearch}>
              🔍 Cari
            </button>
          </div>
        </div>
      </div>

      {/* Collection Buttons */}
      <div className="text-center mb-5">
        <p className="fw-semibold text-muted mb-3">Atau pilih koleksi hadits:</p>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {collections.map(col => (
            <button
              key={col.key}
              className={`btn rounded-pill fw-semibold ${
                selectedCollection === col.key ? 'btn-gold' : 'btn-outline-success'
              }`}
              onClick={() => handleCollectionSelect(col.key)}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Mencari hadits...</p>
        </div>
      )}

      {/* Empty Result */}
      {!loading && !error && searched && results.length === 0 && (
        <div className="text-center py-5">
          <h2 className="text-muted">🔎</h2>
          <p className="text-muted fs-5">Tidak ada hadits yang ditemukan.</p>
          <button className="btn btn-outline-success rounded-pill" onClick={() => { setSearchQuery(''); setSelectedCollection(''); setSearched(false); }}>
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <>
          <div className="text-center mb-4">
            <span className="badge bg-success fs-6 rounded-pill px-4 py-2">
              Ditemukan {results.length} hadits
            </span>
          </div>
          <div className="row g-4">
            {results.map((hadith) => (
              <HadithCard key={hadith.id} hadith={hadith} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}