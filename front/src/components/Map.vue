<template>
  <v-row>
    <div ref="dmap" style="width: 100%; height: 350px"></div>
  </v-row>
  <v-row>
    <v-btn @click="test()">test</v-btn>
  </v-row>
  <v-row>
    {{ locations }}
  </v-row>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const dmap = ref(null);
const locations = computed(() => store.getters.currentLocations);
const userInfo = computed(() => store.getters.currentUserInfo);

var getPosition = () => {
  return new Promise((resolve, reject) =>
  navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}
var test = function () {
  var map;
  if (!userInfo.value.thumbnailImageUrl) return;
  getPosition().then(({ coords: { latitude, longitude }, timestamp }) => {
    console.log(latitude, longitude, timestamp);
    var locPosition = new kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    var option = { center: locPosition, level: 9 };
    if (!map) {
      map = new kakao.maps.Map(dmap.value, option);
    }
    map.panTo(locPosition);
    //1. 현재 위치 전송
    // console.log("1. 현재 위치 전송");
    store.dispatch("setUserLocation", {
      latitude,
      longitude,
      timestamp,
      thumbnailImageUrl: userInfo.value.thumbnailImageUrl,
      callback: function (data) {
        console.log("9. 콜백 실행!! ", data);
        var content = `<div class="v-avatar v-theme--light v-avatar--density-default v-avatar--size-default v-avatar--variant-flat">`+
                        `<div class="v-responsive v-img" aria-label="">`+
                          `<div class="v-responsive__sizer" style="padding-bottom: 100%;"></div>`+
                          `<img class="v-img__img v-img__img--cover" src="${data.thumbnailImageUrl}" alt="" style="">`+
                        `</div>`+
                        `<span class="v-avatar__underlay"></span>`+
                      `</div>`+
                      `<div>${data.msg}</div>`
                      ;
        var customOverlay = new kakao.maps.CustomOverlay({
          position: locPosition,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91,
        });
        customOverlay.setMap(map); // 커스텀 오버레이를 지도에 표시합니다
        setTimeout(()=>{
          customOverlay.setMap(null); // 커스텀 오버레이를 지도에 표시합니다
        }, 10000);
      },
    });
  });
};

onMounted(async () => {
  store.dispatch("setAfterLoginFn",test);
  // let interval = null;
  // if (!interval) {
  //   interval = setInterval(test, 10000);
  // }
});
</script>