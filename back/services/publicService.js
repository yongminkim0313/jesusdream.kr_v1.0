const db = require('../modules/dbConnect')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const path = require('path');


module.exports = (app) => {
    app.get('/api/public/youtube', async (req, res) => {
        const query = req.query;
        console.log(query);
        var result = await db.getList('youtube', 'selectYoutube', query);
        res.status(200).json(result);
    });
    app.get('/api/public/board', async (req, res) => {
        const { page, showCount } = req.query // 페이지 1 ,보여줄게시물수 10
        var startIdx = 1, endIdx = 4;
        if (page && showCount) {
            startIdx = (page - 1) * showCount + 1;
            endIdx = page * showCount; // 1 * 10 
        }
        const list = await db.getList('bbs', 'selectBoardList', { startIdx, endIdx })
        const { cnt } = await db.getData('bbs', 'selectBoardListCnt', {});
        for(var b of list){
            b.contents = b.contents.replaceAll("\\","");
        }
        res.status(200).json({ list: list, totalCnt: cnt });
    })
    app.get('/api/public/board/detail', async (req, res) => {
        var { idx } = req.query;
        if (!idx) {
            res.status(200).end();
            return;
        }
        // console.log(req.query);
        db.getData('bbs', 'selectBbsDetail', req.query)
            .then((row) => {
                if(row){
                    row.contents = row.contents.replaceAll("\\","");
                }
                res.status(200).json(row);
            })
    })

    app.put('/api/public/bbs/cnt', (req, res) => {
        db.setData('bbs', 'updateBbsClickCnt', req.body);
        res.status(200).send('cnt +1');
    })
    app.post('/api/public/upload', upload.single('file'), function (req, res, next) {
        //업로드 정보 확인
        console.log(req.file);
        db.setData('user', 'insertUpload', req.file)
        var { filename } = req.file;
        //res.status(403).send('error 입니다.')
        res.status(200).json({ path: '/api/public/upload/' + filename })
    });
    app.get('/api/public/upload/:filename', (req, res) => {
        var { filename } = req.params;
        console.log(filename);
        db.getData('user', 'selectUpload', { filename: filename })
            .then((data) => {
                console.log(data);
                res.type(data.mimetype)
                res.sendFile(path.join(__dirname, "../", data.path), {}, function (err) {
                    if (err) res.status(err.status).end();
                })
            })
    })
    app.post('/api/public/bbs', async (req, res) => {
        var { isAdmin } = req.session;
        if(isAdmin){
            db.getData('bbs', 'selectBbsCnt', req.body)
            .then((row) => {
                if (row.cnt < 1) {
                    db.setData('bbs', 'insertBbs', req.body)
                    .then((row) => {
                        res.status(200).json({msg:"신규작성되었습니다."});
                    })
                } else {
                    db.setData('bbs', 'updateBbs', req.body)
                    .then((row) => {
                        res.status(200).json({msg:"수정되었습니다."});
                    })
                }
            })
        }else{
            res.status(401).json({msg:'관리자만 작성하실 수 있습니다.'});
        }
    })
    app.delete('/api/public/bbs/:idx',(req,res)=>{
        var { isAdmin } = req.session;
        if(isAdmin){
            var {idx} = req.params;
            db.setData('bbs','deleteBbs',{idx});
            res.status(200).json({msg:'delete!! '+idx});
        }
        else{
            res.status(401).json({msg:'관리자가 아닙니다.'});
        }
    })
}