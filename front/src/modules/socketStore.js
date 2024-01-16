export const socketStore = {
    state: () => ({
        isLogin: false,
        userList: [],
        isConnected: false,
        socketData: [],
        socket: null,
        userInfo: {},
        location: null,
        callback: null,
        msg: "",
        afterLoginFn: null,
    }),
    mutations: {
        changeUserList(state, list) { state.userList = list },
        connected(state) { state.isConnected = true; },
        disconnected(state) { state.isConnected = false; },
        login(state) { state.isLogin = true; },
        logout(state) { state.isLogin = false; },
        registSocket(state, socket) { state.socket = socket },
        changeUserInfo(state, info) { state.userInfo = info },
        addSocketData(state, socketData) { state.socketData.push(socketData) },
        addFirstSocketData(state, socketData) { state.socketData.unshift(socketData) },
        setLocatFn(state, callback) { state.callback = callback },
        setLocation(state, location) { state.location = location },
        setAfterLoginFn(state, fn) { state.afterLoginFn = fn },
    },
    getters: {
        currentUserList(state) {
            return state.userList;
        },
        currentLogin(state, getters, rootState) {
            return state.isLogin ? 'login' : 'logout'
        },
        currentConnection(state, getters, rootState) {
            return state.isConnected ? 'connected' : 'disconnected';
        },
        currentSocketData(state) {
            return state.socketData;
        },
        currentUserInfo(state, getters, rootState) {
            return state.userInfo;
        },
        currentSocketData(state, getters, rootState) {
            return state.socketData;
        },
        currentLocations(state, getters, rootState) {
            return state.locations;
        }
    },
    actions: {
        onConnect({ state, commit, rootState }) { commit("connected"); },
        onDisconnect({ state, commit, rootState }) { commit("disconnected"); commit("logout"); },
        doLogin({ state, commit, rootState }, info) {
            state.socket.emit('login', info);
        },
        doLogout({ state, commit, rootState }) {
            state.socket.emit('logout');
            commit("changeUserInfo", {});
            commit("logout");
        },
        doSend({ state, commit, rootState }, sendData) {
            sendData.location = state.location;
            state.socket.emit('send', sendData);
        },
        setUserList({ state, commit, rootState }, userList) {
            console.log(userList);
            commit("changeUserList", userList);
        },
        registSocket({ state, commit, rootState }, socket) {
            commit("registSocket", socket);
        },
        setUserInfo({ state, commit, rootState }, info) {
            console.log('setUserInfo!!!', info);
            commit("changeUserInfo", info);
            commit("login");
            if (typeof state.afterLoginFn == "function") {
                state.afterLoginFn();
                console.log("test");
            }
        },
        addSocketData({ state, commit, rootState }, socketData) {
            if (socketData.location) {
                console.log("위치정보 존재함.", socketData)
                state.msg = socketData.msg;
                socketData.location.msg = socketData.msg;
                state.callback(socketData.location);
            }
            commit("addSocketData", socketData);
        },
        addFirstSocketData({ state, commit, rootState }, socketData) {
            commit("addFirstSocketData", socketData);
        },
        setUserLocation({ state, commit, rootState }, { latitude, longitude, timestamp, thumbnailImageUrl, callback }) {
            // console.log('2.socketStore에서 받고 socket으로 locatiion 으로 전송 setUserLocation 콜백 등록 setLocatFn', { latitude, longitude, timestamp, thumbnailImageUrl, callback});
            commit("setLocatFn", callback);
            commit("setLocation", { latitude, longitude, timestamp });
            state.socket.emit('location', { latitude, longitude, timestamp, thumbnailImageUrl });
        },
        exeLocatFn({ state, commit, rootState }, data) {
            console.log("5. 콜백 exeLocatFn 실행", state.callback, data)
            data.msg = state.msg;
            if (typeof state.callback == "function") state.callback(data);
        },
        setAfterLoginFn({ state, commit, rootState }, fn){
            console.log("setAfterLoginFn", fn)
            commit("setAfterLoginFn", fn);
        }
    }
}