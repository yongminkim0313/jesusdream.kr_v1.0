<template>
  
  <v-card class="mx-auto" elevation="5">
    <v-card-title>2024 겨울 YOUTHVISION CAMP</v-card-title>
    <v-card-subtitle>12 120 3000 "하나님 나라를 세우라"</v-card-subtitle>
    <div id="area">
      <iframe
      id="video"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/KFpYMopxueo?si=7SqRUX3eg933Y_aL"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
    </div>
  </v-card>
  <BoardList ref="boardlist"/>
  
</template>

<script setup>
import BoardList from "@/components/BoardList.vue";



import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const testText = ref("testText");
const store = useStore();
const currentUserList = computed(
  () => store.getters["socketStore/currentUserList"]
);
// axios.get("/api/public/upload/9db4e216aea5e6db34aef57e26ea9cce")
// .then(({ data }) => {
//     console.log(data.msg);
// });
// const boardlist = ref(null);
// onMounted(() => {
//   // axios.get("/api/public/testText").then(({ data }) => {
//   //   console.log(data.msg);
//   //   testText.value = data.msg;
//   // });
//   const io = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("tada");
//         } else {
//           entry.target.classList.remove("tada");
//         }
//       });
//     },
//     { threshold: [0.3] }
//   );
//   io.observe(boardlist.value.$el);
// });
</script>

<style>
#area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
#video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}
</style>