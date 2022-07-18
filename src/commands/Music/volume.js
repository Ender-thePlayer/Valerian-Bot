const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "volume",
	aliases: ["v", "vol"],
	category: "Music",
  	description: "Change volume of currently playing music.",
	args: false,
    usage: "[number of volume between 0 - 100]",
    permission: [],
    owner: false,
  	player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
				.setDescription("There is no music playing.")
				.setColor(embedError);

            return message.reply({embeds: [thing]});
		}
		
		const volumeEmoji = client.emoji.volumehigh;

		if (!args.length) {
			let thing = new MessageEmbed()
				.setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
		
			return message.reply({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 100) { 
			let thing = new MessageEmbed()
				.setDescription(`Usage: ${prefix}volume [number of volume between 0 - 100]`)
				.setColor(embedError);

			return message.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			return message.reply({embeds: [thing]});
		
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
		
			return message.reply({embeds: [thing]});
		
		} else {
			let thing = new MessageEmbed()
				.setDescription(`${volumeEmoji} Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

			return message.reply({embeds: [thing]});
		}
		
 	}
};