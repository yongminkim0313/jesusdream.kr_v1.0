<template>
  <v-container>
    <v-card>
      <section class="notice">
        <v-card-title>
          <h3>{{ boardDetail.title }}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          style="display: inline-block"
          v-html="boardDetail.contents"
          class="ck-content"
        >
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" lg="4" md="4" sm="6">
                <span
                  ><h5>등록일시</h5>
                  <h4>{{ $filters.formatDate(boardDetail.rgstDt) }}</h4></span
                >
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="3">
                <h5>조회수</h5>
                <h4>{{ boardDetail.clickCnt }}</h4>
              </v-col>
              <v-col cols="12" lg="4" md="4" sm="3">
                <h5>등록자</h5>
                <h4>
                  {{ boardDetail.nickname
                  }}<v-avatar size="20">
                    <v-img :src="boardDetail.thumbnailImageUrl"> </v-img
                  ></v-avatar>
                </h4>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="goHome()" class="mx-2" dark>
            <v-icon dark> mdi-home </v-icon> 홈
          </v-btn>
          <v-btn @click="goList()" class="mx-2" dark color="teal">
            <v-icon dark> mdi-format-list-bulleted-square </v-icon> 목록
          </v-btn>
          <v-btn @click="deleteBbs()" class="mx-2" dark color="teal">
            <v-icon dark> mdi-trash-can </v-icon> 삭제
          </v-btn>
          <v-btn @click="edit()" class="mx-2" dark color="teal">
            <v-icon dark> mdi-text-box-edit </v-icon> 수정
          </v-btn>
        </v-card-actions>
        <v-card-actios>
          <v-container>
            <v-row v-show="show">
              <v-col>
                <CKEditor
                :title="boardDetail.title"
                :contents="boardDetail.contents"
                :idx="idx"
                ></CKEditor>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actios>
      </section>
    </v-card>
  </v-container>
</template>
<script setup>
import CKEditor from "@/components/CKEditor.vue";
</script>
<script>
export default {
  data() {
    return {
      boardDetail: {},
      show: false,
      idx: 0,
    };
  },
  created: function () {
    this.idx = this.$route.query.idx;
    this.showDetail(this.$route.query);
  },
  mounted: function () {
    // var _this = this;
    // setTimeout(function(){
    //   console.log(11111111);
    //   _this.boardDetail.title = "!23123";
    // },3000)
  },
  methods: {
    showDetail: function (query) {
      var _this = this;
      console.log(query);
      this.$axios.put("/api/public/bbs/cnt", query);
      this.$axios
        .get("/api/public/board/detail", { params: query })
        .then((result) => {
          _this.boardDetail = result.data;
        });
    },
    deleteBbs: function () {
      var _this = this;
      this.$axios
        .delete("/api/public/bbs/" + _this.boardDetail.idx)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err.response.data.msg);
          console.log(err);
        })
        .then(() => {
          _this.goList();
        });
    },
    goList: function () {
      this.$router.push({
        name: "boardlist",
      });
    },
    goHome: function () {
      this.$router.push({
        name: "home",
      });
    },
    edit: function () {
      this.show = true;
    },
  },
};
</script>