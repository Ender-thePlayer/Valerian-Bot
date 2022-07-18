const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
  	name: "shuffle",
    category: "Music",
    description: "Shuffle queue.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, client) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setDescription("There is no music playing.")
                .setColor(embedError);

        return message.reply({embeds: [thing]});
        }

        player.queue.shuffle();
        
        let thing = new MessageEmbed()
            .setDescription(`Shuffled the queue`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [thing]}).catch(error => client.logger.log(error, "error"));
	
    }
};