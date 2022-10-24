const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "stop",
    description: "Stops the currently playing song and clears the queue",
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

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.destroy();

        let embed = new EmbedBuilder()
            .setDescription(`Stopped the song and cleared the queue.`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

        interaction.reply({embeds: [embed]});
	
  	}
};