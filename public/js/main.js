// import socket and qs via script tag in default.html
const socket = io()

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
socket.emit('joinRoom', { username, room })

function outputMessage(message) {
    const div = document.createElement('div')
    var reg = /\[.+?\]/

    message.text = message.text.replace(reg, function (data) {
        myData = data.substr(1, data.length - 2)

        var imgText = chatImgText.indexOf(myData)

        var img = `<img src/image/${imgText + 1}.gif" style="width:20px;height:20px"/>`
        return img
    })
    div.innerHTML = `<p class="meta"><span class="text" style="color:${message.chatColor}">${message.text}</span></p>`
    document.querySelector('.chat-messages').prepend(div)
}

// receive message from serve
socket.on('message', (message, chatColor) => {
    const chatMessages = document.querySelector('.chat-messages')
    outputMessage(message, chatColor)
    chatMessages.scrollTop = chatMessages.scrollHeight
})



function outputRoomName(room) {
    document.getElementById('room-name').innerText = room
}
function outputUsers(users) {
    console.log(users, 99)
    if (!users) return false
    document.getElementById('users').innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})