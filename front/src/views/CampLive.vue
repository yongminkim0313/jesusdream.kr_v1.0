<template>
  <v-card class="mx-auto" elevation="5" :loading="loading">
    <v-card-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> 캠프실황 {{ select.yearNm }} </v-btn>
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
    </v-card-title>
    <v-card
      class="mx-auto"
      elevation="5"
      v-for="item in youtubeList"
      :key="item.src"
    >
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>[{{ $filters.formatDate(item.publishedAt) }}] {{ item.subtitle }}</v-card-subtitle>
      <div id="area">
        <iframe
          id="video"
          width="100%"
          height="100%"
          :src="'https://www.youtube.com/embed/' + item.src"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </v-card>
    <v-divider class="pa-5"></v-divider>
    <v-card class="mx-auto pb-5">
      <v-btn block @click="youtube()" class="mx-auto"
        >유스비전 캠프 영상 더보기</v-btn
      >
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
    this.getPlaylist();
  },
  methods: {
    youtube: function () {
      location.href =
        "https://www.youtube.com/watch?v=F4trhwdQzHM&list=PLCAD7DC0417B0E8BB";
    },
    initialize() {
      this.loading = true;
      this.$axios
        .get("/api/public/youtube", { params: { type: "캠프실황" } })
        .then((result) => {
          this.youtubeList = result.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.loading = false;
        });
    },
    getPlaylist: function () {
      var _this = this;
      this.$axios
        .get("/api/user/youtube/playlistItems", {
          params: { year: _this.select.yearCd },
        })
        .then((result) => {
          console.log(result.data);
          this.youtubeList = result.data;
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
#area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
#video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}
</style>