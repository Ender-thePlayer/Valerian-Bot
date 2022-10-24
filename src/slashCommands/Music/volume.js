const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "volume",
	description: "Changes the volume of the currently playing song",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	options: 
		[
			{
				name: "number",
				description: "Volume number percentage between 1 and 100",
				type: 4,
				required: false,
			},
		],
	run: async (client, interaction, prefix) => {

  
		const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
				.setDescription("There is no song playing.")
				.setColor(embedError);

            return interaction.reply({embeds: [embed]});
		}
		

		if (!interaction.options.getInteger('number')) {
			let embed = new EmbedBuilder()
				.setDescription(`The current volume is: **${player.volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
		
			return interaction.reply({embeds: [embed]});
		}

		const volume = interaction.options.getInteger('number');
		
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
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

			return interaction.reply({embeds: [embed]});
		
		} else if (volume < player.volume) {
			let embed = new EmbedBuilder()
				.setDescription(`Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
		
			return interaction.reply({embeds: [embed]});
		
		} else {
			let embed = new EmbedBuilder()
				.setDescription(`Volume set to: **${volume}%**`)
				.setColor(embedNeutral)
				.setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

			return interaction.reply({embeds: [embed]});
		}
		
 	}
};