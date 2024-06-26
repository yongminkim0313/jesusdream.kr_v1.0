<template>
  <v-card class="mx-auto" elevation="5">
    <v-card-actions>
	<v-spacer></v-spacer>
	<v-btn><a href="https://youthvision.modoo.at/?link=cj2lafx4">유스비전 공식페이지</a></v-btn>
	<v-spacer></v-spacer> 
	</v-card-actions>
    <v-card-title>2024 여름 YOUTHVISION CAMP</v-card-title>
    <v-card-subtitle>"다음세대들이여 성령의 바람을 일으켜라 24.8.6~8"</v-card-subtitle>
    <div id="area">
      <iframe
      id="video"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/x9lEnrKqxPE?si=LPYXPIcUc_CyGi4o"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
    </div>
  </v-card>
  <v-card>
   <v-img src="@/assets/2024_summer.jpeg" />
  	<v-img src="@/assets/2024_summer1.jpeg" />
  	<v-img src="@/assets/2024_summer2.jpeg" />
  	<v-img src="@/assets/2024_summer3.jpeg" />
  	<v-img src="@/assets/2024_summer4.jpeg" />
  </v-card>
</template>

<script setup>
//import BoardList from "@/components/BoardList.vue";
//import YoutubeList from "@/components/YoutubeList.vue";


//import axios from "axios";
//import { computed, onMounted, ref } from "vue";

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