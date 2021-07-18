import Discord from 'discord.js';
const bot = new Discord.Client()

// so we easily know what events are implemented
const botEventNames: Record<Extract<keyof Discord.ClientEvents, 'message'>, keyof Discord.ClientEvents> = {
message: "message"
}

bot.on('message', (message: Discord.Message) => {
    if (message.content === "$loop") { 
      var interval = setInterval (function () {
        message.channel.send("123")
      }, 1 * 1000); 
    }
});

const token = process.env.token

bot.login