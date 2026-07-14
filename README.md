ISLAMIC KNOWLEDGE APP
==================================

Aplikasi React JS untuk menampilkan hadits dari Islamic Knowledge API 
dengan fitur pencarian, filter koleksi, catatan pribadi, dan tampilan 
responsif menggunakan Bootstrap 5 bertema Islami.


LIVE DEMO
=========
[https://islamic-knowledge.netlify.app](https://islamic-knowledge.netlify.app/)


API YANG DIGUNAKAN
==================
Islamic Knowledge API
Dokumentasi: https://sunnah.amanahagent.cloud/developers
Base URL: https://sunnah.amanahagent.cloud/api/v1
Authentication: X-API-Key header


FITUR UTAMA
===========

1. HOME PAGE
   - Menampilkan 10 hadits pertama dari Shahih Bukhari
   - Form tambah catatan pribadi user
   - Edit catatan yang sudah ditambahkan
   - Hapus catatan dari daftar lokal
   - Indikator visual badge untuk hadits API vs catatan user
   - Tombol Refresh Hadits

2. CARI HADITS PAGE
   - Pencarian hadits berdasarkan kata kunci (POST /search)
   - Filter berdasarkan koleksi hadits:
     * Sahih al-Bukhari
     * Sahih Muslim
     * Sunan Abu Dawud
     * Jami at-Tirmidzi
     * Sunan an-Nasa'i
     * Sunan Ibnu Majah
   - Tampilan hasil pencarian dalam grid card

3. DETAIL PAGE
   - Menampilkan teks Arab lengkap
   - Menampilkan terjemahan Indonesia
   - Menampilkan derajat hadits (Sahih, Hasan, Dhaif)
   - Menampilkan kitab, nomor hadits, dan bab
   - Tombol kembali ke Home

4. CRUD CATATAN PRIBADI
   - Create: Form input dengan validasi
   - Read: Catatan ditampilkan di halaman Home
   - Update: Edit catatan yang sudah ditambahkan
   - Delete: Hapus catatan dengan konfirmasi

5. VALIDASI FORM
   - Input tidak boleh kosong
   - Input minimal 5 karakter
   - Input maksimal 500 karakter
   - Pesan error dalam Alert Bootstrap
   - Penghitung karakter real-time

6. RESPONSIF
   - Bootstrap 5 Grid System
   - Tampilan optimal di mobile, tablet, desktop
   - Navbar hamburger menu di layar kecil

7. TEMA ISLAMI
   - Warna hijau tua (#1a5e3a)
   - Aksen emas (#c9a84c)
   - Background krem (#f5f0e8)
   - Font Arabic untuk teks Arab


STRUKTUR HALAMAN DAN ROUTING
=============================

Halaman       | Path            | Komponen         | Deskripsi
--------------|-----------------|------------------|---------------------------
Home          | /               | HomePage.jsx     | Hadits + catatan pribadi
Cari Hadits   | /filter         | FilterPage.jsx   | Pencarian & koleksi
Detail        | /detail/:id     | DetailPage.jsx   | Detail satu hadits


CARA MENJALANKAN SECARA LOKAL
==============================

Prasyarat:
- Node.js versi 16 atau lebih baru
- npm versi 8 atau lebih baru

Langkah-langkah:

1. Clone repository
   git clone https:[//github.com/akilzed/islamic-knowledge.git](https://github.com/akilzed/islamic-knowledge.git)
   cd islamic-knowledge-uas

2. Install dependensi
   npm install

3. Buat file .env
   Copy .env.example ke .env
   Isi VITE_API_KEY dengan API key yang valid

4. Jalankan development server
   npm run dev

5. Buka browser
   http://localhost:5173


BUILD PRODUCTION
================

npm run build


DEPLOY KE NETLIFY VIA CLI
=========================

1. Install Netlify CLI
   npm install -g netlify-cli

2. Login
   netlify login

3. Inisialisasi
   netlify init

4. Deploy
   netlify deploy --prod


IDENTITAS
=========

Nama           : Akil
NIM            : 2405010004
Mata Kuliah    : Kerangka Kerja Pengembangan Antarmuka Website (KKPAW)
Tugas          : UAS Semester Genap 


(C) 2026 - Akil
