const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clearqueue",
  	description: "Clears the song queue.",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    run: async (client, interaction) => {
  
		const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
			let embed = new EmbedBuilder()
			.setDescription(`There is no song playing!`)
            .setColor(embedError)

		    return interaction.reply( { embeds: [embed] });
        }

		player.queue.clear();

        let embed = new EmbedBuilder()
            .setDescription(`Removed all songs from the queue`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
        
        await interaction.reply( { embeds: [embed] });
        
    }
};