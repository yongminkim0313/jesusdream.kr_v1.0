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
import { v4 } from 'uuid';

// Composables
import VueCookies from "vue-cookies";

import { createApp } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue';

const app = createApp(App)
	.use(VueCookies, {
    	expireTimes: "10d",
    	secure: true,
	})
	.use( CKEditor )

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

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://jesusdream-3fd59-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(fireapp);


function writeData(key, val) {
  const db = getDatabase();
  set(ref(db, key), val);
}

app.config.globalProperties.$writeData = writeData;


function readData(key, callback) {
	const db = getDatabase();

	return onValue(ref(db, key), (snapshot) => {
		callback(snapshot.val());
	});
}

app.config.globalProperties.$readData = readData;

function onFirebase (callback) {
  const db = getDatabase();
  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      console.log("connected");
		callback("connected");
    } else {
      console.log("not connected");
		callback("disconnected");
    }
  });
}

app.config.globalProperties.$onFirebase = onFirebase;

//if(!app.$cookies.get('tmpr_cookie')) app.$cookies.set('tmpr_cookie',v4(),60 * 60 * 1, null, null, null, 'Strict');
//if(!app.$cookies.get('prmanent_cookie')) app.$cookies.set('prmanent_cookie',v4(), 60 * 60 * 24 * 365, null, null, null, 'Strict');
  

//import { socketStore } from '@/modules/socketStore';
//import { mapStore } from '@/modules/mapStore';
//import { Socket } from '@/modules/socketService';
//import createWebSocketPlugin from '@/modules/plugin';
//const socket = new Socket();

//const plugin = createWebSocketPlugin(socket)
//const store = createStore({
//    modules: {  },
//    plugins: [plugin],
//});

//socket.connect()

registerPlugins(app)

//app.use(store).mount('#app')
app.mount('#app')
