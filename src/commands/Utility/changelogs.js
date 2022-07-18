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
			.setImage('https://i.imgur.com/e7Zo2Hh.png')
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Current Version:', value:'``1.2.0``', inline: true },
				{ name: 'Version Name:', value:'``The Remastering Update``', inline: true },
				{ name: 'Changelogs:', value: '```\n⏵ Changed Command Interface\n⏵ Added 18 Music Commands\n⏵ Updated Help Command (Now More Useful)\n⏵ Updated Avatar Command\n⏵ Removed About Command\n⏵ Removed Aliases Command\n⏵ Removed Tickets Command\n⏵ Removed Poll Command\n⏵ Removed All Fun Commands\n⏵ Removed Command Timeout\n⏵ Fixed Lots of Bugs\n```',inline: false }
			)

		message.reply( { embeds: [embed] })
    }
};
