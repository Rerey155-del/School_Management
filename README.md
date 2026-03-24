# Manajemen Sekolah V3 (School Management System)

Sistem Informasi Manajemen Sekolah berbasis web modern yang dibangun menggunakan arsitektur pemisahan *Frontend* dan *Backend* (Decoupled Architecture). Sistem ini dirancang untuk mengelola berbagai entitas sekolah seperti Guru, Siswa, Kelas, Mata Pelajaran, Jadwal, hingga Log Aktivitas dan Sistem Pengumuman terpusat yang memanfaatkan teknologi **Apache Kafka**.

---

## 💻 Tech Stack

- **Frontend:** Vue.js 3, Vite, Pinia (State Management), TailwindCSS, DaisyUI.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL.
- **Message Broker / Queue:** Apache Kafka.
- **Security & Auth:** JSON Web Token (JWT), BcryptJS.

---

## 🌟 Fitur Utama

1. **Dashboard Analytics:** Ringkasan statistik, event interaktif, dan grafik data akademik.
2. **Role-based Authentication:** Login dan Register yang dilengkapi dengan enkripsi password dan JWT. Role yang didukung: *Super Admin, Admin, Guru, Siswa*.
3. **Data Master Management:** CRUD (Create, Read, Update, Delete) lengkap untuk Guru, Siswa, Mata Pelajaran, dan Kelas.
4. **Academic Scheduling:** Pengaturan jadwal pelajaran berbasis kelas.
5. **Real-time Announcements (Kafka):** Sistem pengumuman berskala besar yang dikelola melalui asinkronasi Apache Kafka.
6. **Audit Logs:** Pencatatan otomatis untuk setiap tindakan (Create/Update/Delete) yang dilakukan pengguna di sistem.

---

## ⚙️ Persyaratan Sistem (Prerequisites)

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal aplikasi berikut di sistem operasi Anda:

1. **Node.js** (v16 atau lebih baru)
2. **MySQL** / XAMPP Database
3. **Apache Kafka & Zookeeper** (Untuk fitur Broadcast Pengumuman)

---

## 🚀 Cara Instalasi & Menjalankan Aplikasi

Pastikan backend API sudah berjalan di lokal Anda sebelum menjalankan *frontend* ini. 
Berikut cara menginstal dan menjalankan *frontend* Manajemen Sekolah:

1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd c:\xampp\htdocs\manajemen-guru
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Pastikan endpoint API di `.env` frontend sudah mengarah ke layanan backend:
   ```env
   VITE_API_BASE_URL="http://localhost:5002/api"
   ```
4. Jalankan aplikasi web:
   ```bash
   npm run dev
   ```

---

## 📨 Panduan Penggunaan Apache Kafka (Sistem Pengumuman)

Aplikasi ini menggunakan teknologi **Apache Kafka** untuk menangani pertukaran pesan (Message Queue) berskala besar, spesifik pada fitur **Announcements / Pengumuman Terpusat**.

### Kenapa menggunakan Kafka?
Saat administrator mengirim Broadcast Pengumuman ke ribuan siswa atau guru, mengirimkan notifikasi satu-per-satu lewat HTTP akan membebani server dan membuat aplikasi melambat. Dengan Kafka, server hanya "melempar" pesan Pengumuman ke antrean Kafka (sebagai *Producer*), lalu Kafka akan mengurus penyebarannya di latar belakang (lewat *Consumer*) tanpa mengganggu kinerja utama aplikasi.

### Cara Menjalankan Kafka di Local (Windows)
Sistem ini tidak akan bisa mengirim Pengumuman jika Kafka Service dalam kondisi mati. 

Jika Anda menggunakan **Apache Kafka terbaru (dengan fitur KRaft)** yang tidak lagi membutuhkan Zookeeper, ikuti panduan ini:

1. Pastikan Anda sudah mengatur *Cluster ID* pada Kafka Anda (hanya dilakukan sekali saat awal instalasi Kafka).
2. **Buka Terminal 1 (Jalankan Controller):**
   ```bash
   cd c:\kafka (atur sesuai folder Kafka Anda)
   .\bin\windows\kafka-server-start.bat .\config\controller.properties
   ```
3. **Buka Terminal 2 (Jalankan Broker):**
   ```bash
   cd c:\kafka
   .\bin\windows\kafka-server-start.bat .\config\broker.properties
   ```
*(Catatan: Jika Anda masih menggunakan versi Kafka lama, Anda bisa menjalankan `zookeeper-server-start.bat` dan `kafka-server-start.bat config\server.properties` seperti biasa).*

### Alur Kerja Kafka di Aplikasi Ini

1. **Topik (Topic):** Aplikasi kita membaca dan menulis di sebuah topik Kafka bernama `announcements`.
2. **Producer (`backend/src/config/kafka.js`):**
   Setiap kali Admin menekan tombol "Kirim Pengumuman" di halaman *Add Announcement* pada frontend, Node.js (`announcementController.js`) akan bertindak sebagai *Producer*. Ia akan mengemas pesan tesebut ke dalam JSON log lalu mengirimkannya ke *broker* Kafka ke dalam topik `announcements`.
3. **Consumer (`backend/src/index.js`):**
   Di saat Backend Node.js dijalankan (`npm run dev`), sistem secara otomatis menjalankan sebuah *Consumer* di latar belakang (`runConsumer('announcements')`). Consumer ini akan selalu bersiap sedia memantau (listen) antrean pesan. Jika ada pesan masuk dari Producer, Consumer membedahnya dan menyimpannya ke database untuk kemudian ditampilkan di halaman *List Pengumuman* Frontend.

---

## 🔐 Alur Autentikasi (JWT)

Aplikasi ini menggunakan standar **JSON Web Token (JWT)** yang *stateless* untuk keamanan API.

### Proses Kerja JWT
1. **Login:** Ketika pengguna memasukkan Username dan Password di frontend, `authService.ts` akan mengirimnya ke API (`POST /api/users/login`).
2. **Validasi & Token Generation:** Backend mencocokkan password (menggunakan algoritma *Hashing Bcrypt*). Jika cocok, Node.js (`userController.js`) membangun sebuah Token JWT rahasia berisi informasi dasar pengguna (seperti `id` dan `role`).
3. **Penyimpanan:** Frontend (Vue.js + Pinia Store) menerima token ini dan menyimpannya secara aman di `localStorage` peramban web.
4. **Otorisasi API:** Saat frontend ingin mengambil data sensitif (misal data Guru atau Sistem Log), ia akan meyisipkan JWT ini ke dalam *Headers Authorization* `Bearer <token>`.
5. **Autentikasi Middleware:** Di sisi backend, sebuah pelindung (middleware `verifyToken`) akan memverifikasi keaslian token sebelum mengizinkan data diakses.

---
*Dibuat untuk keperluan Manajemen Sekolah V3. All rights reserved 2026.*
