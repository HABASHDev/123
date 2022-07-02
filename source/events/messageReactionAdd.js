const { MessageEmbed, Client, User, ReactionCollector } = require("discord.js");
const db = require("quick.db");
const emojis = require("../../config/emojis.json");
const { player } = require("../index");
const colors = require("../../config/colors.json");
/**
 *
 * @param {Client} client
 * @param {ReactionCollector} reaction
 * @param {User} user
 */

module.exports = async (client, reaction, user) => {
  try {
    let data = db.fetch(`SeTupInFo_${reaction.message.guild.id}`);
    if (data !== null) {
      if (user.bot) return;
      if (reaction.message.id == data.msgID) {
        if (!reaction.message.guild.members.cache.get(user.id).voice.channel)
          reaction.message.channel.send({
            content: emojis.error + " | انت ماموجود بروم صوتي اصلا؟!",
          });
        if (reaction.message.guild.me.voice.channel) {
          if (
            reaction.message.guild.members.cache.get(user.id).voice.channel
              .id !== reaction.message.guild.me.voice.channel.id
          )
            reaction.message.channel.send({
              content:
                emojis.error +
                " | يجب ان تنضم بلروم الصوتي المثبت به البوت <#" +
                reaction.message.guild.me.voice.channel
                  ? reaction.message.guild.me.voice.channel.id
                  : 0 + ">!",
            });
        }
        let queue = player.getQueue(reaction.message);
        if (reaction.emoji.name == "⏯️") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              if (queue.paused == true) player.resume(reaction.message);
              else player.pause(reaction.message);
            }
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "⏹️") {
          try {
            reaction.message.edit({
              embeds: [
                new MessageEmbed()
                  .setAuthor("ماكو اغنيه مشتغله اصلا؟")
                  .setColor(colors.error)
                  .setImage(
                    "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
                  ),
              ],
            });
            reaction.users.remove(user.id);
            player.stop(reaction.message);
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "⏭️") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              if (queue.songs.map((song, i) => i).length == 1)
                return player.stop(reaction.message);
              setTimeout(() => {
                reaction.message.edit({
                  embeds: [
                    new MessageEmbed()
                      .setAuthor(
                        require("../music/playSong").song.name ||
                          "ماكو اغنيه مشتغله اصلا؟"
                      )
                      .setColor(colors.error)
                      .setImage(
                        require("../music/playSong").song.thumbnail ||
                          "https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024"
                      ),
                  ],
                });
              }, 2000);
              player.skip(reaction.message);
            }
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "🔄") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              if (queue.repeatMode == 0)
                player.setRepeatMode(reaction.message, parseInt(1));
              if (queue.repeatMode == 1)
                player.setRepeatMode(reaction.message, parseInt(0));
            }
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "🔀") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              player.shuffle(reaction.message);
            }
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "🔉") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              let vol = queue.volume;
              player.setVolume(reaction.message, Number(vol) - 10);
            }
          } catch {
            console.log("");
          }
        } else if (reaction.emoji.name == "🔊") {
          try {
            reaction.users.remove(user.id);
            if (queue) {
              let vol = queue.volume;
              player.setVolume(reaction.message, Number(vol) + 10);
            }
          } catch {
            console.log("");
          }
        }
      }
    }
  } catch {
    console.log("rexom");
  }
};
