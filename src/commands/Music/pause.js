const { MessageEmbed } = require("discord.js");
const { embedError } = require("../../config.js");
const { embedNeutral } = require("../../config.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music.",
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

        if (player.paused) {
            let thing = new MessageEmbed()
                .setDescription(`The player is already paused.`)
                .setColor(embedError)

            return message.reply({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setDescription(`**Paused**\n[${song.title}](${song.uri})`)
            .setColor(embedNeutral)
            .setFooter({text: `Requested by @${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})})

        return message.reply({embeds: [thing]});
	
    }
};
