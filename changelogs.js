const { embedNeutral } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "changelogs",
  	category: "Utility",
  	aliases: ['ch', 'logs'],
  	description: "Shows the newest changes.",
  	args: false,
  	usage: "",
  	permission: [],
  	owner: false,
  	execute: async (message, args, client, prefix) => {

		const embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setImage('https://i.imgur.com/5LOcziE.png')
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Current Version:', value:'``1.3.0``', inline: true },
				{ name: 'Version Name:', value:'``The Renaissance Update``', inline: true },
				{ name: 'Changelogs:', value: '```\n⏵ Added Meme command\n⏵ Removed Join Leave commands\n⏵ Changed Music commands\n⏵ Updated Handler stuff\n```',inline: false }
			)

		message.reply( { embeds: [embed] })
    }
};
