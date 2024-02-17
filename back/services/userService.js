const { v4 } = require('uuid');
const db = require('../modules/dbConnect')
module.exports = (app) => {

    app.get('/api/user/campAply',(req,res)=>{
        db.getList('campAply','selectCampAply', req.body)
        .then(function(row) {
            res.status(200).json(row);
        })
        .catch(err=>{
            res.status(400).json(Error(err))
        });
    })
    app.get('/api/user/campAply/one',(req,res)=>{
        db.getData('campAply','selectCampAplyOne', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) });
    })
    app.get('/api/user/joinPathSe/one',(req,res)=>{
        db.getList('campAply','selectJoinPathSe', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) });
    })
    app.get('/api/user/campCnt/one',(req,res)=>{
        db.getData('campAply','selectCampCnt', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) }); 
    });
    app.get('/api/user/aply/camp/one', async(req,res) => {
        var campAply = await db.getList('campAply','selectCampAplyOne', req.session)
        res.status(200).json(campAply);
    })
    app.get('/api/user/aply/camp/one/uuid', async(req,res) => {
        console.log(req.query);
        var campAply = await db.getList('campAply','selectCampAplyOneForUuid', req.query)
        res.status(200).json(campAply);
    })
    app.get('/api/user/aply/poster',async(req, res)=>{
        var aplyList = await db.getList('campAply','selectCampAplyToPoster', req.session);
        res.status(200).json(aplyList);
    })
    app.post('/api/user/aply/poster', async(req,res)=>{
        db.setData('campAply','insertAplyPoster', req.body )
        .then(function(row) {console.log(row)})
        res.status(200).json({msg:'success'});
    })
    
    app.post('/api/user/login', async(req,res)=>{
        console.log("세션 저장")
        req.session.isAdmin = false;
        var { church, nickname } = req.body;
        if(church.indexOf('예수가') > -1 && church.indexOf('답이다') > -1 ){
            req.session.isAdmin = true;
            console.log("관리자 접속")
        }
        req.session.church = church;
        req.session.nickname = nickname;
        req.session.save();
        res.status(200);
    })
    
}