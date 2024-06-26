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

function printDate(p){
  // 오늘 날짜
  const today = new Date(); // 년도
  const year = today.getFullYear(); // 월
  const month = (today.getMonth() + 1).toString().padStart(2, '0');  // 일
  const day = today.getDate().toString().padStart(2, '0'); // yyyymmdd
  const hour = today.getHours().toString().padStart(2, '0');
  const minute = today.getMinutes().toString().padStart(2, '0');
  const second = today.getSeconds().toString().padStart(2, '0');
  if(p == 1){
    return `${year}-${month}-${day}`;
  }else{
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
}

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyANmSg8h-zgpDQtiFtxlzJugpDloX8FjLs",
  authDomain: "jesusdream-3fd59.firebaseapp.com",
  databaseURL: "https://jesusdream-3fd59-default-rtdb.firebaseio.com",
  projectId: "jesusdream-3fd59",
  storageBucket: "jesusdream-3fd59.appspot.com",
  messagingSenderId: "722215627190",
  appId: "1:722215627190:web:6f7047ada83c852d76b917",
  measurementId: "G-61V3WXQJDP"
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireapp);

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

//console.log("app.$cookies.get('jesusdream_tmpr_cookie')", app.$cookies.get('jesusdream_tmpr_cookie'));
if(!app.$cookies.get('jesusdream_tmpr_cookie')){
  var uuid = v4();
  var yyyymmdd = printDate(1);
  app.$cookies.set('jesusdream_tmpr_cookie', uuid, 60 * 60 * 1, null, null, null, 'Strict');
  writeData(`tmprVisit/${yyyymmdd}/${uuid}`, printDate());
} 
if(!app.$cookies.get('jesusdream_prmanent_cookie')){
  var uuid = v4();
  var yyyymmdd = printDate(1);
  app.$cookies.set('jesusdream_prmanent_cookie',uuid, 60 * 60 * 24 * 365, null, null, null, 'Strict');
  writeData(`prmanentVisit/${uuid}`, yyyymmdd);
} 
  
function authFirebase(callback){
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log("Signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ...
    });
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //const uid = user.uid;
      callback(user);
    } else {
      // User is signed out
      // ...
    }
  });
}

app.config.globalProperties.$authFirebase = authFirebase;

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
