const chatForm = document.getElementById('chat-form')

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = e.target.elements.msg.value
    const msgColor = e.target.elements.chatColor.value
    socket.emit('chatMessage', { msg, msgColor })
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

