const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "shuffle",
    description: "Shuffles the queue",
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

        player.queue.shuffle();
        
        let embed = new EmbedBuilder()
            .setDescription(`Shuffled the queue`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

        return interaction.reply({embeds: [embed]}).catch(error => client.logger.log(error, "error"));
	
    }
};