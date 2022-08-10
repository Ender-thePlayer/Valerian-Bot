const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
  	name: "skipto",
	aliases: ["jump"],
  	category: "Music",
  	description: "Forward song.",
  	args: true,
    usage: "<number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client) => {
  
		const player = message.client.manager.get(message.guild.id);;

        if (!player.queue.current) {
            let embed = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);
        
            return message.reply({embeds: [embed]});
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let embed = new MessageEmbed()
                .setDescription(`Usage: ${message.client.prefix}skipto <Number of song in queue>`)
                .setColor(embedError);
            
            return message.reply({embeds: [embed]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		let embed = new MessageEmbed()
            .setDescription(`Forward **${position}** Songs`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		return message.reply({embeds: [embed]});
	
    }
};