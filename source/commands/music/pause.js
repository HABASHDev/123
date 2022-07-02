const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const { player } = require("../../index");
const embed = require("../../structures/embeds");

module.exports = {
  name: "pause",
  aliases: [],
  description: "لأيقاف الموسيقى مؤقتا",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      if (lang == "en") {
        module.exports.guildID = message.guild.id;
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(message, lang);
        const queue = player.getQueue(message);
        if (!queue) return embed.notQueue(message, lang);
        if (queue.paused == true)
          return embed.err(message, "**This Music Is All Ready Paused**");
        player.pause(message);
        embed.done(message, "**Music Has Paused**");
      } else if (lang == "ar") {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(message, lang);
        const queue = player.getQueue(message);
        if (!queue) return embed.notQueue(message, lang);
        if (queue.paused == true)
          return embed.err(
            message,
            "**هذه الموسيقى كلها جاهزة متوقفة مؤقتًا**"
          );
        player.pause(message);
        embed.done(message, "**تم أيقاف الموسقى**");
      }
    } catch {
      console.log("rexom");
    }
  },
};
