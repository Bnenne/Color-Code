import './assets/main.css'

import App from './App.vue'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara'

import Button from 'primevue/button';
import Select from 'primevue/select';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';

import './index.css'

const app = createApp(App);

app.component('Button', Button);
app.component('Select', Select);
app.component('Card', Card);
app.component('Divider', Divider);
app.component('ProgressBar', ProgressBar);
app.component('Message', Message);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: 'none',
        }
    }
});

app.mount('#app')