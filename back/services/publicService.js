const db = require('../modules/dbConnect')

module.exports = (app) => {
    app.get('/api/public/youtube', async (req, res) => {
        const query = req.query;
        console.log(query);
        var result = await db.getList('youtube','selectYoutube', query);
        res.status(200).json(result);
    });
}