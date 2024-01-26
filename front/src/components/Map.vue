<template>
  <v-row>
    <div ref="dmap" style="width: 100%; height: 350px; background:rgb(233,233,233);"></div>
  </v-row>
</template>
<script setup>
import Avatar  from '@/components/Avatar.vue';
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const dmap = ref(null);
onMounted(async () => {
  store.dispatch('socketStore/setAfterLoginFn',function(){
    store.dispatch('mapStore/setMap',dmap.value);
  });
});
</script>

