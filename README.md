# 🎨 Guru App (Frontend)

Frontend aplikasi **Manajemen Data Guru** yang dibuat menggunakan **Vue 3** dan terhubung dengan **REST API Spring Boot**.

Aplikasi ini memungkinkan pengguna untuk:

- Login ke sistem
- Melihat daftar guru
- Menambahkan data guru
- Mengedit data guru
- Mengubah status guru (Aktif / Non-Aktif)

⚠️ Catatan:  
Sesuai requirement tugas, **tidak ada fitur delete data guru**.

---

# ⚙️ Teknologi yang Digunakan

- Vue 3
- Vue Router
- Tailwind CSS
- DaisyUI
- Fetch API
- Vite

---

# 🗂️ Struktur Project

```
guru-app
│
├── public
│
├── src
│   │
│   ├── assets
│   │   └── main.css
│   │
│   ├── components
│   │
│   ├── router
│   │   └── index.ts
│   │
│   ├── views
│   │   ├── Login.vue
│   │   ├── Dashboard.vue
│   │   └── GuruForm.vue
│   │
│   ├── App.vue
│   └── main.ts
│
└── package.json
```

---

# 🛠️ Setup Project

## 1️⃣ Clone Repository

```bash
git clone https://github.com/username/guru-app.git
cd guru-app
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Jalankan Frontend

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

---

# 🔗 Koneksi ke Backend

Frontend terhubung dengan backend Spring Boot melalui REST API.

Contoh endpoint:

```
http://localhost:8083/api/teachers
```

---

# 🔐 Authentication

Aplikasi menggunakan **Basic Authentication** untuk mengakses API.

Contoh implementasi di Vue:

```javascript
const username = "admin"
const password = "admin123"

const token = btoa(`${username}:${password}`)

fetch("http://localhost:8083/api/teachers", {
  method: "GET",
  headers: {
    Authorization: `Basic ${token}`
  }
})
```

---

# 📄 Halaman Aplikasi

## 1️⃣ Login Page

Halaman login untuk masuk ke dalam sistem.

User harus memasukkan:

- Username
- Password

Jika berhasil login, user akan diarahkan ke halaman **Dashboard**.

---

## 2️⃣ Dashboard

Menampilkan daftar guru dalam bentuk tabel.

Informasi yang ditampilkan:

- Nama Guru
- Mata Pelajaran
- Status (Aktif / Non-Aktif)

Fitur:

- Edit data guru
- Navigasi ke halaman tambah guru

---

## 3️⃣ Form Tambah Guru

Digunakan untuk menambahkan data guru baru.

Field yang tersedia:

- Nama Guru
- Mata Pelajaran
- Status Aktif

---

## 4️⃣ Edit Guru

Digunakan untuk mengubah data guru yang sudah ada.

User dapat:

- Mengubah nama
- Mengubah mata pelajaran
- Mengubah status aktif / non aktif

---

# 🔄 Alur Sistem

1. User membuka aplikasi frontend.
2. User diarahkan ke halaman **Login**.
3. User memasukkan username dan password.
4. Setelah login berhasil, user masuk ke halaman **Dashboard**.
5. Dashboard menampilkan daftar guru.
6. User dapat:
   - Menambahkan guru
   - Mengedit data guru
   - Mengubah status guru.

---

# 🚫 Batasan Sistem

Sesuai requirement tugas:

- ❌ Tidak ada fitur delete guru
- ❌ Tidak ada penghapusan data
- ✔ Hanya **Create, Read, Update**

---

# 👤 Author

Frontend dibuat menggunakan:

- Vue 3
- Tailwind CSS
- DaisyUI
- REST API Integration
