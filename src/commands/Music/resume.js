const { MessageEmbed } = require("discord.js");
const { embedNeutral } = require("../../config.js");
const { embedError } = require("../../config.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Resume currently playing music.",
    args: false,
    usage: "<number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, client) => {
  
        const player = message.client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let embed = new MessageEmbed()
            .setDescription("There is no music playing.")
            .setColor(embedError);

        return message.reply({embeds: [embed]});
        }

        if (!player.paused) {
            let embed = new MessageEmbed()
                .setDescription(`The player is already **resumed**.`)
                .setColor(embedError);

            return message.reply({embeds: [embed]});
        }

        player.pause(false);

        let embed = new MessageEmbed()
            .setDescription(`**Resumed**\n[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [embed]});
	
    }
};