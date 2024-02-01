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
        timeout: 3000,
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

    function loginUsers(io) {
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
        io.emit('userList', users);
        return users;
    }

    var interval = null
    var setInter = function (socket) {
        if (interval) clearInterval(interval);
        setLocation(socket);
        interval = setInterval(() => {
            setLocation(socket);
        }, 10000);
    }

    var setLocation = function (socket) {
        console.log("setLocation");
        socket.emit('from server', {}, function (location) {
            socket.handshake.session.location = location;
            socket.handshake.session.save();
            console.log(socket.handshake.session);
            var { location, userInfo} = socket.handshake.session;
            socket.broadcast.emit('from server drawLocation', Object.assign(location, userInfo))
            socket.emit('from server drawLocation', Object.assign(location, userInfo))
        });
    }

    app.io.on('connection', (socket) => {
        try {
            console.log('유저가 들어왔다');

            socket.on('login', async (userInfo, callback) => {
                socket.join(roomName);
                console.log(`socket.id: ${socket.id}  church: ${userInfo.church} nickname: ${userInfo.nickname}`);
                var r = ["Simon", "Tiger", "Oreo", "Sheba", "Cali", "Sadie", "Cookie", "Sam", "Sugar", "Lola"];
                var s = Math.floor(Math.random() * (r.length + 1));
                userInfo.thumbnailImageUrl = "https://api.dicebear.com/7.x/adventurer/svg?seed=" + r[s];
                //const userInfo = await db.getData('user', 'selectUser', info);
                socket.handshake.session.userInfo = userInfo;
                socket.handshake.session.save();

                setInter(socket);

                // socket.emit('login', userInfo);
                callback(userInfo);
                userList.set(socket.id, userInfo)
                const users = loginUsers(app.io);
                // console.log(countRoom(roomName), publicRooms());
            });
            socket.on('logout', (data, callback) => {
                if (interval) clearInterval(interval);
                delete socket.handshake.session.userInfo;
                socket.handshake.session.save();
                userList.delete(socket.id);
                const users = loginUsers(app.io);;
                console.log('유저가 나갔다. logout');
                callback();
            });
            socket.on('send', (sendData) => {
                if (socket.handshake.session.userInfo) {
                    //sendData["userInfo"] = socket.handshake.session.userInfo;
                    var {msg} = sendData;
                    socket.broadcast.emit('from server drawMsg',{msg});
                    socket.emit('from server drawMsg',{msg});
                    //console.log('socket.handshake.session', socket.handshake.session);
                } else {
                    socket.emit('error', { msg: "사용자 로그인이 필요합니다." });
                }
            });
            socket.on('disconnect', () => {
                if (interval) clearInterval(interval);
                userList.delete(socket.id);
                const users = loginUsers(app.io);
                console.log('유저가 나갔다. disconnect');
            });
            socket.on('disconnecting', () => {
                if (interval) clearInterval(interval);
                userList.delete(socket.id);
                const users = loginUsers(app.io);
                console.log('유저가 나갔다. disconnecting');
                // socket.rooms.forEach(room => socket.to(room).emit("bye", countRoom(room) - 1));
            });
        } catch (err) { console.error(err) }
    });

}