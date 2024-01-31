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
        store.dispatch("socketStore/setUserList", data);
        store.dispatch("mapStore/setUserList", data);
    })
    this.socket.on('socketData', (data) => {
        console.log('socketData', data);
        store.dispatch("socketStore/addSocketData", data);
    })
    this.socket.on('from server drawMsg', (data) => {
        store.dispatch("mapStore/drawMsg", data);
        store.dispatch("socketStore/addSocketData", data);
    })
    
    this.socket.on('error', (data) => {
        console.error(data);
    })

    this.socket.connect()
    return this.socket;
}