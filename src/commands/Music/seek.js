const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "seek",
    category: "Music",
    description: "Seeks the currently playing song",
    aliases: "",
    usage: "<time-in-seconds>",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        const time = ms(args[0] + '000')
        const position = player.position;
        const duration = player.queue.current.duration;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let embed = new EmbedBuilder()
                    .setTitle(`Forward`)
                    .setDescription(`[${song.title}](${song.uri})`)
                    .setColor(embedNeutral)
                    .addFields(
                        { name: 'Song Duration', value: `\`${convertTime(time)} / ${convertTime(duration)}\``, inline: true },
                    )

                return message.reply({embeds: [embed]});

            } else {
                player.seek(time);
                let embed = new EmbedBuilder()
                    .setTitle(`Rewind`)
                    .setDescription(`[${song.title}](${song.uri})`)
                    .setColor(embedNeutral)
                    .addFields(
                        { name: 'Song Duration', value: `\`${convertTime(time)} / ${convertTime(duration)}\``, inline: true },
                    )

          return message.reply({embeds: [embed]});
            }
        } else {
            let embed = new EmbedBuilder()
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``)
                .setColor(embedError);    

            return message.reply({embeds: [embed]});
        }
	
    }
};