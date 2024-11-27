import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import VueSplide from '@splidejs/vue-splide';

const app = createApp(App)
app.use(router)
app.use( VueSplide );
app.mount('#app')