<template>
  <v-slide-group show-arrows>
    <v-slide-group-item
      v-for="n in currentUserList"
      :key="n.kakaoId"
      v-slot="{ isSelected, toggle }"
    >
      <v-card flat :color="isSelected ? 'primary' : ''" @click="toggle">
        <v-card-title>
          <v-avatar :image="n.thumbnailImageUrl"> </v-avatar>
        </v-card-title>
        <v-card-text
          class="text-caption d-inline-block text-truncate"
          style="max-width: 72px"
          >{{ n.nickname }}
        </v-card-text>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const currentUserList = computed(() => store.getters["socketStore/currentUserList"]);
</script>
  