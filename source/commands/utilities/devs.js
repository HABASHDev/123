const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "devs",
  aliases: [""],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      let embed = new MessageEmbed()
        .setAuthor(
          "𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬!.",
          client.user.avatarURL({ dynamic: true }),
          "https://discord.com/users/657596988149202997"
        )
        .setColor("DARK_GOLD")
        .addFields(
          {
            name: "Developers name",
            value: "𝐈𝐒・HΔƁΔЅH .𖤐#3300",
            inline: true,
          },
          {
            name: "server is",
            value: "[Here](https://discord.gg/QYWmeMWu4A)",
            inline: true,
          },
          {
            name: "profile in discord",
            value: "[Here](https://discord.com/users/657596988149202997)",
            inline: true,
          }
        )
        .setImage(
          "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
        );
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch {
      console.log("rexom");
    }
  },
};
