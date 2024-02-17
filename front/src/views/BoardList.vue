<template>
  <v-card>
    <v-card-actions class="mx-2">
      <span class="text-subtitle-2 mx-2">YOUTHVISION 게시판</span>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            페이지당 게시물 {{ showCount }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in [4, 8, 10, 20, 100]"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="setShowCount(item)">{{
              item
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
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
          class="pa-2 my-2 ck-content"
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
    <v-row>
      <div class="text-xs-center">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="pageLength"
          active-color="red"
        ></v-pagination>
      </div>
    </v-row>
    <v-row><v-btn @click="show=true;">작성</v-btn></v-row>
    <v-row v-show="show">
      <CKEditor></CKEditor>
    </v-row>
  </v-container>
</template>
  
<script setup>
import CKEditor from "@/components/CKEditor.vue";

</script>
  <script>
export default {
  data() {
    return {
      boardList: [],
      page: 1,
      showCount: 4,
      pageLength: 0,
      totalCnt: 0,
      show: false,
    };
  },
  created: function () {
    var sc = this.$cookies.get("showCount");
    if (sc) {
      this.showCount = sc;
    }
    this.getBoardList();
  },
  beforeCreate: function () {
    console.log("beforCreate");
  },
  watch: {
    page: function (pre, next) {
      this.getBoardList();
    },
  },
  methods: {
    goBbs: function (item) {
      //this.$axios.put("/api/public/bbs/cnt", item);
      this.$router.push({
        name: "boarddetail",
        query: { idx: item.idx },
      });
    },
    getBoardList: async function () {
      var {
        data: { list, totalCnt },
      } = await this.$axios.get("/api/public/board", {
        params: { page: this.page, showCount: this.showCount },
      });

      this.boardList = list;
      this.totalCnt = totalCnt;
      this.setPageLength();
    },
    setShowCount: function (cnt) {
      this.showCount = cnt;
      this.getBoardList();
      this.setPageLength();
    },
    setPageLength: function () {
      var pageLen = Math.ceil(this.totalCnt / this.showCount);
      this.pageLength = pageLen;
      this.$cookies.set("showCount", this.showCount);
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
  