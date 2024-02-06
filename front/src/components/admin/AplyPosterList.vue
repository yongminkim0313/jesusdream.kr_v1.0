<template>
    <v-card color="white">
        <v-card-text>
            <v-data-table fixed-header dense :headers="headers" :items="items" item-key="seq" :search="search" hide-default-footer
            :disable-items-per-page="true" :footer-props="{ 'items-per-page-options': [50, -1] }" :loading = "loading" loading-text="로딩중 기다려주세요~" disable-sort >
            <!-- <template v-slot:[`item.bannerContents`]="{ item }">
              <span v-html="item.bannerContents"></span>
            </template> -->
          </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
//aply_name, email, brochure_cnt, poster_cnt, church, addr, dtl_addr, phone, kakao_id
export default {
    data: () => ({
        items:[],
        headers: [
          {text: '번호', value: '', align: 'center',sortable: false },
          {text: '신청자', value: 'aplyName'},
          {text: '이메일', value: 'email'},
          {text: '브로셔', value: 'brochureCnt'},
          {text: '포스터', value: 'posterCnt'},
          {text: '교회명', value: 'church'},
          {text: '주소', value: 'addr'},
          {text: '상세주소', value: 'dtl_addr'},
          {text: '연락처', value: 'phone'},
          {text: '카카오ID', value: 'kakaoId'},
          {text: '수정,삭제', value: 'actions', soçrtable: false },
        ],
        search:'',
        loading: false,
    }),
    created: function(){
        this.getPosterList();
    },
    methods:{
        getPosterList:function(){
            var _this = this;
            _this.loading = true;
            this.$axios.get('/api/admin/aply/poster')
            .then((result)=>{
                console.log(result)
                _this.items = result.data;
                _this.loading = false;
            });
        }
    }
}
</script>