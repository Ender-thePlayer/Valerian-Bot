const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "resume",
    description: "Resumes currently playing song",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    run: async (client, interaction) => {
  
        const player = interaction.client.manager.get(interaction.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
            .setDescription("There is no song playing.")
            .setColor(embedError);

        return interaction.reply({embeds: [embed]});
        }

        if (!player.paused) {
            let embed = new EmbedBuilder()
                .setDescription(`The player is already **resumed**.`)
                .setColor(embedError);

            return interaction.reply({embeds: [embed]});
        }

        player.pause(false);

        let embed = new EmbedBuilder()
            .setTitle(`Resumed`)
            .setDescription(`[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

        return interaction.reply({embeds: [embed]});
	
    }
};