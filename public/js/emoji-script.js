const chatImg = document.getElementsByClassName('chatImgText')[0]
const chatImgBox = document.getElementById('imgLists')

const chatImgText = ['惊讶', '撇嘴', '发呆', '得意', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒']

const imgLists = document.getElementById('imgLists')

const chatImgLi = imgLists.getElementsByTagName('li')

const msgText = document.getElementById("msg")

for (let i = 0; i < chatImgLi.length; i++) {
    const element = chatImgLi[i];
    element.onclick = function () {
        msgText.value += `[${chatImgText[i]}]`
        chatImgBox.style.display = 'none'
    }

}

function addChatImgs() {
    for (let i = 0; i < 100; i++) {
        imgLists.innerHTML += `<li style='background-image: url("image/${i}.gif");'></li>`
    }
}

addChatImgs()

chatImg.onclick = function () {
    chatImgBox.style.display = "block"
}


