import io from "socket.io-client";
export const Socket = function () {
    this.socket = io(location.href, {
        reconnectionDelay: 10000,
        autoConnect: false,
        path: "/my-ws",
    });
    return this.socket;
}