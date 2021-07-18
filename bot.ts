var Discord = require('discord.js');
var bot = new Discord.Client()

bot.on('ready', function() {
    console.log(bot.user.username);
});

bot.on('message', function() {
    if (message.content === "$loop") { 
      var interval = setInterval (function () {
        message.channel.send("123")
      }, 1 * 1000); 
    }
});