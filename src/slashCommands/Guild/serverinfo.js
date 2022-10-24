const { embedNeutral } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    description: "Sends the info about the server",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    run: async (client, interaction) => {

        let day = moment(interaction.guild.createdTimestamp).format('dddd, MMMM Do YYYY')
        let date = moment(interaction.guild.createdTimestamp).format('LT')
        let time = moment(interaction.guild.createdTimestamp).fromNow()
        let members = interaction.guild.memberCount

        let total = interaction.guild.channels.cache.size
        let text = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size
        let voice = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size
        let categories = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size

        let roles = interaction.guild.roles.cache.size -1
        let emotes = interaction.guild.emojis.cache.size
        let region = interaction.guild.preferredLocale
        let boosts = interaction.guild.premiumSubscriptionCount >= 1 ? `${interaction.guild.premiumSubscriptionCount} boosts` : `There are no boosts`

        const embed = new EmbedBuilder()
            .setColor(embedNeutral)
            .setThumbnail(interaction.guild.iconURL({dynamic : true}))
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            .setDescription(`**Name:** ${interaction.guild.name}
            **ID:** ${interaction.guild.id}
            **Owner:**<@${interaction.guild.ownerId}>
            **Members:** ${members}\n
            **Created:** ${day}, ${date} (${time})
            **Roles:** ${roles} Roles | **Emotes:** ${emotes} | **Region:** ${region}\n
            **Channels**
            **Total:** ${total} | **Text:** ${text} | **Voice:** ${voice} | **Category:** ${categories}\n
            **Boosts:** ${boosts}`
            )

        interaction.reply( { embeds: [embed] })
	}
};
