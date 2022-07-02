const { MessageEmbed, Collection, Client, Message } = require("discord.js");
const { commands, player } = require("../index");
const db = require("quick.db");
const cooldowns = new Map();
const colors = require("../../config/colors.json");
const emojis = require("../../config/emojis.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = async (client, message) => {
  try {
    module.exports.messageGET = message;
    if (message.channel.type == "DM") return;
    let data = db.fetch(`SeTupInFo_${message.guild.id}`);
    if (data !== null) {
      if (message.channel.id == data.channelID) {
        message.delete();
        if (message.guild.me.voice.channel) {
          if (message.member.voice.channel !== message.guild.me.voice.channel)
            return message.reply({
              content: emojis.error + " | please join a voice channel first!",
            });
        }
        player.play(message, message.content).then(() => {
          setInterval(() => {
            message.channel.messages.fetch(data.msgID).then((msg) => {
              let queue = player.getQueue(message);
              msg.edit({
                embeds: [
                  new MessageEmbed()
                    .setAuthor(
                      queue ? queue.songs[0].name : "No song playing currently"
                    )
                    .setColor(colors.done)
                    .setImage(
                      queue
                        ? queue.songs[0].thumbnail
                        : "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
                    )
                    .setFooter(
                      `${queue ? queue.songs.length : 0} in load | ${
                        require("../music/playSong").song.likes
                      }👍 ${require("../music/playSong").song.dislikes}👎`,
                      client.user.avatarURL({ dynamic: true })
                    ),
                ],
              });
            });
          }, 5000);
        });
      }
    }
    if (message.author.bot) return;
    let settings = db.fetch(`Settings_${message.guild.id}`);
    if (settings == null)
      return db.set(`Settings_${message.guild.id}`, {
        prefix: require("../../config/bot.json").mainPrefix,
        lang: require("../../config/bot.json").mainLang,
      });
    let prefix = settings.prefix;
    let lang = settings.lang;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.includes(prefix)) return;
    if (db.fetch(`DJ_TOG_${message.guild.id}`) == "on") {
      if (
        !message.member.roles.cache.find(
          (role) => role.id == db.fetch(`DJ_${message.guild.id}`)
        )
      )
        return message.reply({
          ephemeral: true,
          content:
            emojis.error + " | لايمكنك استخدام اوامر البوت بدون رتبه ديجي",
        });
    }
    const argument = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = argument.shift().toLowerCase();
    const command =
      commands.get(cmd) ||
      commands.find((a) => a.aliases && a.aliases.includes(cmd));
    if (!command) return;
    if (!cooldowns.has(command.name)) {
      const coll = new Collection();
      cooldowns.set(command.name, coll);
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = 2 * 1000;
    if (time_stamps.has(message.author.id)) {
      const expiration_time =
        time_stamps.get(message.author.id) + cooldown_amount;
      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("#FC0000")
              .setDescription(
                `**🕘 | أنت في فترة التهدئة من فضلك انتظر \`${time_left.toFixed(
                  1
                )}\` ليستخدم \`${prefix}${command.name}\` ثانية**`
              ),
          ],
        });
      }
    }
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    const args = message.content.split(" ");
    try {
      command.run(client, message, args, prefix, lang);
    } catch (e) {
      message.reply({ content: ":x: | هناك خطأ ما ```" + e + "```" });
    }
  } catch (err) {
    console.log(err);
  }
};
