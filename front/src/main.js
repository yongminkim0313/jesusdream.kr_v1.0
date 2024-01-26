/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import axios from 'axios';
import { createStore } from 'vuex';

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$filters = {
    formatDate(value) {
        const date = new Date(value);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month > 9 ? month : `0${month}`;
        let day = date.getDate();
        day = day > 9 ? day : `0${day}`;
        let hours = date.getHours();
        hours = hours > 9 ? hours : `0${hours}`;
        let minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : `0${minutes}`;
        let seconds = date.getSeconds();
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

import { socketStore } from '@/modules/socketStore';
import { mapStore } from '@/modules/mapStore';

const store = createStore({ modules: { socketStore, mapStore} });

import { Socket } from '@/modules/socketService';
const socket = new Socket(store);
store.dispatch("socketStore/registSocket", socket);
store.dispatch("mapStore/registSocket", socket);

registerPlugins(app)

app.use(store).mount('#app')
