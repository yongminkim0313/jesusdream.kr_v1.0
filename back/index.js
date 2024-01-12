const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require("http");

const app = express();
app.get('/api/public/board', (req, res) => {
    res.status(200).end();
})
app.get('/api/public/testText', (req, res) => {
    res.status(200).json({msg: '이것은 테스트입니다.'})
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
var server = createServer(app);

require('./modules/socketConfig')(server, app);

server.listen(8000,()=>{
    console.log("server 8000")
});