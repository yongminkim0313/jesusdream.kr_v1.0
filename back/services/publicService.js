const db = require('../modules/dbConnect')

module.exports = (app) => {
    app.get('/api/public/youtube', async (req, res) => {
        const query = req.query;
        console.log(query);
        var result = await db.getList('youtube','selectYoutube', query);
        res.status(200).json(result);
    });
    app.get('/api/public/board', async(req,res)=>{
        db.getList('bbs','selectBoardList',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.get('/api/public/board/detail', async(req,res)=>{
        var {idx} = req.query;
        if(!idx){
            res.status(200).end();
            return;
        }
        // console.log(req.query);
        db.getData('bbs','selectBbsDetail',req.query)
        .then((row)=>{
            res.status(200).json(row);
        })
    })

    app.put('/api/public/bbs/cnt',(req,res)=>{
        db.setData('bbs','updateBbsClickCnt',req.body);
        res.status(200).send('cnt +1');
    })
}