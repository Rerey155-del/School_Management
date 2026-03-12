"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/main.css");
require("aos/dist/aos.css");
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var aos_1 = require("aos");
var config_1 = require("primevue/config");
var aura_1 = require("@primevue/themes/aura");
aos_1.default.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});
var app = (0, vue_1.createApp)(App_vue_1.default);
var pinia = (0, pinia_1.createPinia)();
app.use(pinia);
app.use(router_1.default);
app.use(config_1.default, {
    theme: {
        preset: aura_1.default,
        options: {
            darkModeSelector: '.dark',
        }
    }
});
app.mount('#app');
