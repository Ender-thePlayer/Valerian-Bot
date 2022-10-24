const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "remove",
    description: "Removes song from the queue",
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
                description: "Position of the song in queue",
                type: 4,
                required: true,
            },
        ],
    run: async (client, interaction) => {
  
		const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
                    
            return interaction.reply({embeds: [embed]});
        }
        
        if(interaction.options.getInteger('number') == 0)return;

        const position = (Number(interaction.options.getInteger('number')) - 1);

        if (position > player.queue.size) {
            const number = (position + 1);

            let embed = new EmbedBuilder()
                .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`)
                .setColor(embedError);

            return interaction.reply({embeds: [embed]});
            }

        const song = player.queue[position]
            player.queue.remove(position);

            let embed = new EmbedBuilder()
                .setTitle(`Removed`)
                .setDescription(`[${song.title}](${song.uri})`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            return interaction.reply({embeds: [embed]});
	
    }
};