<template>
        <v-card flat>
          <v-tabs v-model="tab" background-color="transparent" color="basil" grow >
            <v-tab v-for="item in items" :key="item" >
              {{ item }}
            </v-tab>
          </v-tabs>
          
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, idx) in items" :key="item" >
              <v-row v-if="idx == 0">
                <v-col cols="6">
                  <v-select v-model="select" :hint="`${select.dt}, ${select.dt}`" :items="dtList" item-text="dt" item-value="dt"
                  label="날짜" persistent-hint return-object single-line hide-details @change="dayChange();" ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>

          <v-data-table :headers="headers" :items="connectLogList" :search="search" item-key="name"
          :items-per-page="20" :custom-sort="customSort">
            <template v-slot:body="{items, headers}">
              <tbody name="list" v-if="items.length > 0">
                <tr v-for="(val , index) in items" :key="index" class="item-row">
                  <td class="pa-0" style="width:50px; font-size:9px;">{{val.conectDt | formatDate}}</td>
                    <td class="pa-0" style="width:60px; font-size:9px;">{{val.nickname}}</td>  
                    <td class="pa-0" style="width:33px; font-size:9px;"><v-avatar size="30px" ><v-img :src="val.thumbnailImageUrl"></v-img> </v-avatar></td>  
                    <td class="pa-0" style="width:80px; font-size:9px;">{{val.osNm}}</td>
                    <td class="pa-0" style="width:60px; font-size:9px;">{{val.browserNm}}</td>
                    <td class="pa-0" style="width:80px; font-size:9px;">{{val.conectUrl}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td :colspan="headers.length" style="text-align: center">결과 데이터 없음</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
    </template>
    <script>
    export default {
        name:'ConnectLog',
        data () {
        return {
          search: '',
          select: { dt: ''},
          dtList: [ ],
          headers: [
            { text: 'conectDt', value: 'conectDt' },
            { text: '이름', value: 'nickname'}, 
            { text: '프로필사진', value: 'thumbnailImageUrl'},
            { text: 'osNm', value: 'osNm' },
            { text: 'browserNm', value: 'browserNm', },
            { text: 'refUrl', value: 'refUrl' },
          ],
          tab: null,
          items: [ '검색', '로그인o', '로그인x', '전체'],
          tabsItems:[[],[],[],[]],
          tabsShow:[false, false, false, false],
          connectLogList: [],
          searchType:'search',
        }
      },
      created: function(){
        this.getDay();
        var today = this.$common.getDate();
        this.select['dt'] = today;
        this.get();
      },
      watch: { 
        tab: function(val){
          switch(val) {
            case 0: this.searchType = 'search';
            break;
            case 1: this.searchType = 'isLogin';
            break;
            case 2: this.searchType = 'isNotLogin';
            break;
            case 3: this.searchType = 'all';
            break;
            default:
          }  
          console.log(val);
          this.tabChange(val);
        }
      },
      mounted: function(){ },
      methods:{
        get: function(tab){
          var _this = this;
          this.$axios.get('/api/common/connectLog',{params :{ dt: _this.select.dt, searchType: this.searchType}})
            .then((res)=>{
              console.log(res.data)
              _this.tabsItems[tab] = [];
              _this.connectLogList = Object.assign(_this.tabsItems[tab], res.data);
              this.tabsShow[tab] = true;
            })
        },
        dayChange: function(){
          this.get(this.tab);
        },
        tabChange: function(tab){
          if(!this.tabsShow[tab]) this.get(tab);
          else this.connectLogList = this.tabsItems[tab];
        },
        getDay : async function(){
          var _this = this;
          this.$axios.get('/api/common/connectLog/dt')
            .then((res)=>{
              _this.dtList = res.data;
            })
            
        },
        customSort: function(items, index, isDesc) {
          items.sort((b,a) => {
              if (index[0]=='conectDt') {
                if (!isDesc[0]) {
                    return new Date(b[index]) - new Date(a[index]);
                } else {
                    return new Date(a[index]) - new Date(b[index]);
                }
              }
              else {
                if(typeof a[index] !== 'undefined'){
                  if (!isDesc[0]) {
                    return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
                  }
                  else {
                      return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
                  }
                }
              }
          });
          return items;
        }
    }
    }
    </script>
    <style scoped>
    .list-enter-active,
    .list-leave-active {
      transition: transform 0.8s, opacity 1.8s, color 10s ease-out;
    }
    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(100%);
      color: red;
    }
    .list-move {
      transition: transform 0.5s, color 10s ease-out;
    }
    .item-row {
      display: table-row;
    }
    
    * {
    font-size: 9px;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
        height: 2px;
    }

    </style>