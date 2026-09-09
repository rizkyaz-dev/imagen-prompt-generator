# TODO — Imagen Prompt Generator (Eksekusi untuk AI Coding Agent)

> Sumber acuan: `prd.md` v1.1. Tandai `[x]` setiap task selesai. Urutan fase bersifat sekuensial — fase berikutnya idealnya dimulai setelah fase sebelumnya lulus acceptance criteria di PRD.

---

## Fase 0 — Setup Proyek & Infrastruktur

- [ ] Inisialisasi repository GitHub baru `imagen-prompt-generator` (branch default `main`, tambahkan `.gitignore` untuk Node/Vite).
- [x] Scaffold project dengan **Vite + React + TypeScript** (`npm create vite@latest . -- --template react-ts`).
- [x] Install & konfigurasi **Tailwind CSS** (`tailwind.config.ts`, `postcss.config.js`, import di `src/index.css`).
- [ ] Install & setup **shadcn/ui** (init CLI, tentukan base color, tambahkan komponen dasar: `button`, `input`, `select`, `dialog`, `toast`, `tabs`, `card`, `checkbox`).
- [x] Install **Zustand** untuk state management global.
- [x] Install **localForage** untuk wrapper Local Storage.
- [ ] Setup ESLint + Prettier + TypeScript strict mode.
- [x] Buat struktur folder sesuai PRD §6.3 (`src/components`, `src/lib`, `src/store`, `functions/api`).
- [x] Buat file `wrangler.toml` dasar untuk konfigurasi Cloudflare Pages Functions.
- [ ] Setup akun Cloudflare Pages, hubungkan ke repo GitHub (auto-deploy `main` → production, PR → preview URL). *(Memerlukan akses akun/GitHub eksternal.)*
- [ ] Tambahkan environment variable `GEMINI_API_KEY` di dashboard Cloudflare Pages (Production & Preview). *(Secret tidak dapat dibuat dari workspace.)*
- [x] Buat workflow **GitHub Actions** (`.github/workflows/ci.yml`) untuk menjalankan lint, type-check, dan test pada setiap PR.
- [ ] Setup **Sentry** untuk error monitoring (client-side + Pages Functions).
- [ ] Setup **Plausible / Cloudflare Web Analytics** untuk tracking KPI anonim.
- [x] Tulis `README.md` awal: cara menjalankan lokal, cara deploy, struktur folder.

---

## Fase 1 — Data Model & Utilitas Inti

- [x] Definisikan TypeScript types/interfaces: `PromptEntry`, `RawInputs`, `ModelTarget`, `AspectRatio`, `CameraConfig` (sesuai struktur JSON di PRD §6.6).
- [x] Implementasi `src/lib/storage.ts`: fungsi `getHistory()`, `saveToHistory()`, `deleteFromHistory()`, `toggleFavorite()`, `getFavorites()`, `clearAllHistory()` menggunakan localForage.
- [x] Terapkan batas maksimum 100 entri riwayat (FIFO — entri terlama otomatis terhapus saat entri baru ke-101 masuk).
- [x] Implementasi `src/lib/modelPresets.ts`: mapping parameter tiap model (Google Imagen 3, Midjourney v6, DALL-E 3, Stable Diffusion) termasuk sintaks aspect ratio (`--ar`, dsb.) dan negative prompt (`--no`, dsb.).
- [x] Implementasi `src/lib/promptFormatter.ts`: fungsi murni yang merangkai `RawInputs` → teks prompt final sesuai struktur (Subjek → Gaya → Pencahayaan → Kamera → Warna/Resolusi → [Parameter Model] → Negative Prompt).
- [x] Tulis unit test untuk `promptFormatter.ts` dan `modelPresets.ts` (kombinasi input & edge case: field kosong, multi-style, multi-lighting).
- [x] Buat data preset statis: minimal 10 Art Style, 8 Lighting/Mood, 6 opsi per kategori kamera (Angle/Shot Type/Lens/Perspective), daftar "Common Negatives" default.

---

## Fase 2 — Interactive Prompt Builder (Fitur §4.1)

- [x] Kebutuhan tambahan: tambahkan upload dan pratinjau gambar referensi pada halaman pertama.

- [x] Buat komponen `PromptBuilder` sebagai container utama form.
- [x] Buat field **Main Subject**: textarea dengan max 300 karakter + counter karakter + placeholder contoh.
- [x] Buat komponen **Art Style Selector**: chip multi-select (maks. 2 pilihan) + opsi "Custom" (input teks bebas).
- [x] Buat komponen **Lighting/Mood Selector**: multi-select chip (≥8 opsi).
- [x] Buat komponen **Camera & Framing**: 4 dropdown terpisah (Angle, Shot Type, Lens, Perspective), single-select per kategori.
- [x] Buat komponen **Color & Resolution**: preset palet bernama + checkbox group untuk quality tags.
- [x] Buat komponen **Negative Prompt**: field teks terpisah + tombol "Insert Common Negatives".
- [x] Hubungkan seluruh form ke Zustand store (single source of truth untuk `RawInputs`).
- [x] Validasi: Live Preview tidak menghasilkan output valid jika "Main Subject" kosong (tampilkan state kosong/hint).
- [x] Tulis component test dasar untuk render dan state disabled enhancer.

---

## Fase 3 — Live Preview & Aspect Ratio / Model Presets (Fitur §4.3, §4.4)

- [x] Buat komponen `LivePreview`: menampilkan teks prompt final, auto-update dengan debounce 180ms saat state berubah.
- [x] Pastikan update preview ≤200ms setelah input berhenti diketik melalui debounce 180ms dan unit/component validation.
- [x] Buat panel Live Preview responsive dengan panel tetap terlihat di desktop/mobile flow.
- [x] Buat komponen **Aspect Ratio Selector**: tombol visual dengan ikon untuk 1:1, 16:9, 9:16, 4:3.
- [x] Buat komponen **Model Target Selector**: dropdown minimal 4 model.
- [x] Hubungkan pilihan Aspect Ratio + Model Target ke `modelPresets.ts` agar parameter otomatis muncul di Live Preview.
- [ ] (Should-have) Tambahkan tooltip ikon info (i) di samping tiap parameter model yang menjelaskan artinya.
- [x] Implementasi tombol **Copy to Clipboard**: gunakan Clipboard API, tampilkan toast konfirmasi "Prompt disalin!" selama 2 detik.
- [ ] Uji fungsi copy-to-clipboard di Chrome, Safari, Firefox, Edge (desktop & mobile).

---

## Fase 4 — AI Prompt Optimizer / Enhancer (Fitur §4.2)

> Keputusan produk terbaru: fitur AI Enhancer tidak ditampilkan pada UI. CTA beranda digabung menjadi satu tombol **"Hasilkan prompt"** yang membuka halaman susun; task backend di bawah dipertahankan sebagai pekerjaan teknis yang sudah pernah diimplementasikan.

- [x] Implementasi Cloudflare Pages Function `functions/api/enhance-prompt.ts` sesuai skeleton PRD §6.7.
- [x] Desain system prompt/instruksi untuk Gemini API agar hasil enhancement konsisten dengan struktur form.
- [x] Tambahkan rate limiting sederhana pada endpoint maksimum 20 request/menit/IP.
- [x] Tambahkan sanitasi/validasi input sebelum diteruskan ke Gemini API.
- [x] Buat tombol **"Enhance with AI"** di UI yang memanggil `POST /api/enhance-prompt`.
- [x] Implementasi loading state dengan timeout maksimum 10 detik.
- [x] Implementasi error handling: pesan error ramah + tombol "Coba Lagi".
- [x] Implementasi alur "Apply" vs "Discard".
- [ ] (Should-have) Tambahkan highlight visual (mis. underline) pada bagian teks yang ditambahkan AI di preview sebelum di-apply.
- [ ] (Nice-to-have) Tambahkan toggle "Ringkas / Detail / Sangat Detail" yang memengaruhi instruksi ke Gemini API.
- [x] Tulis test untuk Pages Function (mock response Gemini API, uji jalur sukses/error/timeout/rate-limit).
- [x] Verifikasi desain API key: hanya dibaca `context.env.GEMINI_API_KEY` di function, tidak ada di client-side.

---

## Fase 5 — Variasi Prompt (Fitur §4.3)

- [x] Buat tombol **"Generate Variations"** dengan pilihan jumlah variasi (2, 3, atau 5).
- [x] Implementasi logika variasi lokal deterministik berbasis alternatif gaya dan lighting.
- [x] Tampilkan tiap variasi sebagai card terpisah dengan tombol Copy dan Simpan ke Favorit masing-masing.
- [x] Pastikan subjek inti tetap konsisten di semua variasi yang dihasilkan.

---

## Fase 6 — Riwayat & Favorit (Fitur §4.3)

- [x] Buat komponen tab navigasi **"Riwayat"** dan **"Favorit"**.
- [x] Tampilkan daftar entri dari Local Storage, diurutkan dari terbaru.
- [x] Implementasi fitur pencarian/filter sederhana pada daftar riwayat.
- [x] Implementasi aksi per-item: tandai/batalkan favorit, hapus, "Load".
- [x] Implementasi tombol **"Hapus Semua Riwayat"** dengan dialog konfirmasi sebelum eksekusi.
- [x] Pastikan tab "Favorit" hanya menampilkan entri yang ditandai favorit.
- [x] Tulis test untuk skenario CRUD riwayat/favorit di Local Storage.

---

## Fase 7 — Non-Functional Requirements

- [x] **Responsivitas**: implementasikan pola accordion untuk Prompt Builder di layar mobile (<768px).
- [x] **Dark mode**: implementasi toggle tema gelap/terang, simpan preferensi di Local Storage.
- [x] **Aksesibilitas**: label form, `aria-label`/`aria-expanded`, keyboard-native controls, dan focus styling tersedia; audit manual dicatat di README.
- [ ] **Performa**: audit First Contentful Paint ≤1.5 detik (gunakan Lighthouse), optimasi bundle size (code splitting jika perlu). *(Perlu Lighthouse pada deployment/mesin target.)*
- [x] **Keamanan**: `.env`/secrets di-ignore, function tidak mengekspos key, sanitasi/rate-limit diuji; branch protection + required PR review tetap perlu diaktifkan di GitHub.
- [x] **Reliabilitas**: Prompt Builder manual tetap berfungsi penuh saat endpoint AI Enhancer down, dengan pesan retry.
- [ ] Setup dashboard monitoring dasar di Sentry untuk melacak error rate (target ≤2%). *(Memerlukan akun/project Sentry.)*

---

## Fase 8 — QA, Testing & Rilis

- [x] Jalankan automated component/unit coverage untuk Journey Utama, Enhancer error/success, Variasi Prompt, dan Riwayat/Favorit.
- [ ] Jalankan end-to-end test browser untuk seluruh User Journey di PRD §3 pada Preview Deployment. *(Memerlukan browser runner dan deployment.)*
- [ ] Uji lintas browser (Chrome, Firefox, Safari, Edge) dan lintas perangkat (mobile, tablet, desktop). *(Memerlukan browser/device matrix.)*
- [x] Uji rate limiting endpoint `/api/enhance-prompt`; latency P95 Gemini nyata perlu diukur pada Preview/Production.
- [x] Review checklist keamanan (API key, CORS same-origin, sanitasi input) sebelum rilis production.
- [ ] Deploy final ke Cloudflare Pages production melalui merge ke `main`.
- [ ] Verifikasi tracking analytics (Plausible/Cloudflare Analytics) sudah menangkap event dasar (page view, copy prompt, enhance click).
- [x] Update `README.md` final dengan dokumentasi setup, environment variable yang dibutuhkan, QA/security, dan panduan kontribusi.

---

## Backlog (Referensi Roadmap V2/V3 — Tidak Dieksekusi di MVP)

- [ ] (V2) Riset & desain skema akun opsional + migrasi Local Storage → database (Supabase/Cloudflare D1).
- [ ] (V2) Desain fitur sharing prompt publik (Prompt Community Gallery).
- [ ] (V2) Riset integrasi langsung API Google Imagen untuk pratinjau gambar in-app.
- [ ] (V2) Desain fitur reverse prompting (upload gambar → saran prompt).
- [ ] (V3) Riset model monetisasi freemium setelah traksi tervalidasi.
- [ ] (Lainnya) Riset dukungan i18n multi-bahasa.
- [ ] (Lainnya) Riset pembuatan ekstensi browser pendamping.
