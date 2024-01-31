export const socketStore = {
    namespaced: true,
    state: () => ({
        isLogin: false,
        userList: [],
        isConnected: false,
        socketData: [],
        socket: null,
        userInfo: {},
        callback: null,
        msg: "",
    }),
    mutations: {
        changeUserList(state, list) { state.userList = list },
        connected(state) { state.isConnected = true; },
        disconnected(state) { state.isConnected = false; },
        login(state, info) { state.isLogin = true; state.userInfo = info; },
        logout(state) { state.isLogin = false; state.userInfo = {}; },
        registSocket(state, socket) { state.socket = socket },
        addSocketData(state, socketData) { state.socketData.push(socketData) },
        addFirstSocketData(state, socketData) { state.socketData.unshift(socketData) },
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
    },
    actions: {
        onConnect({ state, commit, rootState }) { commit("connected"); },
        onDisconnect({ state, commit, rootState }) { commit("disconnected"); commit("logout"); },
        doLogin({ state, commit, rootState }, info) {
            state.socket.emit('login', info, function (data) {
                commit("login", data);
            });
        },
        doLogout({ state, commit, rootState }) {
            state.socket.emit('logout', {}, () => {
                commit("logout");
            });
        },
        doSend({ state, commit, rootState }, sendData) {
            state.socket.emit('send', sendData);
        },
        setUserList({ state, commit, rootState }, userList) {
            commit("changeUserList", userList);
        },
        registSocket({ state, commit, rootState }, socket) {
            commit("registSocket", socket);
        },
        addSocketData({ state, commit, rootState }, socketData) {
            console.log("addSocketData userInfo",state.userInfo);
            commit("addSocketData", Object.assign(socketData, state.userInfo));
        },
        addFirstSocketData({ state, commit, rootState }, socketData) {
            commit("addFirstSocketData", socketData);
        },
    }
}