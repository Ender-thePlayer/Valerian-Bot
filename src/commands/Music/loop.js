const { MessageEmbed } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
	name: "loop",
    aliases: ['l'],
    category: "Music",
  	description: "Toggle music loop.",
  	args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);
                
            return message.reply({embeds: [embed]});
        }

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";

			let embed = new MessageEmbed()
                .setDescription(`Loop queue is now **${queueRepeat}**`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		   return message.reply({embeds: [embed]});
        }

        player.setTrackRepeat(!player.trackRepeat);
        
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

		let embed = new MessageEmbed()
            .setDescription(`Loop track is now **${trackRepeat}**`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		return message.reply({embeds: [embed]});
    }
};