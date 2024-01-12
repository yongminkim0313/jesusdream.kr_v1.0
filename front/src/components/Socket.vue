<template>
  <ul id="messages"></ul>
  <form action="">
    <input id="m" autocomplete="off" />
    {{ msg }}
    <v-btn @click="sendMsg">보내기</v-btn>
  </form>
</template>

<script setup>

</script>
<script>
export default {
    data: ()=>{
        return{
            msg:'asdfasdf',
            count: 0
        }
    },
    created: function(){
    },
    methods:{
        sendMsg:function(){
            
        }
    }
}
</script>
