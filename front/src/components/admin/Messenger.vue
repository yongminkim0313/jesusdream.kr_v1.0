<!-- https://www.bootdey.com/snippets/view/chat-app#css -->
<template>
    <div class="container">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card chat-app">
            <div class="chat">
                <div class="chat-message clearfix">
                    {{ status }}
                    <div class="input-group mb-0">
                        <v-text-field outlined label="메세지 입력" append-icon="mdi-send" v-model="message.text" @keypress.enter="sendText();">
                        </v-text-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
    components: { },
    name:'Messenger',
    props:{ },
    data: ()=>{
        return{
            message: {text:''},
            status: '',
            rooms: {
                'youthvision01':{msgList: [],img:require('../assets/jesusdream.png'), title:'YOUTHVISION'},
                'youthvision02':{msgList: [],img:require('../assets/jd4.jpeg'), title:'STAFF'}
            },
            selectedRoom: '',
            headerImg: '',
            msgList: [],
            chatTitle: ''
        }
    },
    watch: { 
        msgList: function(){
            // 화면에 추가된 후 동작하도록
            this.$nextTick(() => {
                let msgList = this.$refs.msgList;
                msgList.scrollTo({ top: msgList.scrollHeight, behavior: 'smooth' });
            });
        }
    },
    created: function(){ 
        var _this = this;
        // this.joinRoom('youthvision01');
        // this.joinRoom('youthvision02');
        // this.changeRoom('youthvision01');
        // this.setNickName();
        // this.$socket.onAny((event, ...args) => {
        //     console.log(`got ${event} ${args}`);
        //     this.status = event
        // });
        this.$socket.on('server to client', (data)=>{
            console.log(data);
        });
        this.$socket.on('broadcast', function(msg){
            console.log('broadcast',msg);
            _this.status = msg;
        });
    },
    mounted: function(){ },
    methods:{ 
        pushMsgList: function(data){
            this.rooms[data.roomId].msgList.push(data);
        },
        joinRoom: function(roomId){
            this.$socket.emit("joinRoom", roomId);
        },
        leaveRoom: function(roomId){
            this.$socket.emit("leaveRoom", roomId);
        },
        setNickName: function(){
            this.$socket.emit('nickname','김용민');
        }
    }
}
</script>
<style scoped>
body{
    background-color: #f4f7f6;
    margin-top:20px;
}
.card {
    background: #fff;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
}

.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
}

.people-list .chat-list li.is-active {
    background: #efefef
}

.people-list .chat-list li .name {
    font-size: 15px
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%
}

.people-list img {
    float: left;
    border-radius: 50%
}

.people-list .about {
    float: left;
    padding-left: 8px
}

.people-list .status {
    color: #999;
    font-size: 13px
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
}

.chat .chat-history {
    padding: 20px;
    height: 600px;
    overflow-y: scroll;
    border-bottom: 2px solid #fff
}

.chat .chat-history ul {
    padding: 0
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px
}

.chat .chat-history .message-data {
    margin-bottom: 15px
}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding-left: 6px;
    font-size: 6px;
}

.chat .chat-history .message {
    color: #444;
    padding: 8px 10px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    /* display: inline-block; */
    display: inline-grid;
    position: relative
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .other-message {
    background: #efefef
}

.chat .chat-history .other-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .my-message {
    background: #e8f1f3;
    text-align: right
}

.chat .chat-history .my-message:after {
    border-bottom-color: #e8f1f3;
    left: 91%
}

.chat .chat-message {
    padding: 20px
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
}

.online {
    color: #86c541
}

.offline {
    color: #e47297
}

.me {
    color: #1d8ecd
}

.float-right {
    float: right
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

@media only screen and (max-width: 767px) {
    .chat-app .people-list {
        height: 465px;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none
    }
    .chat-app .people-list.open {
        left: 0
    }
    .chat-app .chat {
        margin: 0
    }
    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0
    }
    .chat-app .chat-history {
        height: 300px;
        overflow-x: auto
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto
    }
}

</style>