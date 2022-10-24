const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "resume",
    category: "Music",
    description: "Resumes currently playing song",
    aliases: ["r"],
    usage: "<number of song in queue>",
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
        const song = player.queue.current;

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
            .setDescription("There is no song playing.")
            .setColor(embedError);

        return message.reply({embeds: [embed]});
        }

        if (!player.paused) {
            let embed = new EmbedBuilder()
                .setDescription(`The player is already **resumed**.`)
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        player.pause(false);

        let embed = new EmbedBuilder()
            .setTitle(`Resumed`)
            .setDescription(`[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [embed]});
	
    }
};