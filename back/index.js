const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function(req,res,next){
    console.log('req.url=============',req.url)
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.use(require('connect-history-api-fallback')());
app.use(express.static(path.join(__dirname, 'public')));

require('./services/publicService')(app);
require('./services/userService.js')(app);
require('./services/adminService.js')(app);

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