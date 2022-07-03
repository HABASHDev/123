const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "devs",
    description: "لأضهار مطورين البوت الاسطوريين",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        try {
            let embed = new MessageEmbed()
                .setAuthor('𝐈𝐦𝐦𝐨𝐫𝐭𝐚𝐥𝐬!.', client.user.avatarURL({ dynamic: true }), 'https://discord.com/users/657596988149202997')
                .setColor('DARK_GOLD')
                .addFields({
                    name: "Developers name",
                    value: "𝐈𝐒・HΔƁΔЅH .𖤐#3300",
                    inline: true
                }, {
                    name: "Server Is",
                    value: "[Here](https://discord.com/users/657596988149202997)",
                    inline: true
                })
                .setImage("https://cdn.discordapp.com/icons/947196669341106306/7af1e18bb50cce6d2d4730755e08ae1e.png?size=1024f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067");
            interaction.followUp({ embeds: [embed], allowedMentions: {
            repliedUser: false
        }, ephemeral: false });
        } catch {
            console.log('rexom')
        }
    },
};
