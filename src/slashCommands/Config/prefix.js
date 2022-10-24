const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { prefix } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose');

module.exports = {
    name: "prefix",
    description: "Sets a custom prefix",
	owner: false,
	botPerms: [],
	userPerms: ['ManageGuild'],
	nsfw: false,
	options:
		[
			{		
				name: "set",
				description: "Set a custom prefix",
				type: 1,
				options: [
					{
						name: "prefix",
						description: "The custom prefix you want to set",
						type: 3,
						required: true,
					},
				]
			},
			{		
				name: "reset",
				description: "Reset to the default prefix",
				type: 1,
			}
		],
  	run: async (client, interaction) => {

		let res = await pre.findOne({ guildid: interaction.guild.id });

		if (interaction.options.getSubcommand() === 'set') {
			let newprefix = interaction.options.getString('prefix').replace(/\s+/g, '');

			if (newprefix.length > 5) {
				const embed = new EmbedBuilder()
					.setDescription("You can not send prefix more than 5 characters!")
					.setColor(embedError)
				return interaction.reply( { embeds: [embed] })
			}

			let p;
			if (!res) p = prefix
			else p = res.newprefix;

			pre.findOne({ guildid: interaction.guild.id }).then(result => {

				let duck = new pre({
					_id: new mongoose.Types.ObjectId(),
					guildid: interaction.guild.id,
					prefix: newprefix
				})

				const embed = new EmbedBuilder()
					.setDescription(`The prefix in this server is now set to **${newprefix}**`)
					.setColor(embedSuccess)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

				interaction.reply( { embeds: [embed] })
				
				if (!result || result == []) {
					duck.save().catch(console.error);
				
				} else {
					pre.deleteOne({ guildid: interaction.guild.id }).catch(console.error)
					duck.save().catch(console.error)
				}
	  		})

		} 
		
		if (interaction.options.getSubcommand() === 'reset') {
			if(!res) {
				const embed = new EmbedBuilder()
					.setDescription(`The prefix in this server is already reset.`)
					.setColor(embedError)

				return interaction.reply( { embeds: [embed] })
			}

			pre.findOne({ guildid: interaction.guild.id }).then(result => {
				pre.deleteOne({ guildid: interaction.guild.id }).catch(console.error)
	
				const embed = new EmbedBuilder()
					.setDescription(`The prefix in this server is now set to the default prefix (**${prefix}**)`)
					.setColor(embedSuccess)
					.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
	
				interaction.reply( { embeds: [embed] })
			})
		}
	}
}