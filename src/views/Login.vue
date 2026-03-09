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
          />
        </div>

        <!-- BUTTON -->
        <div class="form-control mt-6">
          <button 
            class="btn btn-primary w-full" 
            @click="handleLogin"
          >
            Login
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")

const handleLogin = async () => {

  if(!username.value || !password.value){
    alert("Username dan password wajib diisi")
    return
  }

  try{

    // encode username:password
    const token = btoa(`${username.value}:${password.value}`)

    const response = await fetch("http://25.31.76.128:8082/api/teachers",{

      method:"GET",

      headers:{
        "Authorization":`Basic ${token}`,
        "Content-Type":"application/json"
      }

    })
    

    if(response.ok){

      // simpan token login
      localStorage.setItem("token",token)

      alert("Login berhasil")

      router.push("/dashboard")

    }else{

      alert("Username atau password salah")

    }

  }catch(error){

    console.error(error)
    alert("Server tidak bisa diakses yaa")

  }

}

</script>