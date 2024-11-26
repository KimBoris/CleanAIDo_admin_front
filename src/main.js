import { createApp } from 'vue';
import App from './App.vue';
import router from "./routers/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app');
