<template>
    <v-card>
        <v-card-text>
            <v-data-table fixed-header dense :headers="headers" :items="userList" item-key="seq" hide-default-footer
                :disable-items-per-page="true" :footer-props="{ 'items-per-page-options': [50, -1] }" :loading = "loading" loading-text="로딩중 기다려주세요~" disable-sort >
                <template v-slot:[`item.thumbnailImageUrl`]="{ item }">
                    <v-avatar size="36px" ><v-img :src="item.thumbnailImageUrl"></v-img> </v-avatar>
                </template>
                <template v-slot:[`item.lastLoginAt`]="{ item }">
                    {{ transDate(item.lastLoginAt) }}
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
  components: { },
    name:'User',
    data: ()=>{
        return {
            loading: false,
            headers: [
                {text: '카카오ID', value: 'kakaoId', align: 'center',sortable: false, width:'10%'},
                {text: '이름', value: 'nickname', width:'10%'}, 
                {text: '프로필사진', value: 'thumbnailImageUrl' , width:'20%'},
                {text: '이메일', value: 'email', width:'20%'},
                {text: '성별', value: 'gender', width:'10%'},
                {text: '최근로그인날짜', value: 'lastLoginAt', width:'20%'},
            ],
            userList: []
        }
    },
    created() { this.getUserList();},
    destroyed() { },
    mounted(){ },
    watch: { },
    methods:{
        transDate: function(str){
            try{
                var d = new Date(str);
                var year    = d.getFullYear();
                var month   = ('0' + (d.getMonth() + 1)).slice(-2);
                var day     = ('0' + d.getDate()).slice(-2);

                var hours   = ('0' + d.getHours()).slice(-2); 
                var minutes = ('0' + d.getMinutes()).slice(-2);
                var seconds = ('0' + d.getSeconds()).slice(-2);

                var dateString = year + '년' + month  + '월' + day + '일';
                var timeString = hours + '시' + minutes  + '분' + seconds+ '초';
                return dateString +' '+ timeString;
            }catch(e){
                return t;
            }
        },
        getUserList: function(){
            this.loading = true;
            this.$axios.get('/api/admin/userList',{})
            .then((result)=>{
                this.userList = result.data;
                this.loading = false;
            });    
        }
    }
}
</script>
