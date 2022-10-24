const { embedError } = require("../../config.js");
const { embedSuccess } = require("../../config.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clearqueue",
    category: "Music",
  	description: "Clears the song queue.",
    aliases: ["cq"],
    usage: "",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
	execute: async (message) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
			let embed = new EmbedBuilder()
			.setDescription(`There is no song playing!`)
            .setColor(embedError)

		    return message.reply( { embeds: [embed] });
        }

		player.queue.clear();

        let embed = new EmbedBuilder()
            .setDescription(`Removed all songs from the queue`)
            .setColor(embedSuccess)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})
        
        await message.reply( { embeds: [embed] });
        
    }
};