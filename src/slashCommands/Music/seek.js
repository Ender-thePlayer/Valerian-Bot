const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "seek",
    description: "Seeks the currently playing song",
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
                name: "time",
                description: "The time where you want to seek in seconds",
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

        const time = ms(interaction.options.getInteger('time') + '000')
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

                return interaction.reply({embeds: [embed]});

            } else {
                player.seek(time);
                let embed = new EmbedBuilder()
                    .setTitle(`Rewind`)
                    .setDescription(`[${song.title}](${song.uri})`)
                    .setColor(embedNeutral)
                    .addFields(
                        { name: 'Song Duration', value: `\`${convertTime(time)} / ${convertTime(duration)}\``, inline: true },
                    )

          return interaction.reply({embeds: [embed]});
            }
        } else {
            let embed = new EmbedBuilder()
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``)
                .setColor(embedError);    

            return interaction.reply({embeds: [embed]});
        }
	
    }
};