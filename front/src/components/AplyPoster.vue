<template>
  <v-card flat width="800">

    <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>브로셔</v-card-title>
                  <v-img src="../assets/camps/2023_summer/2023_summer_brochure1.jpeg" contain class="white--text align-end" width="100%"></v-img>
                  <v-img src="../assets/camps/2023_summer/2023_summer_brochure2.jpeg" contain class="white--text align-end" width="100%"></v-img>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>포스터</v-card-title>
                  <v-img src="../assets/camps/2023_summer/2023_summer_poster1.webp" contain class="white--text align-end" width="100%"></v-img>
                  <v-img src="../assets/camps/2023_summer/2023_summer_poster2.webp" contain class="white--text align-end" width="100%"></v-img>
                </v-card>
              </v-col>
              <v-row class="pa-2" dense>
                <v-col cols="6">
                  <v-card-text>
                    <!-- <v-select v-model="brochureCnt" :items="cnt50" attach label="브로셔" ></v-select> -->
                    <v-slider v-model="brochureCnt" step="5" ticks="always" tick-size="4" min="5" max="50">
                      <template v-slot:append>
                        <v-text-field v-model="brochureCnt" class="mt-0 pt-0" type="number" style="width: 40px" ></v-text-field>
                      </template>
                    </v-slider>
                  </v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-text>
                      <!-- <v-select v-model="posterCnt" :items="cnt50" attach label="포스터" ></v-select> -->
                      <v-slider v-model="posterCnt" step="5" ticks="always" tick-size="4" min="5" max="50">
                        <template v-slot:append>
                          <v-text-field v-model="posterCnt" class="mt-0 pt-0" type="number" style="width: 40px" ></v-text-field>
                        </template>
                      </v-slider>
                  </v-card-text>
                  </v-col>
              </v-row>
              <v-row class="pa-2" dense>
                <v-col cols="12" md="12" class="d-flex flex-row">
                  <v-icon large color="green darken-2" > mdi-human </v-icon>
                  <v-card-title>신청자 정보</v-card-title>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="aplyName" ref="aplyName" :error-messages="aplyNameErrors" :counter="10" label="신청자 이름" required @input="$v.aplyName.$touch()" @blur="$v.aplyName.$touch()" ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="church" ref="church" :error-messages="churchErrors" :counter="10" label="교회 명" required @input="$v.church.$touch()" @blur="$v.church.$touch()" ></v-text-field>
                </v-col>
                <v-col cols="7" md="9" sm="6">
                  <v-text-field v-model="addr" ref="addr" :error-messages="addrErrors" label="받으실주소" required @input="$v.addr.$touch()" @blur="$v.addr.$touch()" ></v-text-field>

                </v-col>
                <v-col cols="5" md="3" sm="6">
                  <v-btn @click="openAddrPop();">주소검색</v-btn>
                </v-col>
                <v-col cols="12" md="12" class="pa-0">
                  <div id="addrDiv" ref="addrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop('churchAddr')" alt="접기 버튼">
                  </div>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field v-model="dtlAddr" ref="dtlAddr" :error-messages="dtlAddrErrors" label="상세주소" required @input="$v.dtlAddr.$touch()" @blur="$v.dtlAddr.$touch()" ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                  <v-text-field v-model="phone" ref="phone" :error-messages="phoneErrors" label="연락처 (신청자, 인솔자 핸드폰 번호)" required @input="$v.phone.$touch()" @blur="$v.phone.$touch()" ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                  <v-text-field v-model="email" ref="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()" ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-col cols="12" md="12" class="d-flex flex-center">
                <v-checkbox label="카카오 메세지 수신 동의(선택)" @click="authorize()" v-model="msgAgree" readonly></v-checkbox>
              </v-col> -->
              <v-col cols="12" md="12" class="d-flex flex-center">
                    <v-card-actions>
                      <v-btn color="blue" elevation="5" @click="aplyPoster();" class="mx-auto" outlined><strong> 포스터 ( {{brochureCnt}} 장)  브로셔 ( {{posterCnt}} 장) 신청하기</strong></v-btn>
                    </v-card-actions>  
              </v-col>
            </v-row>
    </v-container>
  </v-card>  
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    brochureCnt: { required },
    posterCnt: { required },
    aplyName: { required },
    church: { required },
    addr: { required },
    dtlAddr: { required },
    phone: { required },
    email: { required, email },
  },
  name: 'About',
  components: { },
  computed: {
      aplyNameErrors () {
        const errors = []
        if (!this.$v.aplyName.$dirty) return errors
        !this.$v.aplyName.required && errors.push('신청자명이 필요합니다.')
        return errors
      },
      churchErrors () {
        const errors = []
        if (!this.$v.church.$dirty) return errors
        !this.$v.church.required && errors.push('교회명이 필요합니다.')
        return errors
      },
      addrErrors () {
        const errors = []
        if (!this.$v.addr.$dirty) return errors
        !this.$v.addr.required && errors.push('주소가 필요합니다.')
        return errors
      },
      dtlAddrErrors () {
        const errors = []
        if (!this.$v.dtlAddr.$dirty) return errors
        !this.$v.dtlAddr.required && errors.push('상세주소가 필요합니다.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('연락처가 필요합니다.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('올바른 이메일 주소를 입력해주세요')
        !this.$v.email.required && errors.push('E-mail을 입력해주세요')
        return errors
      },
  },
  data(){return {
    cnt50:[],
    brochureCnt: 10,
    posterCnt: 10,
    aplyName: '',
    church: '',
    addr: '',
    dtlAddr: '',
    phone: '',
    email: '',
    slides: [
      // require('../../assets/brochure/brochure01.jpeg'),
      // require('../../assets/brochure/brochure02.jpeg'),
      // require('../../assets/brochure/brochure03.jpeg'),
      // require('../../assets/brochure/brochure04.jpeg'),
    ],
    msgAgree: false,
  }},
  created() {
    for(var i = 0 ; i < 50; i++){
      this.cnt50.push(i);
    }
    this.getMyAply();
  },
  methods : {
    btnClick: function(){
      this.$router.push('/');
    },
    getMyAply: function(){
        this.$axios.get('/api/user/aply/poster')
        .then((result)=>{
          if(result && result.data.length > 0 ){
            var item = result.data[0];
            this.aplyName = item.aplyName,
            this.church = item.church,
            this.addr = item.fullAddress,
            this.dtlAddr = item.detailAddress,
            this.phone = item.phone,
            this.email = item.email
          }

        }).catch((e)=>{console.log(e)})

    },
    aplyPoster: function(){
      var _this = this;
      this.$v.$touch();
      
      if (this.$v.$invalid) {
        // 1. Loop the keys
        for (let key in Object.keys(this.$v)) {
          // 2. Extract the input
          const input = Object.keys(this.$v)[key];
          // 3. Remove special properties
          if (input.includes("$")) return false;
          // 4. Check for errors
          if (this.$v[input].$error) {
            // 5. Focus the input with the error
            this.$refs[input].focus();
            // 6. Break out of the loop
            break;
          }
        }
      } else {
        
        var aplyContents = {
            brochureCnt: _this.brochureCnt,
            posterCnt: _this.posterCnt,
            aplyName: _this.aplyName,
            church: _this.church,
            addr: _this.addr,
            dtlAddr: _this.dtlAddr,
            phone: _this.phone,
            email: _this.email,
          }
          
        console.log(aplyContents);

        this.$axios.post('/api/user/aply/poster',aplyContents)
        .then((result)=>{
          
          if(result.error_code){
            console.log(error_code);
            return;
          }
          alert('포스터 브로셔 신청 완료!')

          this.$router.push('/');

        }).catch((err)=>{
          this.$awn.alert('등록신청에 오류가 발생하였습니다.'+err);
        })
      }
    },
    openAddrPop (){
        var _this = this;
        var element_wrap = document.getElementById('addrDiv');
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    // 우편번호와 주소 정보를 해당 필드에 
                } 
                  _this.addr = '('+data.zonecode+') '+addr+' '+extraAddr
                  //_this.$refs.dtlAddr.focus();
                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap);
        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
      },
      foldAddrPop(){
        var element_wrap = document.getElementById('addrDiv');
        element_wrap.style.display = 'none';
      },
      authorize(){
        console.log(this.msgAgree);
        if(this.msgAgree) return;
        var _this = this;
        Kakao.Auth.login({
            scope: 'talk_message',
            success: function(response) {
                console.log(response);
                _this.msgAgree = true;
            },
            fail: function(error) {
                console.log(error);
                _this.msgAgree = false;
            }
        });
      },
      myKakaoMsgAgree(){
        var _this = this;
        this.axios.post('/auth/myKakaoMsgAgree')
        .then(function(result){
          _this.msgAgree = result.data;
        })
      }
  }

}
</script>
