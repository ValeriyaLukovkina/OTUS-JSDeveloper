import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'

import App from './App.vue'

import './assets/main.css'
import { router } from './router'

const app = createApp(App)
app.use(Quasar, {
    plugins: {}
  })
app.use(router)

app.mount('#app')

