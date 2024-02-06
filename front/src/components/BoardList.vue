<template>
  <v-container fluid>
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
          class="pa-2 my-2"
          :title="board.title"
          :subtitle="$filters.formatDate(board.rgstDt)"
          style="height: 220px; white-space: nowrap; overflow: hidden"
          elevation="10"
        >
          <template v-slot:append>
            <v-avatar size="24">
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
    };
  },
  created: function () {
    this.getBoardList();
  },
  methods: {
    goBbs: function (item) {
      this.$axios.put("/api/public/bbs/cnt", item);
      this.$router.push({
        name: "게시판상세",
        query: { idx: item.idx },
      });
    },
    getBoardList: async function () {
      var { data } = await this.$axios.get("/api/public/board");
      this.boardList = data;
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
