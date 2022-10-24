const { EmbedBuilder } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
	name: "loop",
    category: "Music",
    description: "Turns on the song on loop",
    aliases: ['l'],
    usage: "",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args) => {
  
		const player = message.client.manager.get(message.guild.id);

        let option = args[0]

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
                
            return message.reply({embeds: [embed]});
        }

        if (!option) {
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";

            let embed = new EmbedBuilder()
                .setDescription(`Loop track is now **${trackRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
                .addFields(
                    { name: 'Track Loop', value: trackRepeat },
                    { name: 'Queue Loop', value: queueRepeat }
                )

            return message.reply({embeds: [embed]});
        }
        
        if (option.toLowerCase() == 'queue') {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";

			let embed = new EmbedBuilder()
                .setDescription(`Loop queue is now **${queueRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		   return message.reply({embeds: [embed]});
        }

        if (option.toLowerCase() == 'track') {
            player.setTrackRepeat(!player.trackRepeat);
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

            let embed = new EmbedBuilder()
                .setDescription(`Loop track is now **${trackRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            return message.reply({embeds: [embed]});
        }
    }
};