const { Client, Guild, MessageEmbed } = require("discord.js");
const db = require("quick.db");

/**
 *
 * @param {Client} client
 * @param {Guild} guild
 */

module.exports = async (client, guild) => {
  try {
    guild.channels
      .create("𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬 🎶", {
        type: "text",
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            deny: ["SEND_MESSAGES"],
            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ADD_REACTIONS"],
          },
        ],
        reason: "𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬",
        topic: "Give your server a tune. 🎶",
      })
      .then((channel) => {
        let embed = new MessageEmbed()
          .setAuthor(
            "Sadk",
            client.user.avatarURL({ dynamic: true }),
            "https://discord.com/users/657596988149202997"
          )
          .setColor("BLUE")
          .setImage(
            "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=10246e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067"
          )
          .setTitle("**Link Server Is**")
          .setURL("https://discord.gg/QYWmeMWu4A")
          .setFooter(
            "The bot was made by: Sadk, nicknamed Habash",
            client.user.avatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setDescription(`**شكراً ڵـڱ لستخدام \`Sadk Bot for server imortals\` بوت الموسيقى**
            
            > Developer: Sadk
            > Bot imortals Server: [Here](https://discord.com/users/657596988149202997)`);
        channel.send({
          content: "> **Give your server a tune. 🎶**",
          embeds: [embed],
          components: [],
        });
      })
      .catch((err) => {});
  } catch (err) {
    console.log(err);
  }
  require("../functions/guildCreateFunction")
    .get(guild, db)
    .catch((err) => console.log(err));
};
