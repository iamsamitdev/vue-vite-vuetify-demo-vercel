import { createApp } from 'vue'

// Vuetify
import { vuetify } from './plugins/vuetify'

// Date Picker
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Custom CSS
import "./styles/global.scss"

// Import Root Component
import App from './App.vue'

// Import Pinia
import { createPinia } from 'pinia'

// Import Router
import router from './router/index'

// i18n Multi Language
import i18n from './plugins/i18n'

// ApexChart
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App)

app.component('Datepicker', Datepicker)

app.use(vuetify)
app.use(i18n)
app.use(VueApexCharts)
app.use(createPinia())
app.use(router)
app.mount('#app')
