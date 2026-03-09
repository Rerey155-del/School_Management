<template>

  <div class="min-h-screen flex items-center justify-center bg-base-200">

    <div class="card w-80 bg-base-100 shadow-xl">

      <div class="card-body">

        <h2 class="card-title justify-center text-2xl mb-4">
          Login Sistem
        </h2>

        <!-- USERNAME -->
        <div class="form-control">

          <label class="label">
            <span class="label-text">Username</span>
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            class="input input-bordered"
            :disabled="isLoading"
          />

        </div>

        <!-- PASSWORD -->
        <div class="form-control">

          <label class="label">
            <span class="label-text">Password</span>
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="input input-bordered"
            :disabled="isLoading"
          />

        </div>

        <!-- BUTTON -->
        <div class="form-control mt-6">

          <button 
            class="btn btn-primary w-full" 
            @click="handleLogin"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            {{ isLoading ? 'Loading...' : 'Login' }}
          </button>

        </div>

      </div>

    </div>

  </div>

</template>


<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"


const router = useRouter()

const username = ref<string>("")
const password = ref<string>("")
const isLoading = ref<boolean>(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert("Username dan Password wajib diisi")
    return
  }

  try {
    isLoading.value = true
    
    // Memanggil API Backend melalui proxy /api
    const response = await axios.post("/api/auth/login", {
      username: username.value,
      password: password.value
    })

    if (response.status === 200) {
      alert("Login Berhasil!")
      
      // Simpan data login (token/username) ke localStorage
      localStorage.setItem("user", JSON.stringify(response.data))
      
      router.push("/dashboard")
    }
  } catch (error: any) {
    console.error("Login Error:", error)
    if (error.response && error.response.status === 401) {
      alert("Username atau Password salah!")
    } else {
      alert("Terjadi kesalahan sistem, silakan coba lagi nanti.")
    }
  } finally {
    isLoading.value = false
  }
}


</script>