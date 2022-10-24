const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "skip",
    category: "Music",
	description: "Skips the currently playing song",
    aliases: ["s"],
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
    execute: async (message) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
        
            return message.reply({embeds: [embed]});
        }

        const song = player.queue.current;

        player.stop();
           
		let embed = new EmbedBuilder()
            .setTitle(`Skipped`)
            .setDescription(`[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

		return message.reply({embeds: [embed]})
    }
};