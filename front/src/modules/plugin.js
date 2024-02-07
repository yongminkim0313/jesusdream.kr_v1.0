export default function createWebSocketPlugin(socket) {
    return store => {
        var data = null;
        if (data = window.localStorage.getItem("isLogin")) {
            store.commit("socketStore/login", JSON.parse(data));
            
            socket.emit('login', JSON.parse(data), function (data) {
                store.commit("socketStore/login", data);
                window.localStorage.setItem("isLogin", JSON.stringify(data));
            });
        }

        socket.on("connect", () => {
            store.dispatch("socketStore/onConnect");
        })
        socket.on('disconnect', () => {
            store.dispatch("socketStore/onDisconnect");
        });
        socket.on('userList', (data) => {
            store.dispatch("socketStore/setUserList", data);
            store.dispatch("mapStore/setUserList", data);
        })
        socket.on('socketData', (data) => {
            console.log('socketData', data);
            store.dispatch("socketStore/addSocketData", data);
        })
        socket.on('from server drawMsg', (data) => {
            store.dispatch("mapStore/drawMsg", data);
            store.dispatch("socketStore/addSocketData", data);
        })

        socket.on('from server drawLocation', (data) => {
            store.dispatch("mapStore/drawLocation", data);
        })

        socket.on('from server', ()=> {
            navigator.geolocation.getCurrentPosition((location) => {
                const { coords: { latitude, longitude }, timestamp } = location;
                // console.log('from server', { latitude, longitude })
                store.dispatch("mapStore/moveMap", { latitude, longitude });
                // store.dispatch("mapStore/drawLocation", Object.assign({ latitude, longitude }, userInfo, sendData));
                socket.emit("from client", {latitude, longitude, timestamp});
            });
        });

        socket.on('error', (data) => {
            console.error(data);
        })

        store.subscribeAction((action, state) => {
            // console.log(action)
            // console.log(action.type)
            // console.log(action.payload)
            if (action.type === 'socketStore/doLogin') {
                socket.emit('login', action.payload, function (data) {
                    store.commit("socketStore/login", data);
                    window.localStorage.setItem("isLogin", JSON.stringify(data));
                });
            }

            if (action.type === 'socketStore/doLogout') {
                socket.emit('logout', {}, () => {
                    store.commit("socketStore/logout");
                    window.localStorage.removeItem("isLogin");
                });
            }

            if (action.type === 'socketStore/adminPage') {
                var {answer, successCallback} = action.payload;
                socket.emit('login admin', answer, (res) => {
                    console.log("login admin : ", res);
                    console.log("successCallback : ", successCallback);
                    store.commit("socketStore/setLoginAdminHint", res.msg);
                    if(res.code == 1){
                        successCallback();
                    }
                });
            }
            
        })

        store.subscribe(async (mutation, state) => {
            // console.log(mutation.type);
            // if (mutation.type === 'socketStore/login') {
            //     await socket.emit('login', mutation.payload, function (data) {
            //         console.log(state, data);
            //         commit("socketStore/login", data);
            //         mutation.payload = data;
            //         commit("login", data);
            //     });
            //     socket.emit('update', mutation.payload)
            // }
        })
    }
}
