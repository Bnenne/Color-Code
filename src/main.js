import './assets/main.css'

import App from './App.vue'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/lara'

import Button from 'primevue/button'
import Select from 'primevue/select'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import ProgressBar from 'primevue/progressbar'
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ToastService from "primevue/toastservice";
import Badge from "primevue/badge";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import './index.css'

const app = createApp(App)

app.component('Button', Button)
app.component('Select', Select)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('ProgressBar', ProgressBar)
app.component('Message', Message)
app.component('DataTable', DataTable)
app.component('Column ', Column)
app.component('Toast', Toast)
app.component('Badge', Badge)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'none',
        }
    }
})
app.use(ToastService)

app.mount('#app')