const db = require('../modules/dbConnect')
module.exports = (app) => {
    app.get('/api/admin/aply/all', async (req, res)=>{
        var aplyList        = await db.getList('campAply','selectCampAply', {})
        var aplyCampCnt     = await db.getList('campAply','selectCampCntAll', {})
        var aplyPathSe      = await db.getList('campAply','selectPathSeAll', {})
        aplyList.forEach((aply) => {
            var a = aplyCampCnt.find((el, idx, arr)=>{
                return el.seq == aply.seq;
            })
            aply['campCnt'] = a;
            
            var b = aplyPathSe.filter((el) =>{
                return el.seq == aply.seq;
            })
            aply['joinPathSe'] = [];
            b.forEach((el)=>{
                aply['joinPathSe'].push(el.path);
            })
            aply['uuid']='';
        })
        res.status(200).json(aplyList);
    })

    app.post('/api/admin/aply/excel', async(req, res) => {
        const excelService = require('./services/excelService');
        try{
            var aplyList        = await db.getList('campAply','selectCampAply', {})
            var aplyCampCnt     = await db.getList('campAply','selectCampCntAll', {})
            var aplyPathSe      = await db.getList('campAply','selectPathSeAll', {})
            aplyList.forEach((aply) => {
                var a = aplyCampCnt.find((el, idx, arr)=>{
                    return el.seq == aply.seq;
                })
                aply['campCnt'] = a;
                
                var b = aplyPathSe.filter((el) =>{
                    return el.seq == aply.seq;
                })
                aply['joinPathSe'] = [];
                b.forEach((el)=>{
                    aply['joinPathSe'].push(el.path);
                })
            })
            const report = await excelService.makeExcelFile(aplyList);
            res.status(200).json({content: report.toString('base64'), filename: 'testFile', result:true});
        } catch (err) {
            logger.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.put('/api/admin/aply/one', async(req, res)=>{
        db.setData('campAply','updateCampCnt', req.body.campCnt )
        db.setData('campAply','updateCampAply', req.body )
        .then(function(row) {
            res.status(200).json({msg: '변경 성공'});
        })
    })
    app.delete('/api/admin/aply/one', async(req, res)=>{
        db.setData('campAply','deleteAplyCamp', req.body )
        .then(function(row) {
            res.status(200).json({msg: '변경 성공'});
        })
    })
    app.post('/api/admin/message/send', async(req,res) => {
        try {
            var data = kakao.sendMessage(req);
            res.status(200).json(data);
        } catch (err) {
            logger.error("Error >>" + err);
            console.log(err);
            res.status(401).json(err);
        }
    })


    app.get('/api/admin/talk/friends', async(req,res) => {
        const accessToken = req.session.accessToken;
        try {
            const response = await axios({
                method: "get",
                url: "https://kapi.kakao.com/v1/api/talk/friends", // 서버
                headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
            });
            res.status(200).json(response.data);
        } catch (err) {
            logger.error("Error >>" + err);
            res.status(401).json(err);
        }
    })
    app.get('/api/admin/app/users', async(req,res) => {
        console.log(req.query)
        var {kakaoId} = req.query;
        try {
            const response = await axios({
                method: "get",
                url: "https://kapi.kakao.com/v2/app/users", // 서버
                headers: { 'Authorization': `KakaoAK ${process.env.admin_key}` }, // 요청 헤더 설정
                params:{
                    target_id_type: 'user_id',
                    target_ids:'['+kakaoId+']',
                    property_keys:'["kakao_account.","properties.","has_signed_up"]'
                }
            });
            console.log(response);
            res.status(200).json(response.data);
        } catch (err) {
            logger.error("Error >>" + err);
            res.status(401).json(err);
        }
    })

    app.put('/api/admin/aply/one/prgrs', async(req, res)=>{
        const { body: { aplyPrgrs, seq } } = req;
        db.setData('campAply','updateAplyCampPrgrs', {aplyPrgrs:aplyPrgrs, seq:seq} )
        .then(function(row) {
            res.status(200).json({msg: '접수상태 변경 성공'});
        })
    })

    app.get('/api/admin/userList', async(req,res)=>{
        db.getList('user','selectUserList',req.session)
        .then((row)=>{
            res.status(200).json(row);
        })
    })

    app.get('/api/admin/aply/poster', (req,res)=>{
        db.getList('campAply','selectAplyPosterList',req.body)
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.get('/api/admin/showPushToken',async (req,res)=>{
        console.log(req.query);
        const info = await kakao.showPushToken(req.query);
        res.status(200).json(info);
    })
    app.post('/api/admin/regist/push',async (req,res)=>{
        const info = await kakao.registPush(req.body)
        res.status(200).json(info);
    })
}