const { v4 } = require('uuid');
const db = require('../modules/dbConnect')
const GoogleApis = require('googleapis').GoogleApis;
const google = new GoogleApis();
var service = google.youtube('v3');
module.exports = (app) => {

    app.get('/api/user/campAply', (req, res) => {
        db.getList('campAply', 'selectCampAply', req.body)
            .then(function (row) {
                // res.setHeader('Content-Type', 'application/json');
                // res.end(JSON.stringify(row));
                res.status(200).json(row);
            })
            .catch(err => {
                res.status(400).json(Error(err))
            });
    })
    app.get('/api/user/campAply/one', (req, res) => {
        db.getData('campAply', 'selectCampAplyOne', req.query)
            .then(function (row) { res.status(200).json(row); })
            .catch(err => { res.status(400).json(Error(err)) });
    })
    app.get('/api/user/joinPathSe/one', (req, res) => {
        db.getList('campAply', 'selectJoinPathSe', req.query)
            .then(function (row) { res.status(200).json(row); })
            .catch(err => { res.status(400).json(Error(err)) });
    })
    app.get('/api/user/campCnt/one', (req, res) => {
        db.getData('campAply', 'selectCampCnt', req.query)
            .then(function (row) { res.status(200).json(row); })
            .catch(err => { res.status(400).json(Error(err)) });
    });
    app.get('/api/user/aply/camp/one', async (req, res) => {
        var campAply = await db.getList('campAply', 'selectCampAplyOne', req.session)
        res.status(200).json(campAply);
    })
    app.get('/api/user/aply/camp/one/uuid', async (req, res) => {
        console.log(req.query);
        var campAply = await db.getList('campAply', 'selectCampAplyOneForUuid', req.query)
        res.status(200).json(campAply);
    })
    app.get('/api/user/aply/poster', async (req, res) => {
        var aplyList = await db.getList('campAply', 'selectCampAplyToPoster', req.session);
        res.status(200).json(aplyList);
    })
    app.post('/api/user/aply/poster', async (req, res) => {
        db.setData('campAply', 'insertAplyPoster', req.body)
            .then(function (row) { console.log(row) })
        res.status(200).json({ msg: 'success' });
    })

    app.post('/api/user/login', async (req, res) => {
        console.log("세션 저장")
        req.session.isAdmin = false;
        var { church, nickname } = req.body;
        if (church.indexOf('예수가') > -1 && church.indexOf('답이다') > -1) {
            req.session.isAdmin = true;
            console.log("관리자 접속")
        }
        req.session.church = church;
        req.session.nickname = nickname;
        req.session.save();
        res.status(200);
    })

    app.get('/api/user/youtube/playlistItems', async (req, res) => {
        var yearVideoId = {
            '2024w': 'PLZgf7s2LDEysMLmAVR_kMhyVtbfLEcnNx',
            '2023s': 'PLZgf7s2LDEyvchDDrCA9GgHcut3A8n9PH',
            '2023w': 'PLZgf7s2LDEyvJEpb54f9v3Acqw9Q6mcC7',
            '2022s': 'PLZgf7s2LDEysLGvp02ZHSzxCwc9DiGNuO',
        }
        var { year, cnt } = req.query;

        service.playlistItems.list({
            key: 'AIzaSyCwH_L35xEqEB0MqOPd6hrmlAkTNLVKueo',
            part: 'snippet',
            playlistId: yearVideoId[year],
            maxResults: cnt
        }, function (err, response) {
            console.log(response.data);
            var list = [];
            for (var v of response.data.items) {
                var tmp = v.snippet
                if (tmp.resourceId && tmp.thumbnails.medium) {
                    var item = {
                        src: tmp.resourceId.videoId,
                        subtitle: tmp.description,
                        title: tmp.title,
                        publishedAt: tmp.publishedAt,
                        thumbnailImageUrl: tmp.thumbnails.medium.url
                    }
                    list.push(item);
                    // console.log(item)
                }
            }
            res.status(200).json({ list, totalCnt: response.data.pageInfo.totalResults });
        })
    })

    // app.get('/api/user/youtube/playlist', async (req, res) => {
    //     service.playlists.list({
    //         key: 'AIzaSyCwH_L35xEqEB0MqOPd6hrmlAkTNLVKueo',
    //         part: 'snippet',
    //         channelId: 'UCKpUmAMNQxzzqcTdpJHHMgA',
    //         maxResults: 20
    //     }, function (err, response) {
    //         res.status(200).json(response.data.items);
    //     })
    // })
}