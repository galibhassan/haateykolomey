const moment = require('moment')

function formatMessage(username, text){
    //var clientName = document.getElementById('clientName')
    //var username = clientName.innerHTML

    return{
        username,
        text,
        time: moment().format('h: mm a')
    }
}

module.exports = formatMessage;