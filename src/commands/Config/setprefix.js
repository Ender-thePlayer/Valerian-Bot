const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose')

module.exports = {
    name: "setprefix",
    category: "Config",
    description: "Set a custom prefix.",
    args: true,
    usage: "[prefix]",
    aliases: ['prefix'],
    permission: ['MANAGE_GUILD'],
    owner: false,
  	execute: async (message, args) => {

		if (!args[0]) {
			const embed = new MessageEmbed()
				.setDescription("Please give the prefix that you want to set!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] })
		}

		if (args[1]) {
			const embed = new MessageEmbed()
				.setDescription("You can't set the prefix as double argument!")
				.setColor(embedError)
			return message.reply( { embeds: [embed] })
		}

		if (args[0].length > 5) {
			const embed = new MessageEmbed()
				.setDescription("You can not send prefix more than 5 characters!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] })
		}

		let res = await pre.findOne({ guildid: message.guild.id });
		let prefix = args.join(" ");
		let p;
		if (!res) p = ">"
		else p = res.prefix;
		let newprefix = args.join(" ");

		pre.findOne({ guildid: message.guild.id }).then(result => {

			let duck = new pre({
				_id: new mongoose.Types.ObjectId(),
				guildid: message.guild.id,
				prefix: prefix
			})

			const embed = new MessageEmbed()
				.setDescription(`The prefix in this server is now set to **${newprefix}**`)
				.setColor(embedSuccess)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			message.reply( { embeds: [embed] })
			
			if (!result || result == []) {
				duck.save().catch(console.error);
			
			} else {
				pre.deleteOne({ guildid: message.guild.id }).catch(console.error)
				duck.save().catch(console.error)
			}
	  	})
   	}
}
