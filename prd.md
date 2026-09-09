# PRODUCT REQUIREMENT DOCUMENT
# Imagen Prompt Generator

*Aplikasi Web untuk Menyusun Prompt Gambar AI secara Terstruktur & Optimal*

| Atribut | Detail |
|---|---|
| Nama Produk | Imagen Prompt Generator |
| Versi Dokumen | 1.1 (MVP — Revisi Tech Stack GitHub-Deployable) |
| Tanggal | 09 September 2026 |
| Status | Draft — Siap Review Tim Engineering & Design |
| Disusun oleh | Principal Product Manager |
| Model Penyimpanan Data (MVP) | Local Storage (client-side), tanpa akun/login |
| Model AI Enhancer (MVP) | Google Gemini API (diproxy via Cloudflare Pages Functions) |
| Model Bisnis (MVP) | Gratis penuh, fokus pada growth & adopsi pengguna |
| Repository & Deployment | GitHub → Cloudflare Pages (auto-deploy) |

---

## Daftar Isi
1. [Executive Summary & Goals](#1-executive-summary--goals)
2. [Target Audience & Personas](#2-target-audience--personas)
3. [User Journeys / Flow](#3-user-journeys--flow)
4. [Functional Requirements & Feature Specs](#4-functional-requirements--feature-specs)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Technical Architecture & Tech Stack Recommendations](#6-technical-architecture--tech-stack-recommendations)
7. [Future Scope / Roadmap (V2 dan Seterusnya)](#7-future-scope--roadmap-v2-dan-seterusnya)

---

## 1. Executive Summary & Goals

### 1.1 Ringkasan Produk
Imagen Prompt Generator adalah aplikasi web yang membantu pengguna — desainer, marketer, pembuat konten, dan AI enthusiast — merancang prompt teks yang optimal, kaya detail, dan terstruktur secara sistematis untuk digunakan pada model generator gambar AI seperti Google Imagen, Midjourney, DALL-E, dan Stable Diffusion.

Alih-alih menulis prompt secara bebas dan sering menghasilkan gambar yang tidak konsisten dengan ekspektasi, pengguna diarahkan melalui form terstruktur (subjek, gaya visual, pencahayaan, kamera, warna, resolusi, dan negative prompt) sehingga prompt yang dihasilkan lebih presisi, dapat direproduksi, dan disesuaikan dengan sintaks parameter khusus tiap model AI target.

### 1.2 Masalah yang Diselesaikan (Problem Statement)
- Pengguna pemula maupun menengah sering menulis prompt terlalu singkat sehingga hasil gambar generik dan tidak sesuai visi kreatif.
- Detail penting seperti komposisi kamera, pencahayaan, dan gaya seni sering terlewat karena pengguna tidak familiar dengan terminologi teknis fotografi/seni yang dipahami model AI.
- Setiap platform (Midjourney, DALL-E, Imagen) memiliki sintaks parameter berbeda (mis. `--ar`, `--v`), yang membingungkan pengguna lintas-platform.
- Tidak ada cara mudah untuk menyimpan, membandingkan, atau membuat variasi dari prompt yang pernah berhasil digunakan.

### 1.3 Tujuan Produk (Goals)
- Menurunkan hambatan (barrier to entry) dalam menulis prompt gambar AI berkualitas tinggi, tanpa memerlukan keahlian teknis prompting.
- Meningkatkan konsistensi dan prediktabilitas hasil gambar AI melalui struktur input yang terpandu.
- Mendukung multi-platform (Google Imagen, Midjourney, DALL-E) melalui preset parameter otomatis.
- Menyediakan pengalaman ringan, cepat, dan gratis yang dapat digunakan tanpa registrasi akun (client-side first).
- Menjaga biaya operasional mendekati nol dengan memanfaatkan infrastruktur gratis berbasis GitHub + Cloudflare.

### 1.4 Sasaran & Metrik Keberhasilan (KPIs / Success Metrics)

| Kategori | Metrik | Target MVP (3 bulan pasca-rilis) |
|---|---|---|
| Adopsi | Jumlah pengguna unik aktif bulanan (MAU) | ≥ 5.000 pengguna |
| Engagement | Rata-rata jumlah prompt dibuat per sesi | ≥ 3 prompt / sesi |
| Retensi | Pengguna yang kembali dalam 7 hari (D7 retention) | ≥ 20% |
| Fitur Inti | Persentase sesi yang menggunakan "Enhance with AI" | ≥ 40% dari total sesi |
| Kepuasan | Prompt yang di-copy ke clipboard per sesi (proxy nilai guna) | ≥ 60% sesi menghasilkan minimal 1 copy |
| Performa | Waktu respons AI Enhancer (P95) | ≤ 4 detik |
| Kualitas Teknis | Error rate pemanggilan Gemini API (via proxy) | ≤ 2% |

> Catatan: Karena MVP menggunakan Local Storage tanpa akun, metrik pengguna dilacak melalui analitik anonim berbasis event (mis. Plausible/PostHog/GA4) dengan client ID acak, bukan identitas personal.

---

## 2. Target Audience & Personas

### 2.1 Segmentasi Target Pengguna
- Desainer grafis & UI/UX yang membutuhkan aset visual referensi cepat.
- Content creator & social media marketer yang memproduksi visual promosi secara rutin.
- AI enthusiast/hobbyist yang bereksperimen dengan berbagai model generator gambar.
- Tim marketing/agency kecil-menengah yang ingin efisiensi biaya produksi visual.

### 2.2 Persona 1 — "Dinda, Content Creator Sosial Media"
| Atribut | Deskripsi |
|---|---|
| Usia / Peran | 26 tahun, Freelance Content Creator & Social Media Manager |
| Tujuan | Membuat visual menarik untuk konten Instagram/TikTok secara cepat setiap hari |
| Frustrasi | Tidak paham istilah teknis fotografi; hasil Midjourney sering tidak sesuai mood yang diinginkan |
| Kebutuhan Utama | Form input sederhana bergaya pilihan (dropdown/chip), preset gaya visual siap pakai, output yang bisa langsung di-copy |
| Perangkat | Mayoritas mobile, sebagian browser desktop saat kerja |

### 2.3 Persona 2 — "Raka, Desainer Produk Digital"
| Atribut | Deskripsi |
|---|---|
| Usia / Peran | 31 tahun, UI/UX & Product Designer di startup |
| Tujuan | Menghasilkan moodboard dan referensi visual untuk pitch desain ke klien/stakeholder |
| Frustrasi | Perlu iterasi banyak variasi prompt untuk eksplorasi gaya; ingin menyimpan histori prompt yang berhasil |
| Kebutuhan Utama | Fitur variasi multi-prompt, riwayat & favorit, kontrol detail (kamera, resolusi, aspect ratio) |
| Perangkat | Desktop/laptop, layar besar, multitasking dengan tools desain lain |

### 2.4 Persona 3 — "Bayu, AI Enthusiast & Hobbyist"
| Atribut | Deskripsi |
|---|---|
| Usia / Peran | 22 tahun, mahasiswa & penggemar teknologi AI generatif |
| Tujuan | Bereksperimen dengan berbagai model AI (Imagen, Midjourney, DALL-E, Stable Diffusion) untuk hobi/portofolio |
| Frustrasi | Harus hafal sintaks parameter berbeda-beda tiap platform; ingin belajar teknik prompting yang lebih baik |
| Kebutuhan Utama | Preset model spesifik otomatis menyisipkan parameter (`--ar`, `--v`, dsb.), fitur enhance untuk belajar pola prompt yang baik |
| Perangkat | Desktop, cukup teknis, nyaman dengan UI yang lebih kaya opsi |

---

## 3. User Journeys / Flow

### 3.1 Journey Utama — Membuat Prompt Baru dari Nol
1. Pengguna membuka aplikasi (tanpa perlu login).
2. Pengguna mengisi "Main Subject" pada Prompt Builder (mis. "seekor rubah di hutan bersalju").
3. Pengguna memilih Art Style dari daftar preset (mis. Photorealistic).
4. Pengguna mengatur Lighting/Mood, Camera & Framing, serta Color/Resolution melalui chip/dropdown.
5. Pengguna menambahkan Negative Prompt (opsional, dengan saran default seperti "blurry, watermark, extra limbs").
6. Live Preview menampilkan teks prompt final secara real-time di panel kanan/bawah.
7. Pengguna memilih target model AI (mis. Midjourney v6) sehingga parameter otomatis ditambahkan (mis. `--ar 16:9 --v 6`).
8. Pengguna menekan "Copy to Clipboard" dan menempelkan prompt ke platform AI pilihannya.
9. (Opsional) Pengguna menyimpan prompt ke "Favorit" atau prompt otomatis masuk ke "Riwayat".

### 3.2 Journey Alternatif — Menggunakan AI Enhancer
1. Pengguna mengetik ide singkat pada kolom Main Subject (mis. "kucing astronot").
2. Pengguna menekan tombol "Enhance with AI".
3. Frontend memanggil endpoint proxy (`/api/enhance-prompt`) yang berjalan sebagai Cloudflare Pages Function.
4. Pages Function meneruskan permintaan ke Gemini API menggunakan API key yang tersimpan aman sebagai environment secret, lalu mengembalikan hasil ke frontend.
5. Sistem menampilkan hasil prompt yang telah diperkaya pada form (subjek, gaya, pencahayaan terisi otomatis) sebagai draft yang dapat diedit.
6. Pengguna meninjau, menyesuaikan bila perlu, lalu melanjutkan ke Live Preview dan Copy to Clipboard seperti journey utama.

### 3.3 Journey — Membuat Variasi Prompt
1. Setelah prompt utama selesai disusun, pengguna menekan "Generate Variations".
2. Pengguna memilih jumlah variasi (mis. 3 atau 5).
3. Sistem menghasilkan beberapa versi prompt dengan variasi kata sinonim/detail tambahan namun tetap mempertahankan subjek inti.
4. Pengguna dapat meninjau tiap variasi pada daftar card, meng-copy salah satu, atau menyimpannya ke favorit.

### 3.4 Journey — Mengakses Riwayat & Favorit
1. Pengguna membuka tab "Riwayat" atau "Favorit" dari navigasi utama.
2. Sistem menampilkan daftar prompt tersimpan (dari Local Storage), diurutkan dari yang terbaru.
3. Pengguna dapat mencari, menandai favorit, menghapus, atau memuat ulang ("Load") prompt ke Prompt Builder untuk diedit kembali.

---

## 4. Functional Requirements & Feature Specs

**Legenda prioritas:** 🔴 **Must-have** = wajib ada di MVP untuk rilis pertama · 🟠 **Should-have** = penting namun bisa menyusul rilis minor berikutnya · 🟢 **Nice-to-have** = pertimbangan jika kapasitas tim memungkinkan.

### 4.1 Interactive Prompt Builder / Form Input

| User Story | Acceptance Criteria | Prioritas |
|---|---|---|
| Sebagai pengguna, saya ingin memasukkan subjek utama gambar dalam bahasa natural, agar sistem dapat membentuk dasar prompt saya. | Field teks "Main Subject" wajib diisi sebelum Live Preview menghasilkan output. Karakter maksimum 300, dengan counter karakter. Placeholder memberi contoh. | 🔴 Must-have |
| Sebagai pengguna, saya ingin memilih gaya visual dari daftar preset (Photorealistic, 3D Render, Anime, Cyberpunk, Oil Painting, dll.), agar hasil gambar sesuai gaya yang saya inginkan. | Minimal 10 preset gaya tersedia dalam bentuk chip/dropdown dengan thumbnail ilustratif. Pengguna dapat memilih maksimal 2 gaya sekaligus. Pilihan "Custom" tersedia untuk mengetik gaya bebas. | 🔴 Must-have |
| Sebagai pengguna, saya ingin mengatur pencahayaan dan suasana (Volumetric, Cinematic, Soft, Neon, Dark, Dramatic), agar mood gambar sesuai kebutuhan. | Tersedia minimal 8 opsi lighting/mood dalam bentuk multi-select chip. Kombinasi terpilih otomatis dirangkai secara gramatikal benar dalam output prompt. | 🔴 Must-have |
| Sebagai pengguna, saya ingin mengatur parameter kamera & framing (Wide angle, Close-up, Macro, 85mm lens, Drone view, dll.), agar komposisi visual sesuai ekspektasi. | Dropdown kategori: Angle, Shot Type, Lens, Perspective — masing-masing minimal 6 opsi, single-select per kategori. | 🔴 Must-have |
| Sebagai pengguna, saya ingin menentukan detail warna & resolusi (color palette, 8K, photorealistic detail, Unreal Engine 5 render), agar kualitas output terlihat profesional. | Color palette dipilih via color-picker atau preset palet bernama. Resolution/quality tags tersedia sebagai checkbox (8K, Ultra HD, Unreal Engine 5, Octane Render, dll.). | 🟠 Should-have |
| Sebagai pengguna, saya ingin menambahkan negative prompt / elemen yang tidak diinginkan, agar hasil gambar terhindar dari cacat umum (blur, anggota tubuh berlebih, watermark). | Field khusus "Negative Prompt" terpisah. Tombol "Insert Common Negatives" mengisi daftar umum yang dapat diedit. Dirangkai sesuai format model target (mis. `--no` untuk Midjourney). | 🔴 Must-have |

### 4.2 AI Prompt Optimizer / Enhancer

| User Story | Acceptance Criteria | Prioritas |
|---|---|---|
| Sebagai pengguna, saya ingin menekan tombol "Enhance with AI" untuk memperkaya prompt sederhana saya menjadi prompt yang jauh lebih detail dan deskriptif. | Tombol memanggil endpoint proxy internal (Cloudflare Pages Function) yang meneruskan ke Gemini API dengan input teks pengguna + konteks form. Hasil ditampilkan sebagai draft yang bisa "Apply" atau "Discard". Loading state maksimal 4 detik (P95); jika gagal, tampil pesan error ramah + tombol "Coba Lagi". | 🔴 Must-have |
| Sebagai pengguna, saya ingin melihat highlight bagian mana dari prompt yang ditambahkan oleh AI, agar saya paham apa yang berubah. | Teks tambahan dari AI ditandai dengan format berbeda (mis. underline) di panel preview sebelum di-apply. | 🟠 Should-have |
| Sebagai pengguna, saya ingin membatasi gaya bahasa hasil enhancement (mis. lebih ringkas vs. sangat deskriptif), agar sesuai preferensi saya. | Tersedia toggle "Ringkas / Detail / Sangat Detail" yang memengaruhi panjang & kedalaman hasil enhancement. | 🟢 Nice-to-have |

### 4.3 Prompt Output & Management

| User Story | Acceptance Criteria | Prioritas |
|---|---|---|
| Sebagai pengguna, saya ingin melihat live preview teks prompt yang dihasilkan secara real-time saat saya mengubah input form. | Panel preview memperbarui teks dalam <200ms setelah perubahan input (debounce 150-300ms). Format prompt final mengikuti struktur: Subjek, Gaya, Pencahayaan, Kamera, Warna/Resolusi, [Parameter Model], Negative Prompt. | 🔴 Must-have |
| Sebagai pengguna, saya ingin menyalin prompt hasil generate ke clipboard dengan satu klik. | Tombol "Copy to Clipboard" menampilkan konfirmasi visual (toast) selama 2 detik. Berfungsi di seluruh browser modern desktop & mobile. | 🔴 Must-have |
| Sebagai pengguna, saya ingin menghasilkan beberapa variasi prompt sekaligus dari prompt dasar yang sama. | Pengguna dapat memilih jumlah variasi: 2, 3, atau 5. Setiap variasi ditampilkan sebagai card terpisah dengan tombol copy dan simpan masing-masing. | 🟠 Should-have |
| Sebagai pengguna, saya ingin menyimpan prompt ke Favorit dan melihat Riwayat prompt yang pernah saya buat, tersimpan di perangkat saya. | Data disimpan di Local Storage browser dengan struktur JSON (id, teks prompt, tanggal, tag model, status favorit). Riwayat menyimpan maksimal 100 entri terbaru (FIFO). Tersedia aksi hapus per-item dan "Hapus Semua Riwayat". | 🔴 Must-have |
| Sebagai pengguna, saya ingin diperingatkan sebelum menghapus data riwayat/favorit saya secara permanen. | Aksi "Hapus Semua" memunculkan dialog konfirmasi sebelum eksekusi. | 🟠 Should-have |

### 4.4 Aspect Ratio & Model-Specific Presets

| User Story | Acceptance Criteria | Prioritas |
|---|---|---|
| Sebagai pengguna, saya ingin memilih preset rasio aspek (1:1, 16:9, 9:16, 4:3), agar output gambar sesuai kebutuhan platform saya. | Preset ditampilkan sebagai tombol visual dengan ikon rasio. Rasio terpilih otomatis diterjemahkan ke parameter yang sesuai dengan model target yang dipilih. | 🔴 Must-have |
| Sebagai pengguna, saya ingin memilih target model AI (Google Imagen 3, Midjourney v6, DALL-E 3, Stable Diffusion), agar sintaks parameter khusus otomatis ditambahkan ke prompt saya. | Dropdown pemilihan model dengan minimal 4 opsi awal. Saat model dipilih, sistem menambahkan parameter sesuai standar model tsb. Perubahan model memicu pembaruan otomatis pada Live Preview. | 🔴 Must-have |
| Sebagai pengguna, saya ingin melihat tooltip penjelasan singkat tentang arti tiap parameter model, agar saya belajar sambil menggunakan aplikasi. | Ikon info (i) di samping parameter menampilkan tooltip penjelasan saat hover/tap. | 🟢 Nice-to-have |

---

## 5. Non-Functional Requirements

### 5.1 Performa
- Waktu muat awal halaman (First Contentful Paint) ≤ 1.5 detik pada koneksi 4G rata-rata (didukung oleh Cloudflare global CDN edge caching).
- Live Preview harus memperbarui tampilan dalam ≤ 200ms setelah input pengguna berhenti diketik (debounce).
- Panggilan AI Enhancer (via Cloudflare Pages Function → Gemini API) memiliki target P95 latency ≤ 4 detik, dengan timeout maksimum 10 detik disertai pesan retry.
- Aplikasi harus tetap dapat digunakan (Prompt Builder manual) walaupun API Gemini/Function sedang tidak tersedia (graceful degradation).

### 5.2 Keamanan
- **API key Gemini tidak boleh diekspos di sisi client sama sekali**; seluruh panggilan ke Gemini API diproxy melalui Cloudflare Pages Function, dengan key disimpan sebagai encrypted environment secret di dashboard Cloudflare (bukan di repo GitHub).
- Terapkan rate limiting pada endpoint Enhance with AI (mis. maksimum 20 request/menit per IP) untuk mencegah penyalahgunaan/biaya API berlebih.
- Sanitasi input pengguna untuk mencegah prompt injection sebelum diteruskan ke Gemini API.
- Karena tanpa akun, tidak ada data pribadi sensitif yang disimpan di server; data riwayat sepenuhnya berada di Local Storage milik pengguna sendiri.
- File `.env`/secrets **tidak pernah** di-commit ke repository GitHub — gunakan `.gitignore` dan Cloudflare Pages Environment Variables.
- Aktifkan branch protection & required PR review di GitHub sebelum merge ke branch `main` (yang otomatis trigger deploy production).

### 5.3 UI/UX & Responsivitas
- Desain harus fully responsive: mobile (≥360px), tablet, dan desktop.
- Prompt Builder pada layar kecil menggunakan pola accordion/step-by-step agar tidak memaksa scroll berlebihan.
- Live Preview tetap terlihat (sticky/floating panel) baik di mobile maupun desktop.
- Dukungan mode gelap (dark mode).
- Aksesibilitas dasar: kontras warna sesuai WCAG AA, seluruh elemen interaktif dapat diakses via keyboard, label ARIA pada form.

### 5.4 Kompatibilitas & Skalabilitas
- Mendukung browser modern dua versi terakhir: Chrome, Firefox, Safari, Edge (desktop & mobile).
- Cloudflare Pages Functions auto-scaling secara native (serverless, edge-based) tanpa perlu konfigurasi tambahan untuk menangani lonjakan trafik.

### 5.5 Reliabilitas & Observability
- Uptime target aplikasi ≥ 99.5% (ditopang SLA Cloudflare Pages).
- Logging error terpusat (mis. Sentry, atau Cloudflare Workers Logs) untuk memantau kegagalan panggilan API dan error client-side.
- Setiap Pull Request di GitHub otomatis mendapat Preview Deployment (Cloudflare Pages Preview URL) untuk QA sebelum merge ke production.

---

## 6. Technical Architecture & Tech Stack Recommendations

### 6.1 Kebutuhan Utama: Deploy dari GitHub
Karena aplikasi harus dapat di-deploy langsung dari repository GitHub, sementara **GitHub Pages murni tidak mendukung backend/serverless function** (hanya static hosting), rekomendasi arsitektur menggunakan pola berikut:

> **Repository di GitHub → terhubung ke Cloudflare Pages (via integrasi GitHub) → setiap push ke `main` otomatis build & deploy, termasuk Pages Functions (serverless) untuk proxy Gemini API.**

Pendekatan ini tetap sepenuhnya berbasis GitHub (source of truth, CI/CD trigger, PR review, versioning) namun mendapatkan kemampuan serverless yang tidak tersedia di GitHub Pages — sambil tetap **100% gratis** untuk skala trafik MVP.

**Kenapa bukan GitHub Pages murni?** Opsi ini pernah dipertimbangkan (pengguna menyimpan API key Gemini sendiri di browser / BYOK), namun ditolak karena kurang ramah untuk pengguna awam (mereka harus punya API key sendiri) dan berisiko API key bocor di local storage/network tab. Opsi Cloudflare Pages Functions dipilih karena menjaga UX tetap sederhana (pengguna tidak perlu API key sendiri) sambil tetap aman.

### 6.2 Rekomendasi Tech Stack

| Layer | Rekomendasi | Alasan |
|---|---|---|
| Source Control | **GitHub** (repo utama) | Standar industri, integrasi native dengan hampir semua platform deploy modern |
| Frontend Framework | **Vite + React + TypeScript** | Build tool ringan & sangat cepat, cocok untuk SPA static-first, lebih ringan dibanding Next.js untuk kasus tanpa SSR kompleks |
| Styling / UI | **Tailwind CSS + shadcn/ui** | Pengembangan cepat, konsisten, mudah dikustom untuk dark mode |
| State Management | **Zustand** | Ringan, cukup untuk kompleksitas form builder MVP, tanpa boilerplate berlebih |
| Penyimpanan Data (MVP) | **Browser Local Storage** (via helper `localForage`) | Sesuai keputusan produk: tanpa akun, data privat di perangkat pengguna |
| Hosting Frontend | **Cloudflare Pages** (terhubung langsung ke repo GitHub) | Static hosting cepat via CDN global, auto-deploy dari GitHub, free tier generous |
| Backend / API Proxy | **Cloudflare Pages Functions** (folder `/functions` di repo yang sama) | Serverless function ringan untuk menjaga Gemini API key aman; tetap dalam satu repo GitHub, tanpa infra terpisah |
| AI Enhancer | **Google Gemini API** (mis. Gemini 2.x Flash untuk latensi rendah) | Sesuai keputusan produk; biaya efisien untuk task text-enhancement |
| Secrets Management | **Cloudflare Pages Environment Variables** | API key tidak pernah masuk ke repo GitHub, dikelola terpisah di dashboard Cloudflare |
| CI/CD | **GitHub Actions** (lint, type-check, test) + **Cloudflare Pages Git Integration** (build & deploy otomatis) | Push ke `main` → auto-deploy production; Pull Request → auto-deploy preview URL untuk QA |
| Analytics | **Plausible** atau **Cloudflare Web Analytics** (privacy-friendly, anonim, gratis) | Melacak KPI tanpa memerlukan akun pengguna, tanpa cookie |
| Error Monitoring | **Sentry** (free tier) | Observability produksi untuk client-side & function errors |
| Domain | **Custom domain via Cloudflare DNS** (opsional) atau subdomain gratis `*.pages.dev` | Fleksibel sesuai kebutuhan branding |

### 6.3 Struktur Repository (Contoh)
```
imagen-prompt-generator/
├── .github/
│   └── workflows/
│       └── ci.yml              # lint, type-check, test sebelum merge
├── functions/
│   └── api/
│       └── enhance-prompt.ts   # Cloudflare Pages Function (proxy ke Gemini API)
├── src/
│   ├── components/
│   │   ├── PromptBuilder/
│   │   ├── LivePreview/
│   │   ├── HistoryFavorites/
│   │   └── ModelPresets/
│   ├── lib/
│   │   ├── storage.ts          # helper Local Storage (localForage)
│   │   ├── promptFormatter.ts  # logika penyusunan teks prompt final
│   │   └── modelPresets.ts     # mapping parameter tiap model AI
│   ├── store/                  # Zustand store
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tailwind.config.ts
├── vite.config.ts
├── wrangler.toml                # konfigurasi Cloudflare Pages Functions (opsional)
├── package.json
└── README.md
```

### 6.4 Alur Deployment (End-to-End)
1. Developer membuat branch baru, mengerjakan fitur, membuka Pull Request di GitHub.
2. **GitHub Actions** menjalankan lint, type-check, dan unit test otomatis pada PR.
3. **Cloudflare Pages** (terintegrasi via GitHub App) otomatis mem-build PR tersebut dan menghasilkan **Preview URL** unik untuk QA/review visual.
4. Setelah PR di-review & di-approve, merge ke branch `main`.
5. Cloudflare Pages otomatis mem-build ulang dan men-deploy ke **Production URL** (`*.pages.dev` atau custom domain).
6. Fungsi di folder `/functions` ikut ter-deploy sebagai Cloudflare Pages Functions tanpa konfigurasi tambahan.

### 6.5 Alur Data Ringkas (Sequence Sederhana)
1. Pengguna mengisi form di Frontend (Vite + React) → state disimpan sementara di Zustand store.
2. Saat "Enhance with AI" ditekan → Frontend memanggil `POST /api/enhance-prompt` (relative path, otomatis diarahkan ke Pages Function di domain yang sama — tanpa masalah CORS).
3. Pages Function (edge, server-side) menambahkan API key Gemini dari environment variable → memanggil Gemini API → menerima hasil.
4. Pages Function mengembalikan hasil ke Frontend → Frontend memperbarui form/preview.
5. Saat pengguna menyimpan ke Favorit/Riwayat → data ditulis langsung ke Local Storage browser (tidak melalui backend/network sama sekali).

### 6.6 Struktur Data Local Storage (Contoh)
```json
{
  "id": "uuid",
  "createdAt": "ISO-8601",
  "isFavorite": false,
  "targetModel": "midjourney-v6",
  "aspectRatio": "16:9",
  "rawInputs": {
    "subject": "seekor rubah di hutan bersalju",
    "style": ["photorealistic"],
    "lighting": ["cinematic"],
    "camera": { "angle": "low-angle", "lens": "85mm" },
    "negativePrompt": "blurry, watermark, extra limbs"
  },
  "finalPromptText": "..."
}
```

### 6.7 Contoh Skeleton Cloudflare Pages Function
```ts
// functions/api/enhance-prompt.ts
export const onRequestPost: PagesFunction<{ GEMINI_API_KEY: string }> = async (context) => {
  const { subject, context: formContext } = await context.request.json();

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${context.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildEnhancerInstruction(subject, formContext) }] }],
      }),
    }
  );

  const data = await geminiRes.json();
  return Response.json({ enhancedPrompt: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "" });
};
```

---

## 7. Future Scope / Roadmap (V2 dan Seterusnya)

### 7.1 V2 — Akun & Sinkronisasi Cloud
- Login opsional (Google/Email) dengan migrasi otomatis data dari Local Storage ke database (mis. Supabase atau Cloudflare D1) agar riwayat/favorit dapat diakses lintas perangkat.
- Fitur sharing prompt publik via tautan (Prompt Community Gallery).

### 7.2 V2 — Kolaborasi & Tim
- Workspace tim untuk agency/brand agar dapat berbagi library prompt bersama.
- Komentar dan versi riwayat pada prompt yang dibagikan dalam tim.

### 7.3 V2 — Integrasi Generasi Gambar Langsung
- Integrasi langsung dengan API Google Imagen (atau model lain) untuk pratinjau gambar hasil generate tanpa berpindah aplikasi.
- Fitur "Prompt-to-Image-to-Prompt": mengunggah gambar referensi dan sistem menyarankan prompt yang mendekati gaya gambar tsb. (reverse prompting).

### 7.4 V3 — Monetisasi (Belum Ditentukan di MVP)
- Evaluasi model freemium (mis. kuota AI Enhancer harian gratis, upgrade untuk kuota lebih besar/model AI premium) setelah traksi pengguna tervalidasi.
- Marketplace template prompt premium dari kreator/komunitas.

### 7.5 Peningkatan Lainnya
- Dukungan multi-bahasa (i18n) untuk pasar global.
- Ekstensi browser untuk mengisi Prompt Builder langsung dari halaman platform AI target.
- Analitik personal: statistik gaya/model yang paling sering digunakan pengguna.
- Migrasi Cloudflare D1 (SQLite di edge) sebagai database ringan jika kebutuhan V2 akun terealisasi, tetap dalam ekosistem Cloudflare + GitHub yang sama.

---

*— Akhir Dokumen PRD v1.1 —*
