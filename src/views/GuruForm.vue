<template>
  <div class="p-10 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">Tambah Guru</h1>

    <!-- Nama -->
    <input
      v-model="form.name"
      type="text"
      placeholder="Nama Guru"
      class="input input-bordered w-full mb-3"
    />

    <!-- Mata Pelajaran -->
    <input
      v-model="form.subject"
      type="text"
      placeholder="Mata Pelajaran"
      class="input input-bordered w-full mb-3"
    />

    <!-- Status -->
    <label class="flex items-center gap-2 mb-5">
      <input
        type="checkbox"
        class="toggle toggle-primary"
        v-model="form.status"
      />

      Status Aktif
    </label>

    <div class="flex gap-3">
      <button class="btn btn-primary" @click="saveGuru">Simpan</button>

      <button class="btn btn-secondary" @click="back">Batal</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Guru } from "@/types/Guru";
import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();

const form = ref<Guru>({
  name: "",
  subject: "",
  status: true,
});

const username = "admin";
const password = "admin123";

const token = btoa(`${username}:${password}`);

const headers = {
  Authorization: `Basic ${token}`,
  "Content-Type": "application/json",
};

const API = "http://25.43.108.74:8083/api/teachers";

// SIMPAN DATA
const saveGuru = async () => {
  if (!form.value.name || !form.value.subject) {
    alert("Nama dan Mata Pelajaran wajib diisi");

    return;
  }

  const response = await fetch(API, {
    method: "POST",

    headers,

    body: JSON.stringify(form.value),
  });

  const result = await response.json();

  alert(result.message);

  router.push("/dashboard");
};

// KEMBALI
const back = () => {
  router.push("/dashboard");
};
</script>