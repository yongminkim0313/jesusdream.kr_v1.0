const db = require('../modules/dbConnect')

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
        const data = await db.getList('bbs', 'selectBoardList', { startIdx, endIdx })
        res.status(200).json(data);
    })
    app.get('/api/public/board/totalcnt', async (req, res) => {
        const { cnt } = await db.getData('bbs', 'selectBoardListCnt', {});
        res.status(200).json({totalCnt: cnt});
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
                res.status(200).json(row);
            })
    })

    app.put('/api/public/bbs/cnt', (req, res) => {
        db.setData('bbs', 'updateBbsClickCnt', req.body);
        res.status(200).send('cnt +1');
    })
}