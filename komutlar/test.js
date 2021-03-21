const Discord = require('discord.js');


module.exports = {
    name: 'test',
    enabled: true,
    aliases: ['test-komutu'],
    run(client, message) {
        message.channel.send('Vector Development | Bot başarılı şekilde çalışıyor!')
    }
}