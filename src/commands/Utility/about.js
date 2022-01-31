// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

// command \\

module.exports = {
    name: "about",
    category: "Utility",
    aliases: ['ab'],
    description: "About Command",
    args: false,
    usage: "js!about",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Invite")
                    .setStyle("LINK")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
            );

        const embed = new MessageEmbed()
            .setTitle('**About Command**')
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512 }))
            .setColor(embedNeutral)
            .setTimestamp()
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .addFields(

                {
                    name: "Creator",
                    value: `[EnderDatsIt](https://github.com/Ender-thePlayer)`,
                    inline: true
                },

                {
                    name: "Host",
                    value: `[Railway](https://railway.app/)`,
                    inline: true
                },

                {
                    name: "Support Server",
                    value: `[Discord](https://discord.gg/nmfrhCWzkA)`,
                    inline: true
                },

                {
                    name: "\u200b",
                    value: `**[Valerian Bot](n)** is a multi purpose discord bot made just for you, based on [LavaMusic](https://github.com/brblacky/lavamusic)! My prefix is \`\`${prefix}\`\`. Type \`\`${prefix}help\`\` or \`\`${prefix}aliases\`\` to see the list of valid commands!`,
                    inline: false
                },

                {
                    name: "\u200b",
                    value: `[LavaMusic](https://github.com/brblacky/lavamusic) is a Discord music bot with many great features and supports multiple playback sources. It was created by **[Blacky#6618](https://github.com/brblacky)** and **[Venom#9718](https://github.com/Venom9718/)**.`,
                    inline: false
                },
            )

        message.reply( { embeds: [embed], components: [row] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});

    }
};