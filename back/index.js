const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/api/public/testText', (req, res) => {
    res.status(200).json({ msg: '이것은 테스트입니다.' })
})

require('./services/publicService')(app);
require('./services/userService.js')(app);
require('./services/adminService.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

var options = {
    key: fs.readFileSync(path.join(__dirname, '../../SSL/www_jesusdream.kr.key')),
    cert: fs.readFileSync(path.join(__dirname, '../../SSL/www_jesusdream.kr_cert.crt')),
};

var httpServer = http.createServer(app).listen(8000, () => {
    console.log(`server start! port:8000`)
});
var server = https.createServer(options, app)

require('./modules/socketConfig')(httpServer, app);

server.listen(8443, () => {
    console.log(`server start! port:8443`)
});