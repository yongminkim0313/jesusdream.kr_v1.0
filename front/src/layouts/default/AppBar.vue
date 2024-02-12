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
      <v-app-bar-title @click="goHome"> YOUTHVISION </v-app-bar-title>
    </v-badge>

    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical">
        <template v-slot:append>
          <UserList></UserList>

        </template>
      </v-btn> -->
      <v-menu>
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
        hint="교회명을 입력해주세요 ex)주님이꿈꾸신교회"
      ></v-text-field>
      <v-text-field
        v-model="loginInfo.nickname"
        prepend-icon="mdi-account"
        :rules="[rules.required]"
        name="nickname"
        label="이름"
        hint="이름을 입력해주세요 ex)홍길동"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">
        login
        <v-icon :color="currentConnection == 'connected' ? 'green' : 'red'"
          >mdi-circle</v-icon
        >
      </v-btn>
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
        title="HOME"
        value="home"
        @click="$router.push({ path: '/' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="CAMP LIVE"
        value="CAMP LIVE"
        @click="$router.push({ path: '/camplive' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="NEWS CAST"
        value="NewsCast"
        @click="$router.push({ path: '/newscast' })"
      ></v-list-item>
    </v-list>
    <v-list-item>
      <Map></Map>
    </v-list-item>

    <v-list-item-action start>
      <v-spacer></v-spacer>
      <v-dialog
        width="500"
        v-model="dialogActive"
        @update:model-value="dialogOpen"
        eager
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-cog" variant="plain"> </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="관리자폐이지 접속">
            <v-card-text>
              <v-text-field
                autofocus
                ref="myinput"
                v-model="answer"
                label="답은?"
                :hint="loginAdminHint"
                required
                :rules="[rules.required]"
                append-icon="mdi-send"
                @keypress.enter.prevent="loginAdmin"
                @click:append="loginAdmin"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="닫기" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-list-item-action>
  </v-navigation-drawer>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import UserList from "@/components/UserList.vue";
import Map from "@/components/Map.vue";
import ChatList from "@/components/ChatList.vue";
const store = useStore();
const router = useRouter();

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
const loginInfo = ref({ church: "", nickname: "" });

if (location.hostname == "localhost") {
  loginInfo.value = { church: "주님이꿈꾸신교회", nickname: "김용민" };
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
    store.dispatch("socketStore/doLogin", loginInfo.value);
  }
};
const logout = () => {
  store.dispatch("socketStore/doLogout");
};

const dialogActive = ref(false);
const answer = ref("");
const loginAdminHint = computed(
  () => store.getters["socketStore/loginAdminHint"]
);
const loginAdmin = () => {
  store.dispatch("socketStore/adminPage", {
    answer: answer.value,
    successCallback: function () {
      router.push({ path: "/admin" });
      dialogActive.value = false;
    },
  });
};
const goHome = () => {
  router.push({ path: "/" });
};
var myinput = ref(null);
const dialogOpen = (isOpen) => {
  if (isOpen) {
    console.log("open");
  }
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
