<template>
  <v-card elevation="0">
        <v-card-actions>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
          <v-btn color="warning" elevation="2" @click="excelDown();">
            엑셀다운로드
          </v-btn>
        </v-card-actions>
        <v-data-table fixed-header dense :headers="headers" :items="aplyList" item-key="seq" :search="search" hide-default-footer
            :disable-items-per-page="true" :footer-props="{ 'items-per-page-options': [50, -1] }" :loading = "loading" loading-text="로딩중 기다려주세요~" disable-sort >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800">
            <v-card width="800" class="mx-auto" elevation="5">
            <form>
              <v-container>
                <v-row><!--신청자이름, 직분 -->
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-human
                    </v-icon>
                    <v-card-title>신청자 정보</v-card-title>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.aplyName" :counter="10" label="신청자 이름" required ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select v-model="editedItem.jikbunSe" :items="items" label="직분" required solo dense ></v-select>
                  </v-col>
                </v-row>
                <v-row><!--교회명,교단,목사님성함 -->
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-church
                    </v-icon>
                    <v-card-title>교회정보</v-card-title>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.church"
                      label="교회명 (ex:주님이꿈꾸신교회)"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.churchSe"
                      label="교단 (ex:기독교한국침례회)"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.churchAdtr"
                      label="목사님 성함"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row><!--교회주소-->
                  <v-col cols="7" md="9" sm="6">
                    <v-text-field
                      v-model="editedItem.churchAddr"
                      label="교회주소"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5" md="3" sm="6">
                    <v-btn @click="openAddrPop('churchAddr');">교회주소검색</v-btn>
                  </v-col>
                  <v-col cols="12" md="12" class="pa-0">
                    <div id="churchAddrDiv" ref="churchAddrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop('churchAddr')" alt="접기 버튼">
                    </div>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="editedItem.churchDtlAddr"
                      label="상세주소"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row><!--연락처,Email-->
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-email-box
                    </v-icon>
                    <v-card-title>연락처,E-MAIL 우편물주소</v-card-title>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="연락처 (신청자, 인솔자 핸드폰 번호)"
                      required
                    ></v-text-field>

                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row><!--우편물주소-->
                  <v-col cols="7" md="9" sm="6">
                    <v-text-field
                      v-model="editedItem.fullAddress"
                      label="우편물 주소"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5" md="3" sm="6">
                    <v-btn @click="openAddrPop();">우편물 주소검색</v-btn>
                  </v-col>
                  <v-col cols="12" md="12" class="pa-0">
                    <div id="addrDiv" ref="addrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop()" alt="접기 버튼">
                    </div>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="editedItem.detailAddress"
                      label="우편물 상세주소"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row><!--기간(2박3일)-->
                  <v-divider class="ma-5"></v-divider>
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-calendar
                    </v-icon>
                    <v-card-title>캠프참여기간</v-card-title>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-radio-group v-model="editedItem.schdlSe" row >
                      <v-radio label="2박3일" value="2박3일" ></v-radio>
                      <v-radio label="1박2일" value="1박2일" ></v-radio>
                      <v-radio label="무박2일" value="무박2일" ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row><!--유스비전 참석여부-->
                  <v-divider class="ma-5"></v-divider>
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-home-group
                    </v-icon>
                    <v-card-title>유스비전캠프 참석여부</v-card-title>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-chip-group v-model="editedItem.joinHisSe" active-class="deep-purple accent-4 white--text" column >
                      <v-chip value="처음참석">유스비전캠프에 처음참석합니다</v-chip>
                      <v-chip value="참석한적있음">지난 캠프에 참석한적이 있습니다</v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
                <v-row><!--유스비전 알게된 경로-->
                  <v-divider class="ma-5"></v-divider>
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-youtube-tv
                    </v-icon>
                    <v-card-title>유스비전캠프 알게된 경로</v-card-title>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-chip-group v-model="editedItem.joinPathSe" column multiple >
                      <v-chip filter outlined v-for="path in paths" :key="path.text" :value="path.text" >
                      {{path.text}}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
                <v-row><!--인원선택-->
                  <v-divider class="ma-5"></v-divider>
                  <v-col cols="12" md="12" class="d-flex flex-row">
                    <v-icon large color="green darken-2" >
                      mdi-counter
                    </v-icon>
                    <v-card-title>참여인원</v-card-title>
                  </v-col>
                  <v-col cols="3" md="3" sm="4">
                    <v-select v-model="editedItem.campCnt.chodeung" :items="cnt50" attach label="초등" ></v-select>
                  </v-col>
                  <v-col cols="3" md="3" sm="4">
                    <v-select v-model="editedItem.campCnt.cheongsonyeon" :items="cnt50" attach label="청소년" ></v-select>
                  </v-col>
                  <v-col cols="3" md="3" sm="4">
                    <v-select v-model="editedItem.campCnt.cheongnyeon" :items="cnt50" attach label="청년" ></v-select>
                  </v-col>
                  <v-col cols="3" md="3" sm="4">
                    <v-select v-model="editedItem.campCnt.jangnyeon" :items="cnt50" attach label="장년" ></v-select>
                  </v-col>
                  <v-col cols="3" md="3" sm="4">
                    <v-select v-model="editedItem.campCnt.sayeogja" :items="cnt50" attach label="사역자" ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- 입급은행 -->
                  <v-col cols="12" md="12" sm="12">
                    <v-select v-model="editedItem.bankNm" :items="dpstList" attach label="입금은행" >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field v-model="editedItem.pyrNm" label="입금자명" required ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea label="기타의견 및 메모사항" no-resize rows="2" v-model="editedItem.memo" ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-btn class="mr-4" @click="submit" color="primary" elevation="14" >
                      저장
                    </v-btn>
                    <v-btn class="mr-4" @click="close()" color="primary" elevation="14" >
                      닫기
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

            </form>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.aplyPrgrs`]="{ item }">
          <v-row class="pa-2">
            <v-col cols="10" class="pa-0">
              <v-select
                v-model="item.aplyPrgrs"
                :items="aplyPrgrsList"
                dense
                solo
                success
                hide-details
                class="text-overline"
                @change="saveAply(item)"
              ></v-select>
            </v-col>
            <v-col cols="2" class="pa-0" v-if="item.aplyPrgrs == '등록취소'">
              <v-icon small @click="deleteAply(item)">
                  mdi-delete
              </v-icon>
            </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.aplyDt`]="{ item }">
          {{item.aplyDt }}
        </template>
        <template v-slot:[`item.aplyTotAmt`]="{ item }">
        <v-btn elevation="0" >
          {{item.aplyTotAmt | makeComma }}
        </v-btn>
        </template>
        <template v-slot:[`item.aplyName`]="{ item }">
            {{item.aplyName}}|{{item.jikbunSe}}
            <v-btn v-if="item.uuid" @click="sendMsg(item.uuid)">메세지보내기</v-btn>
        </template>
        <template v-slot:[`item.memo`]="{ item }">
        <v-card width="200" class="overflow-auto">
          <v-card-text>{{item.memo}}</v-card-text>
        </v-card>
        </template>
        <template v-slot:[`item.campCnt`]="{ item }">
        <v-chip small v-if="item.campCnt.chodeung != 0">
            {{ '초등:'+item.campCnt.chodeung}}
        </v-chip>
        <v-chip small v-if="item.campCnt.cheongsonyeon != 0">
            {{ '청소년:'+item.campCnt.cheongsonyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.cheongnyeon != 0">
            {{ '청년:'+item.campCnt.cheongnyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.jangnyeon != 0">
            {{ '장년:'+item.campCnt.jangnyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.sayeogja != 0">
            {{ '사역자:'+item.campCnt.sayeogja}}
        </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
        </template>
        </v-data-table>
  </v-card>
</template>
<script>

export default {
  name:'AplyList',
  components: { },
  data(){
      return {
        dialog:false,
        editedIndex: -1,
        editedItem: {
          aplyName: '',
          jikbunSe: null,
          church:'',
          churchSe:'',
          churchAdtr:'',
          churchAddr:'',
          churchDtlAddr:'',
          churchAddrPop:false,
          schdlSe:'',
          phone: '',
          email: '',
          checkbox: '',
          fullAddress: '',
          detailAddress:'',
          joinHisSe: '',
          joinPathSe: [],
          campCnt:{
            chodeung: 0,
            cheongsonyeon: 0,
            cheongnyeon: 0,
            jangnyeon: 0,
            sayeogja: 0,
          },
          kakaoEmail:'',
          isKakaoLogin: false,
          pyrNm: '',
          checkboxUseRoom: '',
          bankNm: '',
          msgAgree: false,
          memo:'',
        },
        defaultItem: {
          aplyName: '',
          jikbunSe: null,
          church:'',
          churchSe:'',
          churchAdtr:'',
          churchAddr:'',
          churchDtlAddr:'',
          churchAddrPop:false,
          schdlSe:'',
          phone: '',
          email: '',
          checkbox: '',
          fullAddress: '',
          detailAddress:'',
          joinHisSe: '',
          joinPathSe: [],
          campCnt:{
            chodeung: 0,
            cheongsonyeon: 0,
            cheongnyeon: 0,
            jangnyeon: 0,
            sayeogja: 0,
          },
          kakaoEmail:'',
          isKakaoLogin: false,
          pyrNm: '',
          checkboxUseRoom: '',
          bankNm: '',
          msgAgree: false,
          memo:''
        },
        search:'',
        aplyList: [],
        // items: [
        //   { title: '캠프등록현황', icon: 'mdi-home-city' },
        //   { title: '완료내역', icon: 'mdi-account-group-outline' },
        // ],
         headers: [
          {text: '번호', value: 'seq', align: 'center',sortable: false },
          {text: '상태', value: 'aplyPrgrs', width: 150}, //신청진행상황(접수, 접수완료, 신청취소)
          {text: '신청일', value: 'aplyDt' , width: 100}, //신청일시
          {text: '은행', value: 'bankNm', width: 150},
          {text: '입금자명', value: 'pyrNm', width: 110},
          {text: '신청자|직분', value: 'aplyName', width: 100},
          // {text: '신청자직분', value: 'jikbunSe'},
          {text: '교회명', value: 'church', width: 100},
          {text: '교단', value: 'churchSe', width: 100},
          {text: '목사님', value: 'churchAdtr', width: 100},
          {text: '교회주소', value: 'churchAddr', width: 250},
          {text: '교회상세주소', value: 'churchDtlAddr', width: 150},
          {text: '일정', value: 'schdlSe', width: 100},
          {text: '연락처', value: 'phone', width: 100},
          {text: '이메일', value: 'email', width: 100},
          {text: '우편물주소', value: 'fullAddress', width: 250},
          {text: '우편물상세주소', value: 'detailAddress', width: 150},
          {text: '참석여부', value: 'joinHisSe', width: 130},
          {text: '참여경로', value: 'joinPathSe', width: 200},
          {text: '캠프인원', value: 'campCnt'},
          {text: '기타의견 및 메모사항', value: 'memo'},
          {text: '브로셔', value: 'brochureCnt'},
          {text: '포스터', value: 'posterCnt'},
          {text: '수정,삭제', value: 'actions', soçrtable: false },
        ],
        aplyPrgrsList:['접수','가등록','등록완료','등록취소'],
        loading: true,

        items: [ '학생', '교사', '목사', '성도', '전(강)도사', '기타', ],
        paths: [
          { text: '인터넷 홍보(youtube, instar, facebook)', icon: 'mdi-nature', },
          { text: '포스터, 브로셔', icon: 'mdi-glass-wine',},
          { text: '지인소개 및 소문', icon: 'mdi-calendar-range', },
          { text: '지난 캠프 참석', icon: 'mdi-map-marker', },
          { text: '기타', icon: 'mdi-bike', },
        ],
        cnt50:[],
        dpstList:[
          // '농협 351-0823-9838-33'
          // ,'신한 140-011-071790' 
          ,'국민 172601-04-185856'
          // ,'우리 1005-502-838415'
          // ,'새마을 9002-1937-0057-1'
          // ,'우체국 104570-01-002038'
        ],
        events: [],
        today:'',
        calDialog:true,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
      }
    },
  created() {
      for(var i = 0 ; i < 50; i++){
          this.cnt50.push(i);
        }
      this.getAplyAll();
  },
  computed:{
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    },
    yyyymm(){
      return this.today.substring(0,7);
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods : {
    sendMsg(uuid){
      this.$axios.post('/api/admin/message/send',{uuid:uuid, args:{},templateId:77885})
      .then((result)=>{
        console.log(result);
      })
    },
    addEvent(type, title,details,date){
      this.events.push({ type: type, title: title, details: details, date: date, open: false });
    },
    showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
    },
    getAplyAll(){
      var _this = this;
      this.$axios.get('/api/admin/aply/all')
      .then((result)=>{
        _this.aplyList = result.data;
        _this.loading = false;
        for(var idx in result.data){
          this.events.push({ 
              start: result.data[idx].aplyDt , 
              name: result.data[idx].church, 
              color: 'orange',
              date: result.data[idx].date,
              timed: true 
            });
        }
      })
    },
    diffTime (time) { 
      // const today = this.$moment();
      // const diffValue = this.$moment.duration(today.diff(time));
      // return diffValue.days();
      return 0; 
    },
    parseContents(contents){
      return eval(contents);
    },
    saveAply(item){
      this.$axios.put('/api/admin/aply/one/prgrs',item)
      .then((data)=>{
        console.log(data);
       })
    },
    deleteAply(item){
      var _this = this;
      this.$axios.delete('/api/admin/aply/one',{ data: item})
      .then((data)=>{
        console.log(data);
        _this.getAplyAll();
       })
    },
    excelDown(){
      this.$axios.post('/api/admin/aply/excel',{})
      .then((result)=>{
        var resp = result.data;
          if(!resp.result) {
            alert('엑셀 다운로드 중 문제가 발생했습니다.');
            return false;
          }
          let excelUri = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
          let excelUrl = excelUri + resp.content; // resp.content는 엑셀 데이터입니다. 
          let filename = '유스비전 등록신청' // 다운받는 파일의 이름 지정 
          setTimeout(function () {
            var a = document.createElement("a");
            a.href = excelUrl;
            a.download = filename;
            a.click();
          }, 100);
      })
    },
      editItem (item) {
        this.editedIndex = this.aplyList.indexOf(item)
        this.editedItem = Object.assign({ }, item)
          console.log(this.editedItem);
        this.dialog = true
      },

      // deleteItem (item) {
      //   this.editedIndex = this.aplyList.indexOf(item)
      //   this.editedItem = Object.assign({}, item)
      //   this.dialogDelete = true
      // },

      // deleteItemConfirm () {
      //   var deleteItem = this.aplyList.splice(this.editedIndex, 1)
      //   this.axios.delete('/admin/youtube',{data:deleteItem[0]});
      //   this.closeDelete()
      // },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // closeDelete () {
      //   this.dialogDelete = false
      //   this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   })
      // },
      submit () {
        Object.assign(this.aplyList[this.editedIndex], this.editedItem);
        this.$axios.put('/api/admin/aply/one',this.editedItem)
        .then((result)=>{
            console.log(result);
            setTimeout(() => (this.loading = false), 2000)
        }).catch((err)=>{
            console.log(err);
        })
        this.close()
      },
      foldAddrPop(addrSe){
        var element_wrap = document.getElementById('addrDiv');
        if(addrSe) element_wrap = document.getElementById('churchAddrDiv');
        element_wrap.style.display = 'none';
      },
      next(){
        console.log(this.$refs.calendar)
        this.$refs.calendar.next();
      },
      prev(){
        console.log(this.$refs)
        this.$refs.calendar.prev();
      }

    
  }
 };
</script>

