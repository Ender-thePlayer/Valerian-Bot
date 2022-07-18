const { prefix } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { embedError } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const pre = require("../../schema/prefix.js");

module.exports = {
    name: "resetprefix",
    category: "Config",
    description: "Reset prefix to the default prefix.",
    args: false,
    usage: "",
    aliases: ['reset'],
    permission: ['MANAGE_GUILD'],
    owner: false,
  	execute: async (message) => {

		let res = await pre.findOne({ guildid: message.guild.id });

		if(!res) {
			const embed = new MessageEmbed()
				.setDescription(`The prefix in this server is already reset.`)
				.setColor(embedError)

			return message.reply( { embeds: [embed] })
		}

		pre.findOne({ guildid: message.guild.id }).then(result => {
			pre.deleteOne({ guildid: message.guild.id }).catch(console.error)

			const embed = new MessageEmbed()
				.setDescription(`The prefix in this server is now set to the default prefix (**${prefix}**)`)
				.setColor(embedSuccess)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			message.reply( { embeds: [embed] })
			
	  	})
   	}
}
