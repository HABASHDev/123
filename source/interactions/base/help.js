const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require("../../../config/emojis.json");

module.exports = {
  name: "help",
  description: "لأضهار قائمة اوامر البوت",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      const prefix = "/";
      const embed = new MessageEmbed()
        .setTitle(`Help Commands`)
        .setColor(0x2f3136)
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
        .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        //.setImage("https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=102473636f72646170702e6e65742f6174746163686d656e74732f3734333838303336333333313432303234312f3930323731313630393131323236343830342f756e6b6e6f776e2e706e67")
        .setDescription(`**[Server Is](https://discord.gg/QYWmeMWu4A)**, . 🎶\n
            Version: \`3.1.2\`
            Prefix: ${prefix}\n
            `)
      require("fs").readdir(__dirname + "/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
          if (!file.endsWith(".js")) return;
          let props = require(__dirname + "/" + file);
          embed.addFields({
            name: prefix + props.name,
            value: props.description || "0",
            inline: true,
          });
        });
      });
      interaction
        .followUp({
          content: emojis.loading + " | أمر المعالجة...",
          ephemeral: true,
          allowedMentions: { repliedUser: false },
        })
        .then(() => {
          setTimeout(() => {
            interaction.editReply({
              content: emojis.done + " | اكتملت المعالجة!.",
              embeds: [embed],
              ephemeral: true,
              allowedMentions: { repliedUser: false },
            });
          }, ms("1s"));
        });
    } catch {
      console.log("rexom");
    }
  },
};
