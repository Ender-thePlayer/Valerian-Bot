const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    category: "Guild",
    description: "Sends the info about the server",
	aliases: ['si'],
    usage: [],
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    execute: async (message, args, client) => {

        let day = moment(message.guild.createdTimestamp).format('dddd, MMMM Do YYYY')
        let date = moment(message.guild.createdTimestamp).format('LT')
        let time = moment(message.guild.createdTimestamp).fromNow()
        let members = message.guild.memberCount

        let total = message.guild.channels.cache.size
        let text = message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size
        let voice = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size
        let categories = message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size

        let roles = message.guild.roles.cache.size -1
        let emotes = message.guild.emojis.cache.size
        let region = message.guild.preferredLocale
        let boosts = message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} boosts` : `There are no boosts`

        const embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
            
            .setDescription(`**Name:** ${message.guild.name}
            **ID:** ${message.guild.id}
            **Owner:**<@${message.guild.ownerId}>
            **Members:** ${members}\n
            **Created:** ${day}, ${date} (${time})
            **Roles:** ${roles} Roles | **Emotes:** ${emotes} | **Region:** ${region}\n
            **Channels**
            **Total:** ${total} | **Text:** ${text} | **Voice:** ${voice} | **Category:** ${categories}\n
            **Boosts:** ${boosts}`)

        message.reply( { embeds: [embed] })
	},
};
