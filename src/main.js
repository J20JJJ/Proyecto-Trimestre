import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import { createPinia } from 'pinia'
import VueSplide from '@splidejs/vue-splide';

import { gsap } from "gsap";
    
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(TextPlugin);

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use( VueSplide );
app.use(pinia)
app.mount('#app')