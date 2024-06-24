<template>
  
  <v-card class="mx-auto" elevation="5">
    <v-card-title>2024 여름 YOUTHVISION CAMP</v-card-title>
    <v-card-subtitle>12 120 3000 "다음세대들이여 성령의 바람을 일으켜라 24.8.6~8"</v-card-subtitle>
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
  <BoardList ref="boardlist"/>
  <YoutubeList></YoutubeList>
</template>

<script setup>
import BoardList from "@/components/BoardList.vue";
import YoutubeList from "@/components/YoutubeList.vue";


import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const testText = ref("testText");

axios.get("/api/user/youtube/live")
 .then(({ data }) => {
     console.log(data);
});
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