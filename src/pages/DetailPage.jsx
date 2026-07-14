import { useLocation, useParams, Link } from 'react-router-dom'

export default function DetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const hadith = location.state?.hadith || null

  if (!hadith) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block px-5 py-4 rounded-4 shadow-sm">
          <h4 className="alert-heading">Hadits Tidak Ditemukan!</h4>
          <p className="mb-3">Data hadits tidak tersedia.</p>
          <Link to="/" className="btn btn-gold rounded-pill fw-semibold">
            ⬅️ Kembali ke Home
          </Link>
        </div>
      </div>
    )
  }

  const grade = hadith.grades && hadith.grades[0]
  const gradeText = grade ? grade.grade : 'Tidak diketahui'
  const gradedBy = grade ? grade.graded_by : ''

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold mb-0" style={{ color: 'var(--islamic-green)' }}>
                  📖 Detail Hadits
                </h2>
                <div className="d-flex gap-2">
                  <span className="badge badge-api rounded-pill fs-6">
                    {hadith.collection_name || 'Hadits'}
                  </span>
                  <span className="badge bg-success rounded-pill fs-6">
                    {gradeText}
                  </span>
                </div>
              </div>

              {/* Arabic Text */}
              {hadith.text_arabic && (
                <div className="bg-light rounded-4 p-4 mb-4">
                  <h6 className="text-muted mb-3">Teks Arab:</h6>
                  <p className="arabic-text mb-0">{hadith.text_arabic}</p>
                </div>
              )}

              {/* Indonesian Translation */}
              {hadith.text_indonesian && (
                <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: 'var(--islamic-light)' }}>
                  <h6 className="text-muted mb-3">Terjemahan Indonesia:</h6>
                  <p className="mb-0" style={{ lineHeight: '1.9', fontSize: '1.05rem' }}>
                    {hadith.text_indonesian}
                  </p>
                </div>
              )}

              {/* Info Grid */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-success mb-1">Kitab</h6>
                    <strong className="small">{hadith.collection_name || '-'}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="rounded-3 p-3 text-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                    <h6 className="mb-1" style={{ color: 'var(--islamic-gold)' }}>No. Hadits</h6>
                    <strong>{hadith.hadith_number || '-'}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-info mb-1">Derajat</h6>
                    <strong>{gradeText}</strong>
                    {gradedBy && <small className="d-block text-muted">oleh: {gradedBy}</small>}
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="bg-secondary bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-secondary mb-1">Bab</h6>
                    <strong className="small">{hadith.section_name || '-'}</strong>
                  </div>
                </div>
              </div>

              {/* Hadith Key */}
              {hadith.hadith_key && (
                <div className="text-center mb-4">
                  <code className="bg-dark text-white px-3 py-1 rounded-pill">
                    {hadith.hadith_key}
                  </code>
                </div>
              )}

              {/* Back Button */}
              <div className="text-center">
                <Link to="/" className="btn btn-gold btn-lg rounded-pill fw-semibold px-5">
                  ⬅️ Kembali ke Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}