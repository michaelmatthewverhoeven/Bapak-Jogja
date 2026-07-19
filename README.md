# Visit Jogja

Struktur proyek:

- `index.html` halaman utama.
- `css/style.css` seluruh tampilan dan animasi.
- `js/data.js` basis data lokal wisata, hotel, kuliner, anggaran, dan panduan Jogja.
- `js/ai.js` mesin chatbot Bapak Jogja.
- `js/app.js` penghubung antarmuka, pencarian, animasi, dan panel chat.
- `assets/` seluruh gambar lokal.

## Menjalankan

Klik dua kali `index.html`. Semua file memakai jalur relatif dan langsung terhubung.

Untuk pengujian melalui server lokal:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Catatan AI

Chatbot saat ini merupakan AI lokal berbasis aturan dan data. Ia tidak mengirim data pengguna ke layanan eksternal. Untuk data real-time atau model generatif, tambahkan backend dan simpan kunci API di server, bukan di JavaScript browser.
