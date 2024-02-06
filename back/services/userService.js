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
    
    
}