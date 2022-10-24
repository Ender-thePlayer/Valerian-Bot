const { EmbedBuilder } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
    name: "remove",
    category: "Music",
    description: "Removes song from the queue",
    aliases: "",
    usage: "<number of song in queue>",
	enabled: true,
	owner: false,
	botPerms: [],
	userPerms: [],
    nsfw: false,
    args: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, args, client) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let embed = new EmbedBuilder()
                .setDescription("There is no song playing.")
                .setColor(embedError);
                    
            return message.reply({embeds: [embed]});
        }

        const position = (Number(args[0]) - 1);
        if (position > player.queue.size) {
            const number = (position + 1);

            let embed = new EmbedBuilder()
                .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`)
                .setColor(embedError);

            return message.reply({embeds: [embed]});
            }

        const song = player.queue[position]
            player.queue.remove(position);

            let embed = new EmbedBuilder()
                .setTitle(`Removed`)
                .setDescription(`[${song.title}](${song.uri})`)
                .setColor(embedNeutral)
                .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

            return message.reply({embeds: [embed]});
	
    }
};