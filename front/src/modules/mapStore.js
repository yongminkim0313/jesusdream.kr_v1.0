export const mapStore = {
    namespaced: true,
    state: () => ({
        socket: null,
        map: null,
        location: null,
        customOverlays: new Map(),
        userList: new Map(),
        setIntId: null,
    }),
    mutations: {
        setMap(state, map) { state.map = map },
        registSocket(state, socket) { state.socket = socket },
        sendLocation(state, location) {
            state.location = location;
            const { coords: { latitude, longitude }, timestamp } = location;
            state.socket.emit("send location", { latitude, longitude, timestamp });
        },
        changeUserList(state, list) {
            state.userList = new Map();
            for (var u of list) {
                state.userList.set(u.nickname, u);
            }
        },
        clearCustomOverlays(state) {
            state.customOverlays.forEach((value, key, map) => {
                if (!state.userList.has(key)) {
                    value.setMap(null);//오버레이 삭제
                    state.customOverlays.delete(key);
                }
            });
        }
    },
    getters: {},
    actions: {
        setUserList({ state, commit, rootState }, userList) {
            commit("changeUserList", userList);
        },
        registSocket({ state, commit, dispatch }, socket) {
            commit("registSocket", socket);
            socket.on("recept location", ({location, userInfo, sendData}) => { // 2.내위치, 모든사람위치 수신
                // console.log("recept location", location, userInfo);
                dispatch("drawLocation", Object.assign(location, userInfo, sendData));
            })
        },
        async getMyLocation({ state, commit, dispatch }) { // 1.내위치 송신
            const location = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            commit("sendLocation", location);
            dispatch("setInter");// 1-1. 내위치 계속 송신
        },
        setInter({ state, commit, dispatch }) {
            clearInterval(state.setIntId);
            state.setIntId = setInterval(function () {
                console.log("setInterval", new Date());
                navigator.geolocation.getCurrentPosition((location) => {
                    commit("sendLocation", location);
                });
                commit("clearCustomOverlays");
            }, 10000)
        },
        async setMap({ state, commit, dispatch }, mapDiv) {
            var loc = new kakao.maps.LatLng(37.56879, 126.6435802);
            var option = { center: loc, level: 9 };
            var map = new kakao.maps.Map(mapDiv, option);//카카오 맵 생성//

            await dispatch("getMyLocation");
            const { coords: { latitude, longitude }, timestamp } = state.location;
            var locMove = new kakao.maps.LatLng(latitude, longitude);
            map.panTo(locMove);//내 현재위치로 이동
            commit("setMap", map);
        },
        drawLocation({ state, commit }, location) {
            console.log(location)
            var { latitude, longitude, thumbnailImageUrl, nickname, msg} = location;
            if (!thumbnailImageUrl || !nickname) return;
            if (state.customOverlays.has(nickname)) { //기존에 있으면 지움.
                var temp = state.customOverlays.get(nickname);
                // console.log("delete customOverlays", temp);
                temp.setMap(null);//오버레이 삭제
            }
            var content = `<div class="mx-auto text-center"><div class="v-avatar v-theme--light bg-brown v-avatar--density-default v-avatar--size-default v-avatar--variant-flat"><div class="v-responsive v-img" aria-label=""><div class="v-responsive__sizer" style="padding-bottom: 100%;"></div><img class="v-img__img v-img__img--cover" src="${thumbnailImageUrl}" alt="" style=""></div><span class="v-avatar__underlay"></span></div><h3>${nickname}</h3></div>`
            if(msg){
                content+=`<h3>${msg}</h3>`
            }
            var customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(latitude, longitude),
                content: content,
                xAnchor: 0.3,
                yAnchor: 0.91,
            });
            state.customOverlays.set(nickname, customOverlay);
            // console.log("draw customOverlays", customOverlay);
            customOverlay.setMap(state.map); // 커스텀 오버레이를 지도에 표시합니다
        },
    }
}