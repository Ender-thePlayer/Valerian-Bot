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

				{ name: 'Current Version:', value:'``beta_0.4.0``', inline: true },

				{ name: 'Version Name:', value:'``Beta Progress Update``', inline: true },

				{ name: 'Changelogs:', value: '```⏵ Added Ticket Command```',inline: false },

				{ name: 'Last Version:', value:'``beta_0.3.4``', inline: true },

				{ name: 'Last Version Name:', value:'``Beta Progress Update``', inline: true },

				{ name: 'Changelogs:', value: '```⏵ Added F in chat command \n⏵ Added Rickroll Command```',inline: false },
        )
			.setTimestamp()
			.setFooter("@" + message.author.tag, message.author.displayAvatarURL({dynamic : true}))

		await message.reply( { embeds: [embed] }).then(setTimeout(() => message.delete(), 120000)).then(msg =>{
			setTimeout(() => msg.delete(), 120000)});
}};
