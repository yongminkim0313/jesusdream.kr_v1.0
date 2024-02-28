<template>
  <v-container fluid>
    <v-row>
      <v-col class="pb-0">
        <v-chip link>
          <v-icon start icon="mdi-label"></v-icon> total :
          {{ totalCnt }}</v-chip
        >
      </v-col>
      <v-col>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              캠프실황 {{ select.yearNm }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in search"
              :key="item.yearCd"
              :value="item.yearCd"
            >
              <v-list-item-title @click="setSelect(item)">
                {{ item.yearNm }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        md="6"
        sm="12"
        v-for="youtube in youtubeList"
        :key="youtube.src"
      >
        <v-card
          class="pa-2 my-2 ck-content"
          :title="youtube.title"
          :subtitle="$filters.formatDate(youtube.publishedAt)"
          style="height: 220px; white-space: nowrap; overflow: hidden"
          elevation="10"
        >
          <!-- <template v-slot:append>
        </template> -->
          <v-card-text>
            <v-img :src="youtube.thumbnailImageUrl" :alt="youtube.src"></v-img>
          </v-card-text>
          <v-card-actions style="position: absolute; top: 180px; right: 0px">
            <v-icon @click="goYoutube(youtube)">mdi-open-in-new</v-icon>
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
      youtubeList: [],
      totalCnt: 0,
      search: [
        { yearNm: "2024년 겨울", yearCd: "2024w" },
        { yearNm: "2023년 여름", yearCd: "2023s" },
        { yearNm: "2023년 겨울", yearCd: "2023w" },
        { yearNm: "2022년 여름", yearCd: "2022s" },
      ],
      select: { yearNm: "2024년 겨울", yearCd: "2024w" },
    };
  },
  created: function () {
    this.getYoutubeList();
  },
  methods: {
    goYoutube: function (item) {
      var _this = this;
        this.$router.push({
        name: "camplive",
        query: { youtubeSrc: item.src ,yearCd:_this.select.yearCd },
      });
    },
    getYoutubeList: async function () {
      var _this = this;
      this.$axios
        .get("/api/user/youtube/playlistItems", {
          params: { year: _this.select.yearCd, cnt: 4 },
        })
        .then(({ data: { list, totalCnt } }) => {
          this.youtubeList = list;
          this.totalCnt = totalCnt;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.loading = false;
        });
    },
    setSelect: function (item) {
      this.select = item;
      this.getYoutubeList();
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
  