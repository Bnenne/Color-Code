import './assets/main.css'

import App from './App.vue'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara'

import Button from 'primevue/button';
import Select from 'primevue/select';

import './index.css'

const app = createApp(App);

app.component('Button', Button);
app.component('Select', Select);
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
});

app.mount('#app')