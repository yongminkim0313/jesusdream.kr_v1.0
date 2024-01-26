const db = require('./dbConnect')
const roomName = "testRoom";
const session = require('express-session');

module.exports = (server, app) => {
    const userList = new Map();

    app.io = require('socket.io')(server, {
        maxHttpBufferSize: 1e8,
        cors: { origin: '*', },
        cookie: true,
        path: '/my-ws',
        cleanupEmptyChildNamespaces: true,
    });
    const MySQLStore = require("express-mysql-session")(session);
    var options = { host: "localhost", port: "3306", user: "youthvisionUser", password: "qwer1234", database: "youthvisionDB", };
    var sessionStore = new MySQLStore(options);
    var session_io = session({ key: "jesusdream", secret: "jesusdream.kr", resave: false, saveUninitialized: false, store: sessionStore, })
    var ios = require("express-socket.io-session"); // 소켓 내에서 세션데이터 접근 가능하도록하는 모듈
    app.io.use(ios(session_io, { autoSave: true }));  // 모듈과 세션 연결
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = app.io;

    function publicRooms() {
        const publicRooms = [];
        rooms.forEach((_, key) => {
            if (sids.get(key) === undefined) {
                publicRooms.push(key);
            }
        });
        return publicRooms;
    }

    function countRoom(roomName) {
        return app.io.sockets.adapter.rooms.get(roomName)?.size;
    }

    function loginUsers() {
        const users = []
        const roomUser = app.io.sockets.adapter.rooms.get(roomName);
        userList.forEach((value, key, map) => {
            console.log(`socket id: [${key}] = ${value.nickname}`);
            if (roomUser.has(key)) {
                users.push(value);
            } else {
                userList.delete(key);
            }
        })
        return users;
    }

    var interval = null
    var setInter = function(appio){
        if(interval)clearInterval(interval);
        interval = setInterval(()=>{
            const users = loginUsers();
            appio.emit('userList', users);
            console.log(users, new Date());
        },10000)
    }

    app.io.on('connection', (socket) => {
        try {
            console.log('유저가 들어왔다', socket.handshake.session.userInfo);
            setInter(app.io);
            socket.on('login', async (info) => {
                socket.join(roomName);
                console.log(`socket.id: ${socket.id}  email: ${info.email}`);

                const userInfo = await db.getData('user', 'selectUser', info);
                socket.handshake.session.userInfo = userInfo;
                socket.handshake.session.save();
                socket.emit('login', userInfo);
                userList.set(socket.id, userInfo)
                const users = loginUsers();

                app.io.emit('userList', users);
                socket.to(roomName).emit("welcome", countRoom(roomName));
                socket.to(roomName).emit("roomChange", publicRooms());

                console.log(countRoom(roomName), publicRooms());
            });
            socket.on('logout', () => {
                delete socket.handshake.session.userInfo;
                socket.handshake.session.save();
                userList.delete(socket.id);
                const users = loginUsers();
                app.io.emit('userList', users);
                console.log('유저가 나갔다. logout');
            });
            socket.on('send', (sendData) => {
                if (socket.handshake.session.userInfo) {
                    sendData["userInfo"] = socket.handshake.session.userInfo;
                    app.io.emit('socketData', sendData);
                    console.log('socketData', sendData);
                    socket.handshake.session.sendData = sendData;
                    socket.handshake.session.save();
                    app.io.emit('recept location', socket.handshake.session);
                } else {
                    socket.emit('error', { msg: "사용자 로그인이 필요합니다." });
                }
            });
            socket.on('disconnect', () => {
                userList.delete(socket.id);
                const users = loginUsers();
                app.io.emit('userList', users);
                console.log('유저가 나갔다. disconnect');
            });
            socket.on('disconnecting', () => {
                userList.delete(socket.id);
                const users = loginUsers();
                app.io.emit('userList', users);
                console.log('유저가 나갔다. disconnecting');
                // socket.rooms.forEach(room => socket.to(room).emit("bye", countRoom(room) - 1));
            });
            socket.on('send location', (location) => {
                //console.log("3. 서버에서 location으로 받은후 전체에게 locations로 전송", location);
                socket.handshake.session.location = location;
                socket.handshake.session.save();
            })
            
        } catch (err) { console.error(err) }
    });

}