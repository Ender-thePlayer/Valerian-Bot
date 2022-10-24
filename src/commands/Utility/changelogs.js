const { embedNeutral } = require("../../config.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
	name: "changelogs",
    category: "Utility",
	description: "Shows the logs of the newest update",
	aliases: ['ch', 'logs'],
    usage: "",
	enabled: true,
	owner: false,
	userPerms: [],
	botPerms: [],
	nsfw: false,
    args: false,
  	execute: async (message) => {

		const attachment = new AttachmentBuilder('./src/utils/update-banner.png', { name: 'update-banner.png' })

		const embed = new EmbedBuilder()
			.setColor(embedNeutral)
			.setImage('attachment://update-banner.png')
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Current Version:', value:'``1.4.0``', inline: true },
				{ name: 'Version Name:', value:'``The Moderation Update``', inline: true },
				{ name: 'Changelogs:', value: '```\n⏵ Introduced new slash commands\n⏵ Updated to DJSv14\n⏵ Updated the handler\n⏵ Added bye command\n⏵ Added mute command\n⏵ Added nickname command\n⏵ Added softban command\n⏵ Added unban command\n⏵ Added unmute command\n⏵ Added welcome command\n⏵ Removed bansave command\n⏵ Removed skipto command\n```',inline: false }
			)

		message.reply( { embeds: [embed], files: [attachment] })
    }
};
