import io from "socket.io-client";
export const Socket = function (store) {

    this.socket = io(location.href, {
        reconnectionDelay: 10000,
        autoConnect: false,
        path: "/my-ws",
    }),
        this.socket.on("connect", () => {
            store.dispatch("onConnect");
        })
    this.socket.on('disconnect', () => {
        store.dispatch("onDisconnect");
    });
    this.socket.on('userList', (data) => {
        store.dispatch("setUserList", data);
    })
    this.socket.on('login', (data) => {
        store.dispatch("setUserInfo", data);
    })
    this.socket.on('logout', (data) => {
        store.dispatch("setUserInfo", data);
    })
    this.socket.on('logout', (data) => {
        store.dispatch("setUserInfo", data);
    })
    this.socket.on('recieve', (data) => {
        console.log("recieve", data);
        store.dispatch("setUserInfo", data);
    })
    this.socket.on('roomChange', (data) => {
        console.log("roomChange", data);
    })
    this.socket.on('socketData',(data)=>{
        console.log('socketData', data);
        store.dispatch("addSocketData", data);
    })

    //socket 접속 2초후 접속
    var _this = this;
    setTimeout(function () {
        _this.socket.connect();
    }, 2000);
    return this.socket;
}