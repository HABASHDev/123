const { client } = require('../index');

module.exports = {
    "webiste": {
        "support": "https://discord.com/users/657596988149202997",
        "domain": require('../../config/bot.json').domain,
    },
    "config": {
        "port": 8080,
        "collback": require('../../config/bot.json').domain + "/callback",
        "clientID": require('../../config/bot.json').clientID,
        "secret": require('../../config/bot.json').clientSECRET,
    }
}
