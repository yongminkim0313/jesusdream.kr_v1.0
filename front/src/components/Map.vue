<template>
    <div ref="dmap" style="width: 100%; height: 200px; background:rgb(233,233,233);"></div>
</template>
<script setup>
import Avatar  from '@/components/Avatar.vue';
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const dmap = ref(null);
onMounted(async () => {
    store.dispatch('mapStore/setMap',dmap.value);
});
</script>

