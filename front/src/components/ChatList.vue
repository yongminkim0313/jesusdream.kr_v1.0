<template>
  <v-infinite-scroll
    :height="300"
    :items="socketData"
    :onLoad="load"
    side="start"
  >
    <template v-for="(item, index) in socketData" :key="item">
      <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        <v-avatar :image="item.userInfo.thumbnailImageUrl"> </v-avatar>
        {{ item.sendData }}
      </div>
    </template>
    <template v-slot:empty>
      <v-alert type="warning">대화가 시작되었습니다!</v-alert>
    </template>
  </v-infinite-scroll>
  <v-text-field
    v-model="enterText"
    label="메세지 입력"
    required
    @keypress.enter.prevent="doSend"
  ></v-text-field>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
// const getters = computed(() => store.getters);
const socketData = computed({
    get(){
        return store.getters.currentSocketData;
    },
    set(newValue){
        console.log("newValue", newValue);
    }
});
const items = ref([]);
const enterText = ref(null);

const api = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      var chatList = Array.from(
        { length: 10 },
        (k, v) => v + items.value.at(-1) + 1
      );

      resolve([
        {
          sendData: "우하하ㄷ",
          userInfo: {
            kakaoId: 2245466046,
            nickname: "김용민",
            thumbnailImageUrl:
              "https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg",
            email: "kimyongmin1@kakao.com",
            gender: "male",
          },
        },
      ]);
    }, 1000);
  });
};

const load = async ({ done }) => {
  // Perform API call
  //const res = await api();
  //   console.log(...res);
//   store.dispatch("addFirstSocketData", {
//     sendData: "우하하ㄷ",
//     userInfo: {
//       kakaoId: 2245466046,
//       nickname: "김용민",
//       thumbnailImageUrl:
//         "https://k.kakaocdn.net/dn/ItnjH/btrZV7fmJdd/KJk8jVHQd7GhhfJzqmuXi1/img_110x110.jpg",
//       email: "kimyongmin1@kakao.com",
//       gender: "male",
//     },
//   });
  //items.value.push(...res);
  //done("ok");
  done("empty");
};

const doSend = () => {
  console.log(enterText.value);
  store.dispatch("doSend", { sendData: enterText.value });
};
</script>

