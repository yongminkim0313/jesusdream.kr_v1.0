const axios = require('axios');
const { v4 } =  require('uuid');

exports.getToken = async function (code){
    try{
        const response = await axios({
            method: "post",
            url: "https://kauth.kakao.com/oauth/token",
            headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            params: {
                grant_type: 'authorization_code',
                client_id: `${process.env.client_id}`,
                redirect_uri: `${process.env.redirect_uri}`,
                code: code
            },
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.getUserInfo = async function(access_token){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            },        
            params: {
                secure_resource: true,
                property_keys: `${process.env.property_keys}`
            },
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.logout = async function(accessToken){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v1/user/logout", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.agree = async function(accessToken){
    try{
        const response = await axios({
            method: "get",
            url: "https://kapi.kakao.com/v2/user/scopes", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        var resData = response.data;
        var talkMsg = resData.scopes.find(data=>{ return data.id =="talk_message";})
        return talkMsg.agreed;
    }catch(err){
        return Error(err);
    }
}

exports.showPushToken = async function(user){
    console.log('showPushToken', user);
    try{
        const response = await axios({
            method: "get",
            url: "https://kapi.kakao.com/v2/push/tokens", // 서버
            headers: { 'Authorization': `KakaoAK ${process.env.admin_key}` }, // 요청 헤더 설정
            params: {
                uuid: user.uuid,
            },
        });
        console.log(response.data);
        var resData = response.data;
        return resData;
    }catch(err){
        return Error(err);
    }
}

exports.registPush = async function(user){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/push/register", // 서버
            headers: { 'Authorization': `KakaoAK ${process.env.admin_key}` }, // 요청 헤더 설정
            params: {
                uuid: user.uuid,
                device_id: v4(),
                push_type: 'fcm',
                push_token: `${process.env.fcm_push_token}`
            },
        });
        console.log(response);
        var resData = response.data;
        return resData;
    }catch(err){
        return Error(err);
    }
}
exports.sendPush = async function(user){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/push/send", // 서버
            headers: { 'Authorization': `KakaoAK ${process.env.admin_key}` }, // 요청 헤더 설정
            params: {
                uuids: `["${user.uuid}"]`,
                push_message:{
                    "for_fcm":{}
                  }
            },
        });
        console.log(response);
        var resData = response.data;
        return resData;
    }catch(err){
        return Error(err);
    }
}
exports.sendMessage = async function(req){
    try{
        const {body: {uuid, args,templateId},session: {accessToken}} = req;
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v1/api/talk/friends/message/send", // 서버
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            params:{
                    receiver_uuids: '["'+uuid+'"]',
                    template_id : templateId,
                    template_args : args
                }
        });
        return response.data;
    }catch(err){
        return Error(err);
    }
}
exports.sendMeAplyCampInfo = async function(params){
    try{
        const {args,templateId,accessToken} = params;
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/api/talk/memo/send", // 서버
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            params:{
                template_id : templateId,
                template_args : args
            }
        });
        return response.data;
    }catch(err){
        return Error(err);
    }
}

exports.KoGPT = async function(prompt){
    try{
        const response = await axios({
            method: "post",
            url: "https://api.kakaobrain.com/v1/inference/kogpt/generation", // 서버
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `KakaoAK ${process.env.admin_key}`
            },
            data:{
                prompt : prompt,
                max_tokens : 80,
                temperature: 0.7,
                top_p: 0.8,
                n : 1
            }
        });
        return response.data;
    }catch(err){
        return Error(err);
    }
}

