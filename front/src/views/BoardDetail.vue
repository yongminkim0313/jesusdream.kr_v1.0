<template>
    <v-card>


<section class="notice">
    <v-card-title>
            <h3>{{ boardDetail.title }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
        <div v-html="boardDetail.contents"> </div>
        <v-img v-if="boardDetail.atchmnflId" :src="'/api/common/image/'+boardDetail.atchmnflId" max-width="90vw" max-height="90vh" contain> 
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                    <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
    </v-card-text>
    
    <v-divider></v-divider>
    <v-card-actions>
        <v-container>
            <v-row>
                <v-col cols="12" lg="4" md="4" sm="6">
                    <span><h5>등록일시</h5> <h4>{{ $filters.formatDate(boardDetail.rgstDt)}}</h4></span>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="3">
                    <h5>조회수</h5> 
                    <h4>{{ boardDetail.clickCnt  }}</h4>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="3">
                    <h5>등록자</h5>
                    <h4>{{ boardDetail.nickname }}<v-avatar size="20"> <v-img :src="boardDetail.thumbnailImageUrl"> </v-img></v-avatar></h4>
                </v-col>
            </v-row>
        </v-container>
    </v-card-actions>
    <v-card-actions>
        <v-btn @click="goHome();" class="mx-2" dark >
            <v-icon dark> mdi-home </v-icon> 홈
        </v-btn>
        <v-btn @click="goList();" class="mx-2" dark color="teal" >
            <v-icon dark> mdi-format-list-bulleted-square </v-icon> 목록
        </v-btn>
    </v-card-actions>
</section>


    </v-card>
</template>
<script>
export default {
    data () {
        return {
            boardDetail:{}
        }
    },
    created: function(){
        console.log('created')
    },
    mounted: function(){
        console.log('mounted',this.$route.query)
        this.showDetail(this.$route.query);
    },
    methods:{
        showDetail: function(query){
            var _this = this;
            console.log(query);
            this.$axios.put("/api/public/bbs/cnt", query);
            this.$axios.get('/api/public/board/detail', {params:query})
            .then((result)=>{
                _this.boardDetail = result.data;
            });
        },
        goList:function(){
            this.$router.push({
                name: "boardlist",
            });
        },
        goHome: function(){
            this.$router.push({
                name: "home",
            });
        }
    }
}
</script>