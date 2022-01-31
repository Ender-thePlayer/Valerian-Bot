// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

// command \\

module.exports = {
    name: "serverinfo",
    category: "Guild",
    aliases: [ 'si' ],
    description: "ServerInfo Command",
    args: false,
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client) => {

        const embed = new MessageEmbed()
            .setTitle(`**ServerInfo Command**`)
            .setColor(embedNeutral)
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setFooter(`@${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .addFields(
        
                {
                    name: "Name: ",
                    value: `${message.guild.name}`,
                    inline: false
                },

                {
                    name: "Server ID: ",
                    value: `${message.guild.id}`,
                    inline: false
                },

                {
                    name: "Server was created on: ",
                    value: `${moment(message.guild.createdTimestamp).format('dddd, MMMM Do YYYY')}, ${moment(message.guild.createdTimestamp).format('LT')} (${moment(message.guild.createdTimestamp).fromNow()})`,
                    inline: false
                },

                {
                    name: "Channels: ",
                    value: `${message.guild.channels.cache.size} Total, ${message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size} Text, ${message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size} Voice, ${message.guild.channels.cache.filter(c => c.type === 'GUILD_STAGE_VOICE').size} Voice Stages, ${message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size} Categories,`,
                    inline: false
                },

                {
                    name: "Owner: ",
                    value: `<@${message.guild.ownerId}>`,
                    inline: false
                },

                {
                    name: "Member: ",
                    value: `${message.guild.memberCount} Members`,
                    inline: true
                },

                {
                    name: "Roles Count: ",
                    value: `${message.guild.roles.cache.size -1} Roles`,
                    inline: true,
                },

                {
                    name: `Region: `,
                    value: `${message.guild.preferredLocale}`,
                    inline: true
                },

                {
                    name: `Verification: `,
                    value: message.guild.verified ? 'Verified' : `Not Verified`,
                    inline: true
                },
                {
                    name: 'Boosts: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} boosts` : `There are no boosts`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size} emojis` : 'There are no emojis' ,
                    inline: true
                }
            )
        message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
            setTimeout(() => msg.delete(), 120000)});
    
	},
};
