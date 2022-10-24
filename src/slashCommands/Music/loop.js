const { EmbedBuilder } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
	name: "loop",
    description: "Turns on the song on loop",
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
                name: "option",
                description: "Set loop for QUEUE or TRACK",
                type: 3,
                required: false,
                choices: 
                    [
                        {
                            name: 'queue',
                            value: 'queue',
                        },
                        {
                            name: 'track',
                            value: 'track',
                        },
                    ],
            },
        ],
    run: async (client, interaction) => {

		const player = interaction.client.manager.get(interaction.guild.id);

        let option = interaction.options.getString('option')

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
                
            return interaction.reply({embeds: [embed]});
        }

        if (!option) {
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";

            let embed = new EmbedBuilder()
                .setDescription(`Loop track is now **${trackRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                .addFields(
                    { name: 'Track Loop', value: trackRepeat },
                    { name: 'Queue Loop', value: queueRepeat }
                )

            return interaction.reply({embeds: [embed]});
        }

        if (option == 'queue') {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";

			let embed = new EmbedBuilder()
                .setDescription(`Loop queue is now **${queueRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

		   return interaction.reply({embeds: [embed]});
        }

        if (option == 'track') {
            player.setTrackRepeat(!player.trackRepeat);
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

            let embed = new EmbedBuilder()
                .setDescription(`Loop track is now **${trackRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic : true})})

            return interaction.reply({embeds: [embed]});
        }
    }
};