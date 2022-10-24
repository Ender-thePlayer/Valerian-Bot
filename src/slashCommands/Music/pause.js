const { EmbedBuilder } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "pause",
    description: "Pauses the currently playing song",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    run: async (client, interaction) => {
    
		const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
                
        return interaction.reply({embeds: [embed]});
        }

        if (player.paused) {
            let embed = new EmbedBuilder()
                .setDescription(`The player is already paused.`)
                .setColor(embedError)

            return interaction.reply({embeds: [embed]});
        }

        player.pause(true);

        const song = player.queue.current;

        let embed = new EmbedBuilder()
            .setTitle(`Paused`)
            .setDescription(`[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

        return interaction.reply({embeds: [embed]});
	
    }
};
