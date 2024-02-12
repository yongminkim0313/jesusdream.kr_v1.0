<template>
  <v-container fluid>
    <v-row>
      <v-col class="pb-0">
        <v-chip link>
          <v-icon start icon="mdi-label"></v-icon> total :
          {{ totalCnt }}</v-chip
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        md="6"
        sm="12"
        v-for="board in boardList"
        :key="board.idx"
      >
        <v-card
          class="py-0 my-0"
          :title="board.title"
          :subtitle="$filters.formatDate(board.rgstDt)"
          style="height: 220px; white-space: nowrap; overflow: hidden"
          elevation="10"
        >
          <template v-slot:append>
            <v-avatar size="40" variant="tonal">
              <v-img :src="board.thumbnailImageUrl" :alt="board.idx"></v-img>
            </v-avatar>
          </template>
          <v-card-text v-html="board.contents"></v-card-text>
          <v-card-actions style="position: absolute; top: 180px; right: 0px">
            <v-icon @click="goBbs(board)">mdi-open-in-new</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      boardList: [],
      totalCnt: 0,
    };
  },
  created: function () {
    this.getBoardList();
  },
  methods: {
    goBbs: function (item) {
      this.$router.push({
        name: "boarddetail",
        query: { idx: item.idx },
      });
    },
    getBoardList: async function () {
      var {
        data: { list, totalCnt },
      } = await this.$axios.get("/api/public/board");
      this.boardList = list;
      this.totalCnt = totalCnt;
    },
  },
};
</script>
<style>
.board-contents > * {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
