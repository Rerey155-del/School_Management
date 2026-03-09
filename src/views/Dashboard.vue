<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-5">Data Guru</h1>

    <button class="btn btn-primary mb-5" @click="openAdd">
      Tambah Guru
    </button>

    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Mata Pelajaran</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="g in guruList" :key="g.id">
          <td>{{ g.name }}</td>
          <td>{{ g.subject }}</td>

          <td>
            <span v-if="g.status" class="badge badge-success">Aktif</span>
            <span v-else class="badge badge-error">Non Aktif</span>
          </td>

          <td>
            <button class="btn btn-sm btn-warning" @click="openEdit(g)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL EDIT -->
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-3">Edit Guru</h3>

        <input
          v-model="form.name"
          class="input input-bordered w-full mb-3"
          placeholder="Nama Guru"
        />

        <input
          v-model="form.subject"
          class="input input-bordered w-full mb-3"
          placeholder="Mata Pelajaran"
        />

        <label class="flex items-center gap-2 mb-4">
          <input type="checkbox" v-model="form.status" class="checkbox" />
          Status Aktif
        </label>

        <div class="modal-action">
          <button class="btn btn-primary" @click="updateGuru">
            Simpan
          </button>

          <button class="btn" @click="showModal=false">
            Batal
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const guruList = ref([])

const showModal = ref(false)

const form = ref({
  id:null,
  name:"",
  subject:"",
  status:true
})

const username = "admin"
const password = "admin123"

const token = btoa(`${username}:${password}`)

const headers = {
  Authorization:`Basic ${token}`,
  "Content-Type":"application/json"
}

const API = "http://localhost:8083/api/teachers"



// NAVIGASI TAMBAH GURU
const openAdd = () => {

  router.push("/guru-form")

}


// GET DATA
const fetchGuru = async () => {
  try {
    const response = await fetch(API, { 
      headers,
      credentials: "include" // Menggunakan session login
    })
    
    if (!response.ok) throw new Error("Gagal mengambil data dari server")
    
    const result = await response.json()
    console.log("Data Guru:", result.data)
    guruList.value = result.data || []
  } catch (error) {
    console.error("Fetch Error:", error)
    alert("Gagal mengambil data guru. Pastikan backend berjalan.")
  }
}


// OPEN EDIT
const openEdit = (guru) => {

  form.value = {...guru}

  showModal.value = true

}


// UPDATE DATA
const updateGuru = async () => {

  const response = await fetch(`${API}/${form.value.id}`,{

    method:"PUT",
    headers,

    body:JSON.stringify({
  name:form.value.name,
       subject:form.value.subject,
      status:form.value.status
     })

    

  })

  const result = await response.json()

  alert(result.message)

  showModal.value=false

  fetchGuru()

}


onMounted(fetchGuru)

</script>