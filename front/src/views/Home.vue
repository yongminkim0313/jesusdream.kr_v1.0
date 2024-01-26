<template>
  
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> 접속자 {{ currentUserList.length }}</v-btn>
    </template>
    
    <UserList></UserList>
  </v-menu>
  <ChatList></ChatList>
  <Map></Map>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <BoardList ref="boardlist" class="box" />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
</template>

<script setup>
import UserList from "@/components/UserList.vue";
import BoardList from "@/components/BoardList.vue";
import ChatList from "@/components/ChatList.vue";
import Map from "@/components/Map.vue"; 
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const testText = ref("testText");
const store = useStore();
const currentUserList = computed(() => store.getters["socketStore/currentUserList"]);

const boardlist = ref(null);
onMounted(() => {
  // axios.get("/api/public/testText").then(({ data }) => {
  //   console.log(data.msg);
  //   testText.value = data.msg;
  // });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("tada");
        } else {
          entry.target.classList.remove("tada");
        }
      });
    },
    { threshold: [0.3] }
  );
  io.observe(boardlist.value.$el);
});
</script>

