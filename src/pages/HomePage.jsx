import { useState } from 'react'
import { useHadith } from '../hooks/useHadith'
import HadithCard from '../components/HadithCard'
import NoteForm from '../components/NoteForm'

export default function HomePage() {
  const { hadiths, loading, error, refetch } = useHadith()
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)

  const handleAddNote = (noteText) => {
    const newNote = {
      id: `note-${Date.now()}`,
      text: noteText,
      createdAt: new Date().toISOString(),
      isNote: true,
    }
    setNotes(prev => [newNote, ...prev])
  }

  const handleEditNote = (updatedText) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === editingNote.id
          ? { ...note, text: updatedText }
          : note
      )
    )
    setEditingNote(null)
  }

  const handleDeleteNote = (id) => {
    if (window.confirm('Yakin ingin menghapus catatan ini?')) {
      setNotes(prev => prev.filter(note => note.id !== id))
      if (editingNote?.id === id) setEditingNote(null)
    }
  }

  const handleStartEdit = (note) => {
    setEditingNote(note)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
  }

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="hero-islamic text-white rounded-4 p-5 mb-5 text-center">
        <h1 className="display-4 fw-bold mb-2">☪️ Islamic Knowledge</h1>
        <p className="lead mb-0">
          Kumpulan hadits dari berbagai koleksi &mdash; Shahih Bukhari, Muslim, dan lainnya
        </p>
      </div>

      {/* Note Form Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8">
          <NoteForm
            onSubmit={editingNote ? handleEditNote : handleAddNote}
            editingNote={editingNote}
            onCancel={handleCancelEdit}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className="fw-semibold text-muted">
            Hadits API: <span style={{ color: 'var(--islamic-green)' }} className="fw-bold fs-5">{hadiths.length}</span>
          </span>
          {notes.length > 0 && (
            <span className="badge badge-note ms-2 rounded-pill">
              {notes.length} catatan pribadi
            </span>
          )}
        </div>
        <button className="btn btn-outline-gold btn-sm rounded-pill" onClick={refetch}>
          🔄 Refresh Hadits
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Memuat hadits dari API...</p>
        </div>
      )}

      {/* Content Grid */}
      {!loading && (
        <div className="row g-4">
          {/* Notes Section */}
          {notes.length > 0 && (
            <>
              <div className="col-12">
                <h4 className="mb-0" style={{ color: 'var(--islamic-green)' }}>
                  📝 Catatan Pribadi
                </h4>
                <hr />
              </div>
              {notes.map((note) => (
                <HadithCard
                  key={note.id}
                  hadith={note}
                  isNote={true}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteNote}
                />
              ))}
              <div className="col-12">
                <h4 className="mb-0 mt-3" style={{ color: 'var(--islamic-green)' }}>
                  📖 Hadits Shahih Bukhari
                </h4>
                <hr />
              </div>
            </>
          )}

          {/* Hadith Cards */}
          {hadiths.map((hadith) => (
            <HadithCard key={hadith.id} hadith={hadith} />
          ))}

          {/* Empty State */}
          {!error && hadiths.length === 0 && notes.length === 0 && (
            <div className="col-12 text-center py-5">
              <h2 className="text-muted">☪️</h2>
              <p className="text-muted fs-5">Belum ada hadits. Klik Refresh untuk memuat ulang.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}