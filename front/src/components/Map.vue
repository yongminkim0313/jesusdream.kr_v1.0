<template>
  <div ref="dmap" style="width: 100%; height: 350px"></div>
  <v-btn @click="setCenter()">지도 중심좌표 이동시키기</v-btn>
  <v-btn @click="panTo()">지도 중심좌표 부드럽게 이동시키기</v-btn>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
const dmap = ref(null);
var latitude = null;
var longitude = null;
var map;
console.log("start");
function success({ coords, timestamp }) {
  latitude = coords.latitude; // 위도
  longitude = coords.longitude; // 경도
  console.log(
    `위도: ${latitude}, 경도: ${longitude}, 위치 반환 시간: ${timestamp}`
  );
}
function getUserLocation() {
  if (!navigator.geolocation) {
    throw "위치 정보가 지원되지 않습니다.";
  }
  navigator.geolocation.getCurrentPosition(success);
}
getUserLocation();
onMounted(() => {
    var mapContainer = dmap.value, // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
});

function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(latitude, longitude);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function panTo() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}      
</script>