const moment = require('moment')

function formatMessage(username, text, chatColor) {
    return {
        username,
        text,
        chatColor,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = formatMessage