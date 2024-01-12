<template>
  <v-app-bar
    scroll-behavior="fade-image"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-badge
      floating
      dot
      :color="getters.currentConnection == 'connected' ? 'green' : 'red'"
      class="text-red-lighten-2"
    >
      <v-app-bar-title> YOUTHVISION </v-app-bar-title>
    </v-badge>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-form
      v-if="getters.currentLogin == 'logout'"
      validate-on="submit lazy"
      @submit.prevent="submit"
      class="ma-2"
    >
      <v-text-field
        v-model="loginInfo.email"
        :rules="[rules.required]"
        label="ID"
      ></v-text-field>
      <v-text-field
        v-model="loginInfo.pw"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="8자이상"
        hint="최소 8자 이상"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">
        login
        <v-icon
          :color="getters.currentConnection == 'connected' ? 'green' : 'red'"
          >mdi-circle</v-icon
        >
      </v-btn>
      <v-btn @click="testLogin" block class="mt-2">
        Test
      </v-btn>
    </v-form>
    <v-list-item v-else :prepend-avatar="getters.currentUserInfo.thumbnailImageUrl" :title="getters.currentUserInfo.nickname">
      <template v-slot:append>
        <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
      </template>
    </v-list-item>
    
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
        href="#test"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
        href="#"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getters = computed(() => store.getters);
const loginInfo = ref({ email: "kimyongmin1@kakao.com", pw: "password" });
// const loginInfo = ref({ id: "lovely_s2_@nate.com", pw: "password" });
const testLogin = ()=>{
  loginInfo.value = { email: "lovely_s2_@nate.com", pw: "password" }
}
const show1 = ref(null);
const rules = {
  required: (value) => !!value || "필수 입력",
  min: (v) => v.length >= 8 || "최소 8자 이상",
  emailMatch: () => `The email and password you entered don't match`,
};

const submit = async function (event) {
  const results = await event;
  if (results.valid) {
    store.dispatch("doLogin", loginInfo.value);
  }
};
const logout = () => {
  store.dispatch("doLogout");
};
</script>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return { drawer: null };
  },
  created() {},
  watch: {
    $route: function (to, from) {
      console.log("$route to: ", to);
      console.log("$route from: ", from);
    },
  },
  methods: {},
};
</script>
