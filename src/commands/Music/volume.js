const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "volume",
    category: "Music",
	description: "Changes the volume of the currently playing song",
	aliases: ["v", "vol"],
    usage: "[number between 0 - 100]",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
				.setDescription("There is no song playing.")
				.setColor(embedError);

            return message.reply({embeds: [embed]});
		}
		

		if (!args.length) {
			let embed = new EmbedBuilder()
				.setDescription(`The current volume is: **${player.volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
		
			return message.reply({embeds: [embed]});
		}

		const volume = Number(args[0]);
		
		if (volume < 0 || volume > 100) { 
			let embed = new EmbedBuilder()
				.setDescription(`You can only use a number between 1 and 100!`)
				.setColor(embedError);

			return interaction.reply({embeds: [embed]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			let embed = new EmbedBuilder()
				.setDescription(`Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			return message.reply({embeds: [embed]});
		
		} else if (volume < player.volume) {
			let embed = new EmbedBuilder()
				.setDescription(`Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
		
			return message.reply({embeds: [embed]});
		
		} else {
			let embed = new EmbedBuilder()
				.setDescription(`Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			return message.reply({embeds: [embed]});
		}
		
 	}
};