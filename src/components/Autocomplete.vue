<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  modelValue: string;
  label: string;
  placeholder?: string;
  fetchItems: (query: string) => Promise<string[]>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const items = ref<string[]>([]);
const isLoading = ref(false);
const searchQuery = ref(props.modelValue);
const containerRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const handleFocus = async () => {
  isOpen.value = true;
  await loadItems();
};

const loadItems = async () => {
  isLoading.value = true;
  items.value = await props.fetchItems(searchQuery.value);
  isLoading.value = false;
};

const selectItem = (item: string) => {
  searchQuery.value = item;
  emit('update:modelValue', item);
  isOpen.value = false;
};

// Debounce search
let timeout: any = null;
watch(searchQuery, (newVal) => {
  if (!isOpen.value) return;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    loadItems();
  }, 300);
});

// Watch modelValue from parent
watch(() => props.modelValue, (newVal) => {
  searchQuery.value = newVal;
});
</script>

<template>
  <div ref="containerRef" class="form-control w-full relative">
    <label class="label mb-1">
      <span class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest">{{ props.label }}</span>
    </label>
    <div class="relative group">
      <input
        type="text"
        v-model="searchQuery"
        @focus="handleFocus"
        :placeholder="props.placeholder"
        class="input bg-base-200 border-base-content/5 rounded-2xl h-14 w-full font-bold text-base-content/90 focus:border-primary/50 transition-all pl-12"
      />
      <div class="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-primary group-focus-within:opacity-100 transition-all">
        <Icon icon="lucide:search" class="text-xl" />
      </div>

      <!-- Dropdown Content -->
      <div
        v-show="isOpen"
        class="absolute left-0 right-0 top-[115%] z-50 bg-base-100 backdrop-blur-2xl border border-base-content/10 shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <div v-if="isLoading" class="p-10 flex flex-col items-center justify-center gap-4">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <span class="text-[10px] font-black text-base-content/20 uppercase tracking-[0.3em]">HITTING API...</span>
        </div>
        <ul v-else class="max-h-72 overflow-y-auto p-3 space-y-1">
          <li v-for="item in items" :key="item">
            <button
              @click="selectItem(item)"
              type="button"
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-primary/10 hover:text-primary font-bold transition-all flex items-center justify-between group/item"
            >
              <span class="truncate">{{ item }}</span>
              <Icon icon="lucide:check-circle" class="text-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </button>
          </li>
          <li v-if="items.length === 0" class="p-10 text-center flex flex-col items-center gap-3">
             <Icon icon="lucide:search-x" class="text-4xl text-base-content/10" />
             <span class="text-sm text-base-content/20 font-bold italic">No results found for "{{ searchQuery }}"</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
