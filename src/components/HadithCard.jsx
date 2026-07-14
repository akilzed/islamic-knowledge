import { Link } from 'react-router-dom'

export default function HadithCard({ hadith, isNote = false, onEdit, onDelete }) {
  if (isNote) {
    return (
      <div className="col-12 col-md-6">
        <div className="card note-card h-100 shadow-sm">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
              <span className="badge badge-note rounded-pill">
                📝 Catatan Pribadi
              </span>
            </div>
            <p className="card-text text-muted flex-grow-1 mb-3" style={{ lineHeight: '1.7' }}>
              {hadith.text}
            </p>
            <small className="text-muted mb-2">
              {new Date(hadith.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </small>
            <div className="d-flex gap-2 pt-2 border-top">
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => onEdit(hadith)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(hadith.id)}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const grade = hadith.grades && hadith.grades[0]
  const gradeText = grade ? grade.grade : 'Tidak diketahui'

  return (
    <div className="col-12 col-md-6">
      <div className="card hadith-card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-api rounded-pill">
                {hadith.collection_name || 'Hadits'}
              </span>
              <span className="badge bg-success rounded-pill">
                {gradeText}
              </span>
            </div>
            <small className="text-muted">
              No. {hadith.hadith_number}
            </small>
          </div>

          {hadith.text_arabic && (
            <p className="arabic-text text-muted mb-3">
              {hadith.text_arabic.length > 150
                ? hadith.text_arabic.substring(0, 150) + '...'
                : hadith.text_arabic}
            </p>
          )}

          <p className="card-text text-muted flex-grow-1 mb-3" style={{ lineHeight: '1.7' }}>
            {hadith.text_indonesian
              ? hadith.text_indonesian.length > 200
                ? hadith.text_indonesian.substring(0, 200) + '...'
                : hadith.text_indonesian
              : 'Tidak ada terjemahan'}
          </p>

          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <small className="text-muted">
              📖 {hadith.section_name || hadith.collection_name}
            </small>
            <Link
              to={`/detail/${hadith.id}`}
              state={{ hadith }}
              className="btn btn-sm btn-outline-gold"
            >
              📖 Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}