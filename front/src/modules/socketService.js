import io from "socket.io-client";
export const Socket = function (store) {

    this.socket = io(location.href, {
        reconnectionDelay: 10000,
        autoConnect: false,
        path: "/my-ws",
    }),
        this.socket.on("connect", () => {
            store.dispatch("socketStore/onConnect");
        })
    this.socket.on('disconnect', () => {
        store.dispatch("socketStore/onDisconnect");
    });
    this.socket.on('userList', (data) => {
        // console.log("socket.on userList", data);
        store.dispatch("socketStore/setUserList", data);
        store.dispatch("mapStore/setUserList", data);
    })
    this.socket.on('login', (data) => {
        store.dispatch("socketStore/setUserInfo", data);
    })
    this.socket.on('logout', (data) => {
        store.dispatch("socketStore/setUserInfo", data);
    })
    this.socket.on('roomChange', (data) => {
        console.log("socketStore/roomChange", data);
    })
    this.socket.on('socketData',(data)=>{
        console.log('socketData', data);
        store.dispatch("socketStore/addSocketData", data);
    })
    this.socket.on('error', (data)=>{
        console.error(data);
    })

    //socket 접속 2초후 접속
    var _this = this;
    setTimeout(function () {
        _this.socket.connect();
    }, 2000);
    return this.socket;
}