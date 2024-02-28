<template>
  <v-card class="mx-auto" elevation="5" :loading="loading">
    <v-container>
      <v-row>
        <v-col>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props">
                캠프실황 {{ select.yearNm }} total : {{ totalCnt }}
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
        <v-col>
          <v-card
            class="mx-auto"
            elevation="5"
            v-for="item in youtubeList"
            :key="item.src"
            :ref="item.src"
          >
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle
              >[{{ $filters.formatDate(item.publishedAt) }}]
              {{ item.subtitle }}</v-card-subtitle
            >
            <div class="area">
              <iframe
                class="video"
                width="100%"
                height="100%"
                :src="'https://www.youtube.com/embed/' + item.src"
                :title="item.title"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="pa-5"></v-divider>
    <v-card class="mx-auto pb-5">
      <v-btn block @click="youtube()" class="mx-auto">
        유스비전 캠프 영상 더보기
      </v-btn>
    </v-card>
  </v-card>
</template>
<script>
export default {
  name: "CampLive",
  data: () => {
    return {
      loading: true,
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
  created() {
    var { yearCd } = this.$route.query;
    if (yearCd) {
      this.select = this.search.find((item)=>{ return item.yearCd == yearCd;});
    }
    this.getPlaylist();
  },
  watch: {
    youtubeList() {
      // 화면에 추가된 후 동작하도록
      this.$nextTick(() => {
        var { youtubeSrc } = this.$route.query;
        console.log(youtubeSrc);
        let re = this.$refs[youtubeSrc][0];
        setTimeout(() => {
          // re.$el.scrollTo({ top: re.$el.scrollHeight, behavior: "smooth" });
          var my_element = re.$el;

          my_element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }, 500);
      });
    },
  },
  methods: {
    youtube: function () {
      location.href =
        "https://www.youtube.com/watch?v=F4trhwdQzHM&list=PLCAD7DC0417B0E8BB";
    },
    initialize() {
      this.loading = true;
    },
    getPlaylist: function () {
      var _this = this;
      this.$axios
        .get("/api/user/youtube/playlistItems", {
          params: { year: _this.select.yearCd, cnt: 99 },
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
      this.getPlaylist();
    },
  },
};
</script>
<style>
.area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
.video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}
</style>