<template>
  <v-switch
    v-model="chatBox"
    label="red"
    color="red"
    value="red"
    hide-details
  ></v-switch>
  <v-infinite-scroll
    :height="300"
    :items="socketData"
    :onLoad="load"
    side="start"
    v-show="chatBox"
  >
    <template v-for="(item, index) in socketData" :key="item">
      <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        <v-avatar :image="item.userInfo.thumbnailImageUrl"> </v-avatar>
        {{ item.msg }}
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
  get() {
    console.log("computed socketData")
    return store.getters.currentSocketData;
  },
  set(newValue) {
    console.log("newValue", newValue);
  },
});
const items = ref([]);
const enterText = ref(null);
const chatBox = ref(false);

const load = async ({ done }) => {
  done("empty");
};

const doSend = () => {
  store.dispatch("doSend", { msg: enterText.value });
  enterText.value = "";
};
</script>

