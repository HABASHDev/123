const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
const emojis = require("../../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../../index");
const progressbar = require("string-progressbar");
const embed = require("../../structures/embeds");

module.exports = {
  name: "nowplaying",
  description: "What is paying",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      let lang = settings.lang;
      module.exports.guildID = interaction.guild.id;
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
      const queue = player.getQueue(interaction);
      if (!queue) return embed.notQueue(interaction, lang, "/");
      let track = queue.songs[0];
      if (track) {
        const result = new MessageEmbed()
          .setColor("YELLOW")
          .setImage(
            track.Thumbnail ||
              "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
          )
          .setDescription(
            `${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${
              track.name
            } \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``
          )
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
        interaction
          .followUp({
            embeds: [result],
            ephemeral: false,
            allowedMentions: {
              repliedUser: false,
            },
          })
          .catch((err) => {
            console.log(" ");
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
