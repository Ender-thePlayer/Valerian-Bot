const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose')

module.exports = {
    name: "prefix",
    category: "Config",
    description: "Sets a custom prefix",
	aliases: "",
    usage: "\n | set [prefix]\n | reset",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: ['ManageGuild'],
	nsfw: false,
    args: true,
  	execute: async (message, args) => {

		let res = await pre.findOne({ guildid: message.guild.id });
		let newprefix = args.slice(1).join(" "); 

		if (args[2]) {
			const embed = new EmbedBuilder()
				.setDescription("You can't set the prefix as double argument!")
				.setColor(embedError)
			return message.reply( { embeds: [embed] })
		}
		if (newprefix.length > 5) {
			const embed = new EmbedBuilder()
				.setDescription("You can not send prefix more than 5 characters!")
				.setColor(embedError)
            return message.reply( { embeds: [embed] })
		}

		if (args[0] === 'set') {

            if(!newprefix){
                const embed = new EmbedBuilder()
                    .setDescription("Please specify the prefix that you want to set!")
                    .setColor(embedError)
                return message.reply( { embeds: [embed] })
            }

			let p;
			if (!res) p = prefix
			else p = res.newprefix;

			pre.findOne({ guildid: message.guild.id }).then(result => {

				let duck = new pre({
					_id: new mongoose.Types.ObjectId(),
					guildid: message.guild.id,
					prefix: newprefix
				})

				const embed = new EmbedBuilder()
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
			
        } else if (args[0] === 'reset') {
			if(!res) {
				const embed = new EmbedBuilder()
					.setDescription(`The prefix in this server is already reset.`)
					.setColor(embedError)

				return message.reply( { embeds: [embed] })
			}

			pre.findOne({ guildid: message.guild.id }).then(result => {
				pre.deleteOne({ guildid: message.guild.id }).catch(console.error)
	
				const embed = new EmbedBuilder()
					.setDescription(`The prefix in this server is now set to the default prefix (**${prefix}**)`)
					.setColor(embedSuccess)
					.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
	
				message.reply( { embeds: [embed] })
			})
		}
	}
}