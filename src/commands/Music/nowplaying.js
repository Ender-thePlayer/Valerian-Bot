const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "nowplaying",
    category: "Music",
    description: "Shows what's the currently playing song",
    aliases: ["np"],
    usage: "",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, client) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        const song = player.queue.current
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
            .setTitle(`Now Playing`)   
            .setDescription(`[${song.title}](${song.uri})\n\n\`${progressbar(player)}\n${convertTime(current)} / ${convertTime(total)}\`\n\u200b`)
            .setColor(embedNeutral)
            .setThumbnail(song.displayThumbnail("hqdefault"))
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
			.addFields(
				{ name: 'Song Duration', value: `\`${convertTime(song.duration)}\``, inline: true },
				{ name: 'Position in Queue', value: `\`${player.queue.length}\``, inline: true },
			)

        return message.reply({embeds: [embed]})
    }
}
