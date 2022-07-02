const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
  Permissions,
} = require("discord.js");
const emojis = require("../../../config/emojis.json");
const db = require("quick.db");
const embed = require("../../structures/embeds");

module.exports = {
  name: "setup",
  description: "لصنع او اختيار شات تحكم في البوت عن طريق الرياكشن",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Song} song
   */

  run: async (client, interaction, args) => {
    try {
      if (
        !interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])
      )
        return interaction.react(emojis.error);
      interaction.guild.channels
        .create("𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬-🎶", {
          type: "GUILD_TEXT",
          topic: "Give your server a tune. :notes:",
        })
        .then(async (channel) => {
          embed.done(
            interaction,
            "**𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬 Channel Has Setup Here**: <#" + channel.id + ">",
            "/"
          );
          channel
            .send({
              embeds: [
                new MessageEmbed()
                  .setAuthor("ماكو شي مشتغل اصلا!")
                  .setImage(
                    "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
                  ),
              ],
            })
            .then(async (msg) => {
              msg.react("⏹️");
              msg.react("⏭️");
              msg.react("⏯️");
              msg.react("🔄");
              msg.react("🔀");
              msg.react("🔉");
              msg.react("🔊");
              db.set(`SeTupInFo_${interaction.guild.id}`, {
                channelID: channel.id,
                msgID: msg.id,
              });
            });
        });
    } catch {
      console.log("rexom");
    }
  },
};
