import { useState, useEffect } from 'react'

export default function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingNote) {
      setText(editingNote.text)
    } else {
      setText('')
    }
    setErrors({})
  }, [editingNote])

  const validate = (value) => {
    const newErrors = {}
    const trimmed = value.trim()

    if (!trimmed) {
      newErrors.empty = 'Catatan tidak boleh kosong!'
    } else {
      if (trimmed.length < 5) {
        newErrors.minLength = 'Minimal 5 karakter!'
      }
      if (trimmed.length > 500) {
        newErrors.maxLength = 'Maksimal 500 karakter!'
      }
    }
    return newErrors
  }

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
    if (Object.keys(errors).length > 0) {
      setErrors(validate(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(text)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(text.trim())
      setText('')
      setErrors({})
    }
  }

  const handleCancel = () => {
    setText('')
    setErrors({})
    if (onCancel) onCancel()
  }

  const charCount = text.length
  const isOverLimit = charCount > 500
  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3" style={{ color: 'var(--islamic-green)' }}>
          {editingNote ? '✏️ Edit Catatan' : '📝 Tambah Catatan Pribadi'}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="noteInput" className="form-label fw-semibold">
              Tulis catatan atau pengingat terkait hadits
            </label>
            <textarea
              id="noteInput"
              className={`form-control ${hasErrors || isOverLimit ? 'is-invalid' : ''}`}
              value={text}
              onChange={handleChange}
              placeholder="Contoh: Hadits ini mengingatkanku untuk selalu bersyukur setiap pagi..."
              rows="4"
            ></textarea>

            {errors.empty && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.empty}
              </div>
            )}
            {errors.minLength && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.minLength}
              </div>
            )}
            {errors.maxLength && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.maxLength}
              </div>
            )}

            <div className="d-flex justify-content-between mt-1">
              <div></div>
              <small className={isOverLimit ? 'text-danger fw-bold' : 'text-muted'}>
                {charCount}/500
              </small>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-gold">
              {editingNote ? '💾 Simpan Perubahan' : '➕ Tambah Catatan'}
            </button>
            {editingNote && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}