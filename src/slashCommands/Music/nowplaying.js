const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "nowplaying",
    description: "Shows what's the currently playing song",
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    run: async (client, interaction) => {
          
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);

            return interaction.reply({embeds: [embed]});
        }

        const song = player.queue.current
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
            .setTitle(`Now Playing`)   
            .setDescription(`[${song.title}](${song.uri})\n\n\`${progressbar(player)}\n${convertTime(current)} / ${convertTime(total)}\`\n\u200b`)
            .setColor(embedNeutral)
            .setThumbnail(song.displayThumbnail("hqdefault"))
            .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Song Duration', value: `\`${convertTime(song.duration)}\``, inline: true },
				{ name: 'Position in Queue', value: `\`${player.queue.length}\``, inline: true },
			)

        return interaction.reply({embeds: [embed]})
    }
}
