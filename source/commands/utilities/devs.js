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
            value: "",
            inline: true,
          },
          {
            name: "bot github page",
            value: "[Here](https://github.com/DevelopersSupportAR/rexom.git)",
            inline: true,
          },
          {
            name: "bot support server",
            value: "[Here](https://discord.com/users/746696275214467112)",
            inline: true,
          },
          {
            name: "bot web page",
            value: "[Here](https://discord.rexom.ml)",
            inline: true,
          }
        )
        .setImage(
          "https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067"
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
