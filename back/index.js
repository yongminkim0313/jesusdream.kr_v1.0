const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const session = require('express-session');
const fs = require('fs');
const history = require('connect-history-api-fallback');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res, next) {
  console.log('req.url=============', req.url)
  res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.use(history({
  index: "/index.html",
  // logger: console.log.bind(console),
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function (context) {
        return context.parsedUrl.pathname;
      }
    }
  ]
}));
app.use(express.static(path.join(__dirname, 'public')));



const MySQLStore = require("express-mysql-session")(session);
var opt = { host: "localhost", port: "3306", user: "youthvisionUser", password: "qwer1234", database: "youthvisionDB", };
var sessionStore = new MySQLStore(opt);

app.use(session({
  secret: 'jesusdream.kr',
  resave: false,
  saveUninitialized: true,
  sessionStore: sessionStore,
}))

var options = {
  key: fs.readFileSync(path.join(__dirname, '../../SSL/www_jesusdream.kr.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../SSL/www_jesusdream.kr_cert.crt')),
};

var httpServer = http.createServer(app).listen(8000, () => {
  console.log(`server start! port:8000`)
});
var server = https.createServer(options, app)

require('./modules/socketConfig')(httpServer, app, session);

server.listen(8443, () => {
  console.log(`server start! port:8443`)
});

require('./services/publicService.js')(app);
require('./services/userService.js')(app);
require('./services/adminService.js')(app);