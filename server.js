const http = require('http')
const Koa = require('koa')
const formatMessage = require('./utils/messages')

const app = new Koa()

const server = http.Server(app.callback())
const PORT = 3000


server.listen(PORT, () => {
    console.log(`listening......`)
})

const static = require('koa-static')
app.use(static(__dirname + '/public'))

// Initialization of IO
const socketio = require('socket.io')
const io = socketio(server)


const serverName = 'Server'
const serverColor = '#0000ff'

// if there is a link from client
io.on('connection', (socket) => {
    // callback is executed when a new user join the room
    socket.on('joinRoom', ({ username, room }) => {
        // record the new user
        const user = userJoin({ id: socket.id, username, room })
        // join to subscribe the socket to a given channel
        socket.join(user.room)
        // reply to the new user
        socket.emit('message', formatMessage(serverName, `Welcome ${user.username}`, serverColor))
        // broadcast message of the new to users in the room
        socket.broadcast.emit('message', formatMessage(serverName, `Welcome ${user.username}`, serverColor))
        // update the user list in the room
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
    // callback is executed when a new user leave the room
    socket.on('disconnect', () => {
        // record the left user 
        const user = userLeave(socket.id)
        if (user) {
            // broadcast message of the left to users in the room
            socket.broadcast.emit('message', formatMessage(serverName, `${user.username} left chat room`, serverColor))
            // update the user list in the room
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
    // callback is executed when a user chat in the room
    socket.on('chatMessage', ({ msg, chatColor }) => {
        // var regStr = ['hh', '呵呵', '哈哈']
        // var reguler = eval(`/${regStr.join("|")}\/ig/`)
        // msg = msg.replace(reguler, '***')
        const user = getCurrentUser(socket.id)
        // broadcast message to users in the room
        io.emit('message', formatMessage(user.username, msg, chatColor))
    })
})

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/user')

const Router = require('koa-router')
const { serialize } = require('v8')
const router = new Router()

router.get('/userFound', async (ctx, next) => {
    var uname = ctx.query.username
    var uroom = ctx.query.room
    var roomUserArray = getRoomUsers(uroom)
    ctx.body = roomUserArray.some(user => user.username === uname)
})
app.use(router.routes())
app.use(router.allowedMethods())
