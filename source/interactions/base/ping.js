const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const emojis = require("../../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../../index");
const embed = require("../../structures/embeds");

module.exports = {
  name: "ping",
  description: "لأضهار سرعة البوت",
  type: "CHAT_INPUT",
  options: [
    {
      name: "name",
      description: "اسم قائمة التشغيل,
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      interaction.reply({
        content: "Ping: " + client.ws.ping + "ms 📶",
      });
    } catch {
      console.log("rexom");
    }
  },
};
