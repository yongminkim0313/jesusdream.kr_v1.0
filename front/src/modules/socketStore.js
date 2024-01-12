export const socketStore = {
    state: () => ({
        isLogin: false,
        userList: [],
        isConnected: false,
        socketData: [],
        socket: null,
        userInfo: {},
    }),
    mutations: {
        changeUserList(state, list) { state.userList = list },
        connected(state) { state.isConnected = true; },
        disconnected(state) { state.isConnected = false; },
        login(state) { state.isLogin = true; },
        logout(state) { state.isLogin = false; },
        registSocket(state, socket) { state.socket = socket },
        changeUserInfo(state, info) { state.userInfo = info },
        addSocketData(state,socketData){state.socketData.push(socketData)},
        addFirstSocketData(state,socketData){state.socketData.unshift(socketData)},
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
        currentSocketData(state, getters, rootState){
            return state.socketData;
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
        doSend({ state, commit, rootState },sendData) {
            console.log(sendData)
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
        },
        addSocketData({state,commit, rootState}, socketData){
            commit("addSocketData",socketData);
        },
        addFirstSocketData({state,commit, rootState}, socketData){
            commit("addFirstSocketData",socketData);
        },
    }
}