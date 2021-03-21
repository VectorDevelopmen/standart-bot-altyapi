const Discord = require('discord.js'),
    fs = require('fs'),
    client = new Discord.Client(),
    express = require('express');
express();
require('dotenv').config();

client.ayarlar = {
    "prefix": 'egg'
}

client.commands = new Discord.Collection();

fs.readdir('./komutlar/', (err, files) => {
    files.forEach(elm => {
        var props = require(`./komutlar/${elm}`);
        var cmdName = props.name;
        client.commands.set(cmdName, props);
    });
});


client.on('ready', (err) => {
    if (err) return console.log(err);
    console.log('Bot çalışıyor!');
});

client.on('message', message => {
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;
    const pre = client.ayarlar.prefix;
    if (message.content.startsWith(pre)) {
        const args = message.content.slice(pre.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        console.log(command)
        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (!cmd) return;
        if (cmd.enabled != true) return;
        cmd.run(client, message, args);
    }
})

client.login(process.env.DISCORD_TOKEN);