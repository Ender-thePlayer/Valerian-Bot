const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "shuffle",
    category: "Music",
    description: "Shuffles the queue",
    aliases: "",
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
    execute: async (message, client) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        player.queue.shuffle();
        
        let embed = new EmbedBuilder()
            .setDescription(`Shuffled the queue`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [embed]}).catch(error => client.logger.log(error, "error"));
	
    }
};