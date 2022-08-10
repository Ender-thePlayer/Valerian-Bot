const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
  	description: "Clears the queue.",
	args: false,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
	execute: async (message) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
			let embed = new MessageEmbed()
			.setDescription(`There is no music playing!`)
            .setColor(embedError)

		    return message.reply( { embeds: [embed] });
        }

		player.queue.clear();

        let embed = new MessageEmbed()
            .setDescription(`Removed all songs from the queue`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
        
        await message.reply( { embeds: [embed] });
        
        return;  
    }
};