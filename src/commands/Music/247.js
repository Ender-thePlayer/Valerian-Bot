const { embedSuccess } = require("../../config.js");const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "247",
	aliases: ["24h", "24/7", "24*7"],
	category: "Music",
	description: "Sets music to be on 24/7.",
	args: false,
	usage: "",
	permission: [],
	owner: false,
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	execute: async (message) => {


		const player = message.client.manager.players.get(message.guild.id);
		
    	if (player.twentyFourSeven) {
			player.twentyFourSeven = false;

			const embed = new MessageEmbed()
				.setDescription(`24/7 mode is now off.`)
				.setColor(embedSuccess)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			message.reply( { embeds: [embed] })

			return;

		} else {
			player.twentyFourSeven = true;

			const embed = new MessageEmbed()
				.setDescription(`24/7 mode is now on.`)
				.setColor(embedSuccess)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			
			message.reply( { embeds: [embed] })
			
			return;
    	}
  	}
};