import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import amount from '@/directives/amount'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.directive("amount", amount);

app.mount('#app')
