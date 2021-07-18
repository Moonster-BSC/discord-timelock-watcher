import Discord from "discord.js";

export const messageEventHandler = (message: Discord.Message) => {
  if (message.content === "$loop") {
    const interval = setInterval(function () {
      message.channel.send("123");
    }, 1 * 1000);
  }
};
