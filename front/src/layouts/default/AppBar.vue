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
      :color="currentConnection == 'connected' ? 'green' : 'red'"
      class="text-red-lighten-2"
    >
      <v-app-bar-title> YOUTHVISION </v-app-bar-title>
    </v-badge>

    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical">
        <template v-slot:append>
          <UserList></UserList>

        </template>
      </v-btn> -->
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            접속자 {{ currentUserList.length }}</v-btn
          >
        </template>
        <UserList></UserList>
      </v-menu>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-form
      v-if="currentLogin == 'logout'"
      validate-on="submit lazy"
      @submit.prevent="submit"
      class="ma-2"
    >
      <v-text-field
        v-model="loginInfo.church"
        prepend-icon="mdi-church"
        :rules="[rules.required]"
        label="교회명"
        hint="교회명을 입력해주세요"
      ></v-text-field>
      <v-text-field
        v-model="loginInfo.nickname"
        prepend-icon="mdi-account"
        :rules="[rules.required]"
        name="nickname"
        label="이름"
        hint="이름을 입력해주세요"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">
        login
        <v-icon :color="currentConnection == 'connected' ? 'green' : 'red'"
          >mdi-circle</v-icon
        >
      </v-btn>
      <v-btn @click="testLogin" block class="mt-2"> 선영테스트로그인 </v-btn>
    </v-form>
    <v-list-item
      v-else
      :prepend-avatar="currentUserInfo.thumbnailImageUrl"
      :title="currentUserInfo.nickname"
    >
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
        @click="$router.push({ path: '/' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="캠프LIVE"
        value="캠프LIVE"
        @click="$router.push({ path: '/camplive' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="NewsCast"
        value="NewsCast"
        @click="$router.push({ path: '/newscast' })"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import UserList from "@/components/UserList.vue";
const store = useStore();
const currentConnection = computed(
  () => store.getters["socketStore/currentConnection"]
);
const currentUserList = computed(
  () => store.getters["socketStore/currentUserList"]
);
const currentLogin = computed(() => store.getters["socketStore/currentLogin"]);
const currentUserInfo = computed(
  () => store.getters["socketStore/currentUserInfo"]
);
const loginInfo = ref({ church: "주님이꿈꾸신교회", nickname: "김용민" });
// const loginInfo = ref({ id: "lovely_s2_@nate.com", pw: "password" });
const testLogin = () => {
  loginInfo.value = { church: "주님이꿈꾸신교회", nickname: "윤선영" };
  store.dispatch("socketStore/doLogin", loginInfo.value);
};
const show1 = ref(null);
const rules = {
  required: (value) => !!value || "필수 입력",
  min: (v) => v.length >= 8 || "최소 8자 이상",
  emailMatch: () => `The email and password you entered don't match`,
};

const submit = async function (event) {
  const results = await event;
  if (results.valid) {
    store.dispatch("socketStore/doLogin", loginInfo.value);
  }
};
const logout = () => {
  store.dispatch("socketStore/doLogout");
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
