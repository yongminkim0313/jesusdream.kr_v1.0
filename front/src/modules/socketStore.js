
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
        hint: "",
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
        setLoginAdminHint(state, hint) { state.hint = hint;},
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
        loginAdminHint(state, getters, rootState) {
            return state.hint;
        },
    },
    actions: {
        onConnect({ state, commit, rootState }) { commit("connected"); },
        onDisconnect({ state, commit, rootState }) { commit("disconnected"); commit("logout"); },
        doLogin({ state, commit, rootState }, info) {
            commit("login", info);
        },
        doLogout({ state, commit, rootState }) {
            commit("logout");
        },
        doSend({ state, commit, rootState }, sendData) {
        },
        setUserList({ state, commit, rootState }, userList) {
            commit("changeUserList", userList);
        },
        registSocket({ state, commit, rootState }, socket) {
            commit("registSocket", socket);
        },
        addSocketData({ state, commit, rootState }, socketData) {
            console.log("addSocketData userInfo", state.userInfo);
            commit("addSocketData", Object.assign(socketData, state.userInfo));
        },
        addFirstSocketData({ state, commit, rootState }, socketData) {
            commit("addFirstSocketData", socketData);
        },
        adminPage({ state, commit, rootState }, answer){ }
    },
}