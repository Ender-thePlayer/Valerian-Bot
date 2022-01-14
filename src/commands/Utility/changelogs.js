// consts \\

const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

// commands \\

module.exports = {
  	name: "changelogs",
  	category: "Utility",
  	aliases: ['ch', 'logs'],
  	description: "Changelogs Command",
  	args: false,
  	usage: "js!changelogs",
  	permission: [],
  	owner: false,
  	execute: async (message, args, client, prefix) => {

		let embed = new MessageEmbed()
			.setColor(embedNeutral)
			.setTitle('**Changelogs Command**')
			.addFields(

				{ name: 'Current Version:', value:'``1.0.0``', inline: true },

				{ name: 'Version Name:', value:'``First Release Update``', inline: true },

				{ name: 'Changelogs:', value: '```⏵ Added all Commands from all the betas```',inline: false }

			//	{ name: 'Last Version:', value:'``beta_0.7.0_pre-1``', inline: true },

			//	{ name: 'Version Name:', value:'``Beta Pre-Release Update``', inline: true },

			//  { name: 'Changelogs:', value: '```⏵ Added About Command\n⏵ Added Ticket Command\n⏵ Added Prefix Command\n⏵ Added New Message UI\n⏵ Now the Bot Replies Instead of Sending Messages\n⏵ Updated Bot Host\n⏵ Updated Bot Base Code\n⏵ Updated Other Things```',inline: false }

			)
			.setTimestamp()
			.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

		message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
}};
