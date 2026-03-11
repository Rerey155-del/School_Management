import './assets/main.css'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
        }
    }
});

app.mount('#app');