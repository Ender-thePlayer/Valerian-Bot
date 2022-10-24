const { EmbedBuilder } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pauses the currently playing song",
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

        if (player.paused) {
            let embed = new EmbedBuilder()
                .setDescription(`The player is already paused.`)
                .setColor(embedError)

            return message.reply({embeds: [embed]});
        }

        player.pause(true);

        const song = player.queue.current;

        let embed = new EmbedBuilder()
            .setTitle(`Paused`)
            .setDescription(`[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [embed]});
	
    }
};
